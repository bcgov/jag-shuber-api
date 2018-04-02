package ca.bc.gov.jag.shuber;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Component;

/**
 * 
 * @author michael.gabelmann
 */
@Component
public class JsonConfig {
	/** Logger. */
	private static final Logger log = LogManager.getLogger(JsonConfig.class);
	
	/* NOTE: use spring.jackson.serialization.FAIL_ON_EMPTY_BEANS=false instead
	@Bean
	public MappingJackson2HttpMessageConverter mappingJackson2HttpMessageConverter() {
		if (log.isDebugEnabled()) {
			log.debug("initializing MappingJackson2HttpMessageConverter");
		}
		
	    ObjectMapper mapper = new ObjectMapper();
	    mapper.configure(SerializationFeature.FAIL_ON_EMPTY_BEANS, false);
	    
	    return new MappingJackson2HttpMessageConverter(mapper);
	}
	*/
}
