package ca.bc.gov.jag.shuber.rest.validation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;
import org.springframework.validation.beanvalidation.SpringValidatorAdapter;

import ca.bc.gov.jag.shuber.persistence.dao.SheriffDAO;
import ca.bc.gov.jag.shuber.persistence.model.Sheriff;

/**
 * Validate business rules for a Sheriff.
 * 
 * @author michael.gabelmann
 * @see ValidatorBeanInitializer
 */
@Component("beforeCreateSheriffValidator")
public class SheriffCreateUpdateValidator implements Validator {
	/** Sheriff data access object. */
	private SheriffDAO sheriffDao;
	
	/** Bean validator. */
	private SpringValidatorAdapter validator;
	
	
	/**
	 * Constructor.
	 * @param sheriffDao 
	 * @param validator
	 */
	@Autowired
	public SheriffCreateUpdateValidator(SheriffDAO sheriffDao, SpringValidatorAdapter validator) {
		this.sheriffDao = sheriffDao;
		this.validator = validator;
	}
	
	@Override
	public boolean supports(Class<?> clazz) {
		return Sheriff.class.isAssignableFrom(clazz);
	}

	@Override
	public void validate(Object target, Errors errors) {
		Sheriff s = (Sheriff) target;
		
		/* TYPES OF VALIDATION:
		 * 
		 * NOTE: REQUIRED FIELDS (can be handled via annotations on the entity)
		 * NOTE: FIELD VALIDATION (can be handled via annotations on the entity)
		 * NOTE: FIELD INTERACTIONS
		 * NOTE: BUSINESS LOGIC
		 * 
		 * NOTE: Spring adds the Entity and Field to the given property for you, 
		 *       so "error.validation.exists" becomes "error.validation.exists.Sheriff.badgeNo"
		 *       
		 * global error example:
		 * errors.reject("error.validation.exists", null, "Record exists");
		 * 
		 * field error example:
		 * errors.rejectValue("badgeNo", "error.validation.exists", new Object[] {s.getBadgeNo()}, "Badge number already exists.");
		 */
		
		//validate the bean
		this.validator.validate(s, errors);
		
		if (errors.hasErrors()) {
			return;
		}
		
		Sheriff tmp = sheriffDao.findByBadgeNo(s.getBadgeNo());
		boolean exists = tmp != null;
		if (exists) {
			errors.rejectValue("badgeNo", "error.validation.exists", new Object[] {s.getBadgeNo()}, "Badge number already exists.");
		}
	}

}
