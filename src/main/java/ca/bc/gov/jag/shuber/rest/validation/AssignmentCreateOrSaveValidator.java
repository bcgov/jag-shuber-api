package ca.bc.gov.jag.shuber.rest.validation;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;
import org.springframework.validation.beanvalidation.SpringValidatorAdapter;

import ca.bc.gov.jag.shuber.persistence.dao.AssignmentDAO;
import ca.bc.gov.jag.shuber.persistence.model.Assignment;
import ca.bc.gov.jag.shuber.persistence.model.WorkSectionCode.WORK_SECTION_CODE;

/**
 * Validate business rules for an Assignment.
 * 
 * @author michael.gabelmann
 * @see ValidatorBeanInitializer
 */
@Component("customBeforeCreateOrSaveAssignmentValidator")
public class AssignmentCreateOrSaveValidator implements Validator {
	/** Logger. */
	private static final Logger log = LogManager.getLogger(AssignmentCreateOrSaveValidator.class);
	
	/** Sheriff data access object. */
	private AssignmentDAO assignmentDao;
	
	/** Bean validator. */
	private SpringValidatorAdapter validator;
	
	public AssignmentCreateOrSaveValidator(AssignmentDAO assignmentDao, SpringValidatorAdapter validator) {
		this.assignmentDao = assignmentDao;
		this.validator = validator;
	}
	
	@Override
	public boolean supports(Class<?> arg0) {
		return Assignment.class.isAssignableFrom(arg0);
	}

	@Override
	public void validate(Object target, Errors errors) {
		Assignment a = (Assignment) target;
		
		if (log.isDebugEnabled()) {
			log.debug("valiating assignment record");
		}
		
		//validate the bean
		this.validator.validate(a, errors);
		
		if (errors.hasErrors()) {
			return;
		}
		
		WORK_SECTION_CODE wsc = WORK_SECTION_CODE.valueOf(a.getWorkSectionCode().getWorkSectionCode());
		
		switch (wsc) {
		case COURTS:
			{
				if (a.getCourtroom() == null) {
					errors.rejectValue("courtroom", "error.validation.workSectionCode", "courtroom is required for COURTS");
				}
				break;
			}
		case JAIL:
			{
				if (a.getJailRoleCode() == null) {
					errors.rejectValue("jailRoleCode", "error.validation.workSectionCode", "jail role code is required for JAIL");
				}
				break;
			}
		case ESCORTS:
			{
				if (a.getRun() == null) {
					errors.rejectValue("run", "error.validation.workSectionCode", "run is required for ESCORTS");
				}
				break;
			}
		case OTHER:
		default:
			{
				if (a.getOtherAssignCode() == null) {
					errors.rejectValue("otherAssignCode", "error.validation.workSectionCode", "other assign code is required for OTHER");
				}
				break;
			}
		}
	}

}
