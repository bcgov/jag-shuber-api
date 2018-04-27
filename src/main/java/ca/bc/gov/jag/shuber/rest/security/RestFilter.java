package ca.bc.gov.jag.shuber.rest.security;

import java.io.IOException;
import java.time.Instant;
import java.util.Enumeration;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;

import ca.bc.gov.jag.shuber.Application;
import ca.bc.gov.jag.shuber.rest.exception.RestErrors;
import ca.bc.gov.jag.shuber.rest.exception.RestGlobalError;

/**
 * Filter to protect the REST API from users that have not been authenticated by SiteMinder.
 * A simple replacement. You can override the default config using several properties either
 * via a config file or on the command line when starting the application.
 * 
 * The SM_USERGUID is also used to identify who created or updated a record in the DB by using
 * a ThreadLocal. SM_USER could be used as a replacement for created/updated.
 * 
 * @author michael.gabelmann
 */
@WebFilter(urlPatterns = RestFilter.PATH)
public class RestFilter implements Filter {
	/** path to protect. */
	public static final String PATH = "/api/*";

	//application specific headers
	/** header that stores information about filter state. */
	public static final String X_SHUBER_FILTER = "X-SHUBER-FILTER";

	/** Logger. */
	private static final Logger log = LogManager.getLogger(RestFilter.class);

	/** Filter config. */
	private FilterConfig filterConfig;

	/** Enable this filter and process siteminder headers. */
	@Value("${app.security.filter.enabled:true}")
	private boolean enableFilter;

	/** Is this filter in test mode. */
	@Value("${app.security.filter.testmode:false}")
	private boolean testMode;

	/** If the filter is in testMode which user/GUID do we want to use. */
	@Value("${app.security.filter.testmodeguid:CACA000000D44BA3B742221B428EC7E7}")
	private String testUserGuid;

	/** JSON mapper object. */
	private ObjectMapper mapper;


	@Override
	public void init(FilterConfig filterConfig) throws ServletException {
		this.filterConfig = filterConfig;

		//map objects to JSON
		mapper = new ObjectMapper();
		mapper.configure(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS, false);
		mapper.registerModules(new JavaTimeModule());

		if (log.isDebugEnabled()) log.debug("startup of filter " + RestFilter.class.getSimpleName());
	}

	@Override
	public void doFilter(ServletRequest req, ServletResponse resp, FilterChain chain) throws IOException, ServletException {
		HttpServletRequest request = (HttpServletRequest) req;
		HttpServletResponse response = (HttpServletResponse) resp;
		
		if (log.isDebugEnabled()) {
			//print information about the headers and cookies in the request
			log.debug("URL=" + request.getRequestURL());
			
			//iterate over all the headers
			Enumeration<String> headers = request.getHeaderNames();
			while (headers.hasMoreElements()) {
				String key = headers.nextElement();
				String value = request.getHeader(key);
				log.debug(String.format("header %s=%s", key, value));
			}
			
			Cookie[] cookies = request.getCookies();
			if (cookies != null) {
				for (int i=0; i < cookies.length; i++) {
					log.debug(cookies[i].getName() + "=" + cookies[i].getValue() + ", domain=" + cookies[i].getDomain());
				}
			}
		}
		
		//add custom header to the response
		StringBuilder sb = new StringBuilder();
		sb.append(String.format("enableFilter=%s, testMode=%s", enableFilter, testMode));
		if (testMode) sb.append(String.format(", testUserGuid=%s", testUserGuid));
		sb.append(String.format(", milli=%d", Instant.now().toEpochMilli()));
		response.addHeader(X_SHUBER_FILTER, sb.toString());
		
		String smGovUserGuid;
		
		if (testMode) {
			smGovUserGuid = testUserGuid;
			log.warn(String.format("TESTMODE: using %s in place of siteminder value", smGovUserGuid));
			
		} else {
			//NOTE: our app only cares about IDIR users
			smGovUserGuid = request.getHeader(SiteMinderHeaders.SMGOV_USERGUID);
		}

		if (enableFilter && (smGovUserGuid == null || "".equals(smGovUserGuid))) {
			//not authenticated by siteminder or using test user guid, so return a JSON error response
			log.warn(SiteMinderHeaders.SMGOV_USERGUID + " does not exist, user not authenticated by siteminder");
			
			byte[] message = convertToJson(this.getRestErrors());

			response.setStatus(HttpServletResponse.SC_FORBIDDEN);
			resp.setContentType(MediaType.APPLICATION_JSON_VALUE);
			resp.setContentLength(message.length);
			resp.getOutputStream().write(message);

			//stop processing request
			return;

		} else if (! enableFilter) {
			log.warn("filter is disabled");
		}

		//set current authenticated user
		Application.user.set(smGovUserGuid);
		
		//continue processing request
		chain.doFilter(request, resp);
	}

	@Override
	public void destroy() {
		if (log.isDebugEnabled()) log.debug("shutting down and clean up of filter " + RestFilter.class.getSimpleName());
	}

	/**
	 * Convert an object into JSON.
	 * @param o
	 * @return
	 * @throws JsonProcessingException
	 */
	private byte[] convertToJson(Object o) throws JsonProcessingException {
		return mapper.writeValueAsBytes(o);
	}
	
	/**
	 * Convenience method.
	 * @return
	 */
	private RestErrors getRestErrors() {
		RestErrors re = new RestErrors();
		re.getGlobalErrors().add(new RestGlobalError("", "application.siteminder.authentication", "user not authenticated", "User not authenticated by SiteMinder"));

		return re;
	}

}
