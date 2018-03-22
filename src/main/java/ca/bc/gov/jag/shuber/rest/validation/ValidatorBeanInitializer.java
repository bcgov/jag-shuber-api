package ca.bc.gov.jag.shuber.rest.validation;

import java.util.Arrays;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.event.ValidatingRepositoryEventListener;
import org.springframework.validation.Validator;

/**
 * To fix an issue in Spring where events are not registered. This will auto-register
 * implementations of Validator
 * 
 * @see https://jira.spring.io/browse/DATAREST-524
 * @see http://www.baeldung.com/spring-data-rest-validators
 * @see org.springframework.validation.Validator
 */
@Configuration
public class ValidatorBeanInitializer implements InitializingBean {

	@Autowired
	ValidatingRepositoryEventListener validatingRepositoryEventListener;

	@Autowired
	private Map<String, Validator> validators;

	@Override
	public void afterPropertiesSet() throws Exception {
		List<String> events = Arrays.asList("beforeCreate", "beforeSave");
		for (Map.Entry<String, Validator> entry : validators.entrySet()) {
			events.stream().filter(p -> entry.getKey().startsWith(p)).findFirst().ifPresent(p -> validatingRepositoryEventListener.addValidator(p, entry.getValue()));
		}
	}
	
}
