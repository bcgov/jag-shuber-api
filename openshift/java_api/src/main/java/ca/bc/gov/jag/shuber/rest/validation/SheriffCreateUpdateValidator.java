package ca.bc.gov.jag.shuber.rest.validation;

import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

import ca.bc.gov.jag.shuber.persistence.model.Sheriff;

/**
 * Validate business rules for a Sheriff.
 * 
 * @author michael.gabelmann
 * @see ValidatorBeanInitializer
 */
@Component("beforeCreateSheriffValidator")
public class SheriffCreateUpdateValidator implements Validator {

	@Override
	public boolean supports(Class<?> clazz) {
		return Sheriff.class.isAssignableFrom(clazz);
	}

	@Override
	public void validate(Object target, Errors errors) {
		Sheriff s = (Sheriff) target;
		
		//NOTE: this should probably be smarter, but for now we are just testing.
		
		//global error
		errors.reject("error.record.exists", null, "Record exists");
		
		//field error
		errors.rejectValue("badgeNo", "error.record.exists.Sheriff.badgeNo", new Object[] {s.getBadgeNo()}, "Badge number already exists.");
	}
	
}
