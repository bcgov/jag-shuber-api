package ca.bc.gov.jag.shuber.rest.request;

import java.time.LocalDate;

/**
 * 
 * @author michael.gabelmann
 */
public class ExpiryDate {
	public LocalDate expiryDate;
	
	public ExpiryDate() {}
	public ExpiryDate(LocalDate expiryDate) {
		this.expiryDate = expiryDate;
	}
}
