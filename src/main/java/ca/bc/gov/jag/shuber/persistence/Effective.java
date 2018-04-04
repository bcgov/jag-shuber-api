package ca.bc.gov.jag.shuber.persistence;

import java.time.LocalDate;

/**
*
* @author michael.gabelmann
*/
public interface Effective {
	/**
	 * Get effective date.
	 * @return effective date
	 */
	LocalDate getEffectiveDate();
	
	/**
	 * Set effective date.
	 * @param effectiveDate effective date
	 */
	void setEffectiveDate(LocalDate effectiveDate);
	
	/**
	 * Get expiry date.
	 * @return expiry date
	 */
	LocalDate getExpiryDate();
	
	/**
	 * Set expiry date.
	 * @param expiryDate expiry date
	 */
	void setExpiryDate(LocalDate expiredDate);
}
