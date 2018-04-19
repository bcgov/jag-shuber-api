package ca.bc.gov.jag.shuber.rest.request;

import java.time.LocalDate;

/**
 * 
 * @author michael.gabelmann
 */
public class ExpiryDate {
	private LocalDate expiryDate;
	
	
	public ExpiryDate() {}
	
	public ExpiryDate(LocalDate expiryDate) {
		this.expiryDate = expiryDate;
	}
	
	public LocalDate getExpiryDate() {
		return expiryDate;
	}
	
	public void setExpiryDate(LocalDate expiryDate) {
		this.expiryDate = expiryDate;
	}
	
}
