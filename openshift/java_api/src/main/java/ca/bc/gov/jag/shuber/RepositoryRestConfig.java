package ca.bc.gov.jag.shuber;

import java.util.concurrent.TimeUnit;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurerAdapter;

/**
 * Changes how the application handles CORS. Configured through an application property.
 * 
 * @author michael.gabelmann
 */
@Configuration
public class RepositoryRestConfig extends RepositoryRestConfigurerAdapter {
	/** Logger. */
	private static final Logger log = LogManager.getLogger(RepositoryRestConfig.class);

	/** Inject whether we want to use CORS filtering using Spring. */
	@Value("${app.enable.cors:false}")
	private boolean enableCors;
	
	
	@Override
	public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config) {
		if (enableCors) {
			log.warn("testing CORS filtering");
			
			config.getCorsRegistry().addMapping("/**")
				.allowedOrigins("*")
				.allowedHeaders("*")
				.allowCredentials(true)
				.allowedMethods("OPTIONS", "HEAD", "GET", "PUT", "POST", "DELETE", "PATCH")
				//.exposedHeaders("Access-Control-Allow-Origin", "Access-Control-Allow-Methods", "Access-Control-Allow-Credentials", "Access-Control-Max-Age", "Access-Control-Allow-Headers", "", "WWW-Authenticate")
				.maxAge(TimeUnit.DAYS.toSeconds(2));
			
		} else {
			log.debug("default CORS filtering");
		}
	}
	
}


//@Configuration
//public class RepositoryRestConfig {
//	/** Logger. */
//	private static final Logger log = LogManager.getLogger(RepositoryRestConfig.class);
//	
//	/** Inject whether we want to use CORS filtering using Spring. */
//	@Value("${app.enable.cors:true}")
//	private boolean enableCors;
//	
//	@Bean
//	public WebMvcConfigurer corsConfigurer() {
//		if (!enableCors) {
//			return new WebMvcConfigurer() {
//				@Override
//				public void addCorsMappings(CorsRegistry registry) {
//					registry.addMapping("/**");
//					
//					log.warn("CORS filtering is allowing all mappings");
//				}
//			};
//		} else {
//			return new WebMvcConfigurer() {
//				@Override
//				public void addCorsMappings(CorsRegistry registry) {
//					//NOTE: we will want to eventually strengthen this!
//					log.debug("CORS filtering is set to default");
//				}
//			};
//		}
//	}
//	
//}