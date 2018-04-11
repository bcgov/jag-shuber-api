package ca.bc.gov.jag.shuber.rest.exception;

import java.util.ArrayList;
import java.util.List;
import java.util.Locale;
import java.util.Set;
import java.util.stream.Collectors;

import javax.validation.ConstraintViolation;
import javax.validation.ConstraintViolationException;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.TypeMismatchException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.context.NoSuchMessageException;
import org.springframework.data.rest.core.RepositoryConstraintViolationException;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.transaction.TransactionSystemException;
import org.springframework.validation.BindException;
import org.springframework.validation.BindingResult;
import org.springframework.validation.Errors;
import org.springframework.validation.FieldError;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.MissingServletRequestParameterException;
import org.springframework.web.bind.ServletRequestBindingException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.multipart.support.MissingServletRequestPartException;
import org.springframework.web.servlet.NoHandlerFoundException;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

/**
 * Make error messages more meaningful. To disable simply comment out the {@code @ControllerAdvice} 
 * annotation. This will return to Springs validation and event handling.
 * 
 * <pre>
 * Default Spring error message format:
 * {  
 *  "errors":[  
 *    {  
 *      "entity":"Sheriff",
 *      "property":"badgeNo",
 *      "invalidValue":"XX1234",
 *      "message":"A Sheriff with badge number XX1234 already exists"
 *    }]
 * }
 * 
 * More meaningful messages:
 * {  
 *  "datetime":"2018-03-02 01:14:12",
 *  "exception":"org.springframework.data.rest.core.RepositoryConstraintViolationException",
 *  "globalErrors":[  
 *    {  
 *      "objectName":"Sheriff",
 *      "code":"error.record.exists",
 *      "defaultMessage":"Record exists",
 *      "localizedMessage":"Duplicate record."
 *    }],
 *  "fieldErrors":[  
 *    {  
 *      "objectName":"Sheriff",
 *      "code":"error.record.exists.Sheriff.badgeNo",
 *      "defaultMessage":"Badge number already exists.",
 *      "localizedMessage":"A Sheriff with badge number XX1234 already exists",
 *      "field":"badgeNo",
 *      "rejectedValue":"XX1234"
 *    }]
 * }
 * </pre>
 * 
 * @see http://www.baeldung.com/spring-data-rest-validators
 */
@ControllerAdvice
public class RestResponseEntityExceptionHandler extends ResponseEntityExceptionHandler {
	/** Logger. */
	private static final Logger log = LogManager.getLogger(RestResponseEntityExceptionHandler.class);
	
	@Autowired
	private MessageSource messageSource;


	/**
	 * Handle errors  thrown by {@code Validator}.
	 * 
	 * @param e exception
	 * @param request web request
	 * @return response
	 * @see org.springframework.validation.Validator
	 */
	@ExceptionHandler(RepositoryConstraintViolationException.class)
	public ResponseEntity<Object> handleRepositoryConstraintViolationException(
		Exception e, 
		WebRequest request) {
		
		RepositoryConstraintViolationException rcve = (RepositoryConstraintViolationException) e;
		Errors errors = rcve.getErrors();

		if (log.isDebugEnabled()) {
			log.debug("Handling errors from Validator, message=" + e.getMessage());
		}
		
		RestErrors ve = this.getValidationErrors(errors.getGlobalErrors(), errors.getFieldErrors(), e);
		
		return new ResponseEntity<>(ve, new HttpHeaders(), HttpStatus.BAD_REQUEST);
	}
	
	/**
	 * If we didn't implement a validator for an Entity or the validator is 
	 * not validating the correct type (save/update/delete), then Hibernate/Spring 
	 * will throw these errors when it tries to persist the object.
	 * 
	 * <pre>
	 *	List of constraint violations:[
	 *	ConstraintViolationImpl{
	 *		interpolatedMessage='must not be empty', 
	 *		propertyPath=badgeNo, 
	 *		rootBeanClass=class ca.bc.gov.jag.shuber.persistence.model.Sheriff, 
	 *		messageTemplate='{javax.validation.constraints.NotEmpty.message}'
	 *	}
	 *	ConstraintViolationImpl{
	 *		interpolatedMessage='must not be empty', 
	 *		propertyPath=userid, 
	 *		rootBeanClass=class ca.bc.gov.jag.shuber.persistence.model.Sheriff, 
	 *		messageTemplate='{javax.validation.constraints.NotEmpty.message}'
	 *	}
	 * </pre>
	 * 
	 * @param e exception
	 * @param request web request
	 * @return response
	 */
	@ExceptionHandler(TransactionSystemException.class)
	public ResponseEntity<Object> handleTransactionSystemException(
		Exception e, 
		WebRequest request) {
		
		TransactionSystemException tse = (TransactionSystemException) e;
		Throwable rc = tse.getRootCause();	
		RestErrors ve = null;
		
		if (log.isDebugEnabled()) {
			log.debug("Handling errors from Validation annotations checked by Hibernate, message=" + e.getMessage());
		}

		if (rc instanceof ConstraintViolationException) {
			ConstraintViolationException cve = (ConstraintViolationException) rc;
			Set<ConstraintViolation<?>> violations = cve.getConstraintViolations();
			List<FieldError> fieldErrors = new ArrayList<>();
			
			for (ConstraintViolation<?> violation : violations) {
				String objectName = violation.getRootBeanClass().getName();
				String field = violation.getPropertyPath().toString();
				Object rejectedValue = violation.getInvalidValue();
				boolean bindingFailure = false;
				String[] codes = new String[]{ violation.getMessageTemplate() };
				Object[] arguments = violation.getExecutableParameters();
				String defaultMessage = violation.getMessage();
				
				fieldErrors.add(new FieldError(objectName, field, rejectedValue, bindingFailure, codes, arguments, defaultMessage));
			}
			
			ve = this.getValidationErrors(null, fieldErrors, e);
			
		} else {
			ve = this.getValidationErrors(null, null, tse);
		}
		
		return new ResponseEntity<>(ve, new HttpHeaders(), HttpStatus.BAD_REQUEST);
	}
	
	@Override
	protected ResponseEntity<Object> handleNoHandlerFoundException(
		NoHandlerFoundException ex,
		HttpHeaders headers, 
		HttpStatus status, 
		WebRequest request) {
		
		if (log.isDebugEnabled()) {
			log.debug("Handling no handler found (bad URI, resource not found, etc), message=" + ex.getMessage());
		}

		return getResponse(ex, "error.global.noHandlerFound", HttpStatus.NOT_FOUND);
	}
	
	@Override
	protected ResponseEntity<Object> handleMethodArgumentNotValid(
		MethodArgumentNotValidException ex,
		HttpHeaders headers, 
		HttpStatus status, 
		WebRequest request) {
		
		BindingResult bindingResult = ex.getBindingResult();
		
		if (log.isDebugEnabled()) {
			log.debug("Handling errors from @Valid/@Validated, message=" + ex.getMessage());
		}
		
		RestErrors ve = this.getValidationErrors(bindingResult.getGlobalErrors(), bindingResult.getFieldErrors(), ex);
		
		return new ResponseEntity<>(ve, HttpStatus.BAD_REQUEST);
	}
	
	@Override
	protected ResponseEntity<Object> handleBindException(
		BindException ex,
		HttpHeaders headers, 
		HttpStatus status, 
		WebRequest request) {
		
		if (log.isDebugEnabled()) {
			log.debug("Handling bind error, message=" + ex.getMessage());
		}

		return getResponse(ex, "error.global.bindError", HttpStatus.BAD_REQUEST);
	}
	
	@Override
	protected ResponseEntity<Object> handleMissingServletRequestPart(
		MissingServletRequestPartException ex,
		HttpHeaders headers, 
		HttpStatus status, 
		WebRequest request) {
		
		if (log.isDebugEnabled()) {
			log.debug("Handling missing servlet request part, message=" + ex.getMessage());
		}

		return getResponse(ex, "error.global.missingServletRequestPart", HttpStatus.BAD_REQUEST);
	}
	
	
	@Override
	protected ResponseEntity<Object> handleTypeMismatch(
		TypeMismatchException ex,
		HttpHeaders headers, 
		HttpStatus status, 
		WebRequest request) {
		
		if (log.isDebugEnabled()) {
			log.debug("Handling type mismatch, message=" + ex.getMessage());
		}

		return getResponse(ex, "error.global.typeMismatch", HttpStatus.BAD_REQUEST);
	}
	
	@Override
	protected ResponseEntity<Object> handleServletRequestBindingException(
		ServletRequestBindingException ex,
		HttpHeaders headers, 
		HttpStatus status, 
		WebRequest request) {
		
		if (log.isDebugEnabled()) {
			log.debug("Handling servlet request binding, message=" + ex.getMessage());
		}

		return getResponse(ex, "error.global.servletRequestBinding", HttpStatus.BAD_REQUEST);
	}
	
	@Override
	protected ResponseEntity<Object> handleMissingServletRequestParameter(
		MissingServletRequestParameterException ex,
		HttpHeaders headers, 
		HttpStatus status, 
		WebRequest request) {
		
		if (log.isDebugEnabled()) {
			log.debug("Handling missing servlet request parameter, message=" + ex.getMessage());
		}

		return getResponse(ex, "error.global.missingServletRequestParameter", HttpStatus.BAD_REQUEST);
	}
	
	@Override
	protected ResponseEntity<Object> handleHttpMessageNotReadable(
		HttpMessageNotReadableException ex, 
		HttpHeaders headers, 
		HttpStatus status, 
		WebRequest request) {
		
		if (log.isDebugEnabled()) {
			log.debug("Handling errors for a bad request (malformed JSON, etc), message=" + ex.getMessage());
		}

		return getResponse(ex, "error.global.messageNotReadable", HttpStatus.BAD_REQUEST);
	}
	
	/**
	 * Helper method that maps errors to our custom objects.
	 * 
	 * @param globalErrors global errors
	 * @param fieldErrors field errors
	 * @param e exception
	 * @return errors
	 */
	RestErrors getValidationErrors(
		List<ObjectError> globalErrors, 
		List<FieldError> fieldErrors,
		Exception e) {
		
		if (fieldErrors == null) fieldErrors = new ArrayList<>();
		if (globalErrors == null) globalErrors = new ArrayList<>();
		
		if (log.isDebugEnabled()) {
			//log errors received
			globalErrors.stream().forEach(f -> log.debug("globalError=" + f.toString()));
			fieldErrors.stream().forEach(f -> log.debug("fieldError=" + f.toString() + ", code=" + f.getCode() + ", args=" + f.getArguments()));
		}
		
		List<RestGlobalError> ge = globalErrors
			.stream()
			.map(globalError -> new RestGlobalError(
				globalError.getObjectName(), 
				globalError.getCode(), 
				globalError.getDefaultMessage(), 
				messageSource.getMessage(globalError.getCode(), globalError.getArguments(), Locale.getDefault())))
			.collect(Collectors.toList());
		
		List<RestFieldError> fe = new ArrayList<>();
		for (FieldError fieldError : fieldErrors) {
			fe.add(getLocalizedFieldErrorMessage(fieldError));
		}
		
		RestErrors re = new RestErrors(ge, fe);
		re.setException(e);
		
		return re;
	}
	
	/**
	 * Convert a FieldError into a RestFieldError which uses a localized message if available. Messages
	 * from javax.validation are found in ValidationMessages.properties, but we use Springs mechanism for 
	 * this, but we need to strip off { and } from the message if it exists so that Spring will be able to
	 * find the corresponding value in messages.properties.
	 * 
	 * @param fieldError error
	 * @return rest error
	 */
	RestFieldError getLocalizedFieldErrorMessage(FieldError fieldError) {
		String[] codes = fieldError.getCodes();
		String localizedMessage = null;
		String code = null;
		
		for (int i = 0; i < codes.length; i++) {
			try {
				code = codes[i];
				
				if (code.startsWith("{") && code.endsWith("}")) {
					/* make java.validation.constraints messages compatible with spring error messages
					 * alternatively you could have 2 sets of messages or override the message for each validation annotation
					 */
					code = code.substring(1, code.length() - 1);
					code = code.replaceFirst("^javax\\.validation\\.constraints\\.", "");
					code = code.replaceFirst("\\.message$", "");
				}
				
				localizedMessage = messageSource.getMessage(code, fieldError.getArguments(), Locale.getDefault());
				break;
				
			} catch (NoSuchMessageException nsme) {
				if (log.isDebugEnabled()) {
					log.debug("no localized message found for " + code);
				}
			}
		}
		
		if (localizedMessage == null) {
			localizedMessage = fieldError.getDefaultMessage();
		}

		return new RestFieldError(
			fieldError.getObjectName(), 
			code, 
			fieldError.getDefaultMessage(), 
			localizedMessage, 
			fieldError.getField(), 
			fieldError.getRejectedValue());
	}
	
	/**
	 * 
	 * @param e
	 * @param code
	 * @param status
	 * @return
	 */
	private ResponseEntity<Object> getResponse(Exception e, String code, HttpStatus status) {
		List<ObjectError> globalErrors = new ArrayList<>();
		globalErrors.add(new ObjectError("", new String[] {code}, null, e.getMessage()));
		
		RestErrors ve = this.getValidationErrors(globalErrors, null, e);
		return new ResponseEntity<>(ve, new HttpHeaders(), status);
	}
}
