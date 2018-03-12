package ca.bc.gov.jag.shuber.rest.exception;

import java.io.Serializable;

/**
 * Values set using {@code .reject()} will be mapped to this object.
 * 
 * @author michael.gabelmann
 * @see org.springframework.validation.ObjectError
 */
public class RestGlobalError implements Serializable {
	/** UID. */
	private static final long serialVersionUID = 1L;
	
	/** Name of the object or entity. */
	private String objectName;
	
	/** Message key. */
	private String code;
	
	/** Default message (if any, not localized). */
	private String defaultMessage;
	
	/** Localized message. See messages.properties */
	private String localizedMessage;

	
	/** Constructor. */
	public RestGlobalError() {}
	
	/**
	 * Constructor.
	 * @param objectName name of object
	 * @param code message key
	 * @param defaultMessage non localized message
	 * @param localizedMessage localized message
	 */
	public RestGlobalError(String objectName, String code, String defaultMessage, String localizedMessage) {
		this.objectName = objectName;
		this.code = code;
		this.defaultMessage = defaultMessage;
		this.localizedMessage = localizedMessage;
	}

	public String getObjectName() {
		return objectName;
	}

	public void setObjectName(String objectName) {
		this.objectName = objectName;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public String getDefaultMessage() {
		return defaultMessage;
	}

	public void setDefaultMessage(String defaultMessage) {
		this.defaultMessage = defaultMessage;
	}

	public String getLocalizedMessage() {
		return localizedMessage;
	}

	public void setLocalizedMessage(String localizedMessage) {
		this.localizedMessage = localizedMessage;
	}

}
