package ca.bc.gov.jag.shuber.rest.exception;

import java.util.ArrayList;
import java.util.List;
import java.util.Locale;
import java.util.stream.Collectors;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.data.rest.core.RepositoryConstraintViolationException;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.Errors;
import org.springframework.validation.FieldError;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
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
	 * Handle errors  thrown by {@code Validator}
	 * @param e exception
	 * @param request web request
	 * @return response
	 * @see org.springframework.validation.Validator
	 */
	@ExceptionHandler(RepositoryConstraintViolationException.class)
	public ResponseEntity<Object> handleValidationException(
		Exception e, 
		WebRequest request) {
		
		RepositoryConstraintViolationException rcve = (RepositoryConstraintViolationException) e;
		Errors errors = rcve.getErrors();

		if (log.isDebugEnabled()) {
			log.debug("Handling errors from Validation, message=" + e.getMessage());
		}
		
		RestErrors ve = this.getValidationErrors(errors.getGlobalErrors(), errors.getFieldErrors(), e);
		
		return new ResponseEntity<>(ve, new HttpHeaders(), HttpStatus.PARTIAL_CONTENT);
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
		
		return new ResponseEntity<>(ve, HttpStatus.UNPROCESSABLE_ENTITY);
	}
	
	/**
	 * Helper method that maps errors to our custom objects.
	 * @param globalErrors global errors
	 * @param fieldErrors field errors
	 * @param e exception
	 * @return errors
	 */
	private RestErrors getValidationErrors(
		List<ObjectError> globalErrors, 
		List<FieldError> fieldErrors,
		Exception e) {
		
		if (fieldErrors == null) fieldErrors = new ArrayList<>();
		if (globalErrors == null) globalErrors = new ArrayList<>();
		
		if (log.isDebugEnabled()) {
			//log errors received
			globalErrors.stream().forEach(f -> log.debug("globalError=" + f.toString()));
			fieldErrors.stream().forEach(f -> log.debug("fieldError=" + f.toString()));
		}
		
		List<RestGlobalError> ge = globalErrors
			.stream()
			.map(globalError -> new RestGlobalError(
				globalError.getObjectName(), 
				globalError.getCode(), 
				globalError.getDefaultMessage(), 
				messageSource.getMessage(globalError.getCode(), globalError.getArguments(), Locale.ENGLISH)))
			.collect(Collectors.toList());
		
		List<RestFieldError> fe = fieldErrors
			.stream()
			.map(fieldError -> new RestFieldError(
				fieldError.getObjectName(),
				fieldError.getCode(),
				fieldError.getDefaultMessage(),
				messageSource.getMessage(fieldError.getCode(), fieldError.getArguments(), Locale.ENGLISH),
				fieldError.getField(),
				fieldError.getRejectedValue()))
			.collect(Collectors.toList());
		
		RestErrors re = new RestErrors(ge, fe);
		re.setException(e);
		
		return re;
	}
	
}
