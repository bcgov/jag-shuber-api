package ca.bc.gov.jag.shuber.rest.validation;

import java.util.Arrays;
import java.util.List;
import java.util.Map;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.event.ValidatingRepositoryEventListener;
import org.springframework.stereotype.Component;
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
	private String BEFORE_CREATE = "beforeCreate";
	private String BEFORE_SAVE = "beforeSave";
	private String BEFORE_DELETE = "beforeDelete";
	
	//NOTE: spring defines others for AFTER
	/** Custom string to indicate both create and update. */
	private String BEFORE_CREATE_OR_SAVE = "customBeforeCreateOrSave";
	
	/** List of event types to check for. */
	private List<String> events = Arrays.asList(BEFORE_CREATE, BEFORE_SAVE, BEFORE_DELETE);
	
	/** Logger. */
	private static final Logger log = LogManager.getLogger(ValidatorBeanInitializer.class);
	
	
	@Autowired
	private ValidatingRepositoryEventListener validatingRepositoryEventListener;

	@Autowired
	private Map<String, Validator> validators;

	@Override
	public void afterPropertiesSet() throws Exception {
		if (log.isInfoEnabled()) {
			log.info("custom validators initialized " + this.getClass().getName());
		}
		
		//events.stream().filter(p -> entry.getKey().startsWith(p)).findFirst().ifPresent(p -> validatingRepositoryEventListener.addValidator(p, entry.getValue()));
		
		for (Map.Entry<String, Validator> entry : validators.entrySet()) {	
			for (String event : events) {
				if (entry.getKey().startsWith(BEFORE_CREATE_OR_SAVE)) {
					validatingRepositoryEventListener.addValidator(BEFORE_CREATE, entry.getValue());
					validatingRepositoryEventListener.addValidator(BEFORE_SAVE, entry.getValue());
					
					if (log.isDebugEnabled()) {
						log.debug("Adding validators (" + BEFORE_CREATE + ", " + BEFORE_SAVE +") for " + entry.getKey());
					}
					
					break;
					
				} else if (entry.getKey().startsWith(event)) {
					validatingRepositoryEventListener.addValidator(event, entry.getValue());
					
					if (log.isDebugEnabled()) {
						log.debug("Adding validator (" + event + ") for " + entry.getKey());
					}
					
					break;
				}
			}
		}
	}
	
}
