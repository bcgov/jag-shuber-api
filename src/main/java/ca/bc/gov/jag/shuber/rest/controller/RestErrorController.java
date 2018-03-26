package ca.bc.gov.jag.shuber.rest.controller;

import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Maps /error to something instead of Whitelabel Error page.
 * 
 * @author michael.gabelmann
 */
@RestController
@RequestMapping(RestErrorController.PATH)
public class RestErrorController implements ErrorController {
	/** Error path. */
	public static final String PATH = "/error";

	
    @RequestMapping(value = PATH)
    public String error() {
        return "Error handling";
    }

    @Override
    public String getErrorPath() {
        return PATH;
    }
}
