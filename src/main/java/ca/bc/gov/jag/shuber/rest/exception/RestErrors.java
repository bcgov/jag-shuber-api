package ca.bc.gov.jag.shuber.rest.exception;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonFormat;

/**
 * Returns both global and field level errors since the default behaviour of Spring
 * is to only return field level errors. If you comment {@code @ControllerAdvice} 
 * in RestResponseEntityExceptionHandler you will turn off this style of validation 
 * and return to Springs.
 * 
 * @author michael.gabelmann
 */
public final class RestErrors implements Serializable {
	/** UID. */
	private static final long serialVersionUID = 1L;

	/** Current date/time. */
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd hh:mm:ss")
	private transient LocalDateTime datetime;
	
	/** Exception that triggered this. */
	private String exception;
	
	/** Global error messages. */
	private List<RestGlobalError> globalErrors;
	
	/** Field level messages. */
	private List<RestFieldError> fieldErrors;
	
	/** Constructor. */
	public RestErrors() {
		this(new ArrayList<RestGlobalError>(), new ArrayList<RestFieldError>());
	}

	/**
	 * Constructor.
	 * @param globalErrors list of global errors
	 * @param fieldErrors list of field errors
	 */
	public RestErrors(List<RestGlobalError> globalErrors, List<RestFieldError> fieldErrors) {
		this.datetime = LocalDateTime.now();
		this.globalErrors = globalErrors;
		this.fieldErrors = fieldErrors;
	}

	public LocalDateTime getDatetime() {
		return datetime;
	}
	
	public String getException() {
		return exception;
	}

	public void setException(String exception) {
		this.exception = exception;
	}
	
	//overloaded version
	public void setException(Exception exception) {
		if (exception != null) this.exception = exception.getClass().getName();
	}
	
	public List<RestGlobalError> getGlobalErrors() {
		return globalErrors;
	}

	public void setGlobalErrors(List<RestGlobalError> globalErrors) {
		this.globalErrors = globalErrors;
	}

	public List<RestFieldError> getFieldErrors() {
		return fieldErrors;
	}

	public void setFieldErrors(List<RestFieldError> fieldErrors) {
		this.fieldErrors = fieldErrors;
	}
	
}
