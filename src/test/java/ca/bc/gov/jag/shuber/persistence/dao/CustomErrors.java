package ca.bc.gov.jag.shuber.persistence.dao;

import java.util.ArrayList;
import java.util.List;

import org.springframework.validation.AbstractErrors;
import org.springframework.validation.Errors;
import org.springframework.validation.FieldError;
import org.springframework.validation.ObjectError;

/**
 * 
 * @author michael.gabelmann
 */
public class CustomErrors extends AbstractErrors {
	private static final long serialVersionUID = 1L;
	
	private String objectName;
	private List<ObjectError> globalErrors;
	private List<FieldError> fieldErrors;
	
	public CustomErrors(String objectName) {
		this.objectName = objectName;
		this.globalErrors = new ArrayList<ObjectError>();
		this.fieldErrors = new ArrayList<FieldError>();
	}
	
	
	@Override
	public String getObjectName() {
		return objectName;
	}

	@Override
	public void reject(String errorCode, Object[] errorArgs, String defaultMessage) {
		ObjectError error = new ObjectError(objectName, new String[] {errorCode}, errorArgs, defaultMessage);
		globalErrors.add(error);
	}

	@Override
	public void rejectValue(String field, String errorCode, Object[] errorArgs, String defaultMessage) {
		FieldError error = new FieldError(objectName, field, defaultMessage);
		fieldErrors.add(error);
	}

	@Override
	public void addAllErrors(Errors errors) {
		globalErrors.addAll(errors.getGlobalErrors());
		fieldErrors.addAll(errors.getFieldErrors());
	}

	@Override
	public List<ObjectError> getGlobalErrors() {
		return globalErrors;
	}

	@Override
	public List<FieldError> getFieldErrors() {
		return fieldErrors;
	}

	@Override
	public Object getFieldValue(String field) {
		return "field";
	}

}
