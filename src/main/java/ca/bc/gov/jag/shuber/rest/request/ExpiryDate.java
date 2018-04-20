package ca.bc.gov.jag.shuber.rest.request;

import java.time.LocalDate;

import javax.validation.constraints.NotNull;

/**
 * 
 * @author michael.gabelmann
 */
public class ExpiryDate {
	@NotNull
	private LocalDate expiryDate;
	
	
	public ExpiryDate() {
		this.expiryDate = LocalDate.now();
	}
	
	public ExpiryDate(@NotNull LocalDate expiryDate) {
		this.expiryDate = expiryDate;
	}
	
	public LocalDate getExpiryDate() {
		return expiryDate;
	}
	
	public void setExpiryDate(LocalDate expiryDate) {
		this.expiryDate = expiryDate;
	}
	
	@Override
	public String toString() {
		StringBuilder sb = new StringBuilder();
		sb.append(ExpiryDate.class.getSimpleName());
		sb.append("[expiryDate=");
		sb.append(expiryDate != null ? expiryDate.toString() : "");
		sb.append("]");
		
		return sb.toString();
	}
}
