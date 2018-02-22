package ca.bc.gov.jag.shuber.persistence;

import java.util.Date;

/**
*
* @author michael.gabelmann
*/
public interface Effective {
	/**
	 * Get effective date.
	 * @return effective date
	 */
	Date getEffectiveDate();
	
	/**
	 * Set effective date.
	 * @param effectiveDate effective date
	 */
	void setEffectiveDate(Date effectiveDate);
	
	/**
	 * Get expiry date.
	 * @return expiry date
	 */
	Date getExpiryDate();
	
	/**
	 * Set expiry date.
	 * @param expiryDate expiry date
	 */
	void setExpiryDate(Date expiredDate);
}
