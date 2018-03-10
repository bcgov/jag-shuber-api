package ca.bc.gov.jag.shuber;

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
	@Bean
    public Validator validator(MessageSource messageSource) {
        LocalValidatorFactoryBean factory = new LocalValidatorFactoryBean();
        factory.setValidationMessageSource(messageSource);
        return factory;
    }
}
