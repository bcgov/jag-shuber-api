package ca.bc.gov.jag.shuber;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.context.MessageSource;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.validation.Validator;
import org.springframework.validation.beanvalidation.LocalValidatorFactoryBean;

/**
 * Enables {@code javax.validation.constraints.*} messages to be interpreted by Spring, so 
 * you can use messages.properties instead of ValidationMessages.properties as specified by
 * java specification.
 * 
 * @author michael.gabelmann
 */
@Configuration
public class ValidationConfig {
	/** Logger. */
	private static final Logger log = LogManager.getLogger(ValidationConfig.class);
	
	@Bean
    public Validator validator(MessageSource messageSource) {
		if (log.isDebugEnabled()) {
			log.debug("initializing validation message source");
		}
		
        LocalValidatorFactoryBean factory = new LocalValidatorFactoryBean();
        factory.setValidationMessageSource(messageSource);
        
        return factory;
    }
	
}
