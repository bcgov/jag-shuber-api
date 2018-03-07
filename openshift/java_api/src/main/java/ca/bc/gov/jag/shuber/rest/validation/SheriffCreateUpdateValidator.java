package ca.bc.gov.jag.shuber.rest.validation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

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
	
	/** Constructor. */
	@Autowired
	public SheriffCreateUpdateValidator(SheriffDAO sheriffDao) {
		this.sheriffDao = sheriffDao;
	}
	
	@Override
	public boolean supports(Class<?> clazz) {
		return Sheriff.class.isAssignableFrom(clazz);
	}

	@Override
	public void validate(Object target, Errors errors) {
		Sheriff s = (Sheriff) target;
		
		//global error example
		//errors.reject("error.record.exists", null, "Record exists");
		
		//field error example
		//errors.rejectValue("badgeNo", "error.record.exists.Sheriff.badgeNo", new Object[] {s.getBadgeNo()}, "Badge number already exists.");
		
		/* TYPES OF VALIDATION:
		 * 
		 * NOTE: REQUIRED FIELDS (can be handled via annotations on the entity)
		 * NOTE: FIELD VALIDATION (can be handled via annotations on the entity)
		 * NOTE: FIELD INTERACTIONS
		 * NOTE: BUSINESS LOGIC
		 * 
		 * NOTE: Spring adds the Entity and Field to the given property for you, 
		 *       so "error.validation.exists" becomes "error.validation.exists.Sheriff.badgeNo"
		 */
		
		//NOTE: alternatively you could use @NotEmpty, @NotNull, etc.
		if (s.getBadgeNo() == null || s.getBadgeNo().trim().equals("")) {
			errors.rejectValue("badgeNo", "error.validation.required", "Badge Number is required");
		}
		
		Sheriff tmp = sheriffDao.findByBadgeNo(s.getBadgeNo());
		boolean exists = tmp != null;
		if (exists) {
			errors.rejectValue("badgeNo", "error.validation.exists.Sheriff.badgeNo", new Object[] {s.getBadgeNo()}, "Badge number already exists.");
		}
	}

}
