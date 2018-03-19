package ca.bc.gov.jag.shuber;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.context.annotation.Bean;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.stereotype.Component;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;

/**
 * 
 * @author michael.gabelmann
 */
@Component
public class JsonConfig {
	/** Logger. */
	private static final Logger log = LogManager.getLogger(JsonConfig.class);
	
	@Bean
	public MappingJackson2HttpMessageConverter mappingJackson2HttpMessageConverter() {
		if (log.isDebugEnabled()) {
			log.debug("initializing MappingJackson2HttpMessageConverter");
		}
		
	    ObjectMapper mapper = new ObjectMapper();
	    mapper.configure(SerializationFeature.FAIL_ON_EMPTY_BEANS, false);
	    
	    MappingJackson2HttpMessageConverter converter = new MappingJackson2HttpMessageConverter(mapper);
	    
	    return converter;
	}
	
}
