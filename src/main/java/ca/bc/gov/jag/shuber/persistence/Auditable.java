package ca.bc.gov.jag.shuber.persistence;

import java.util.Date;

/**
 *
 * @author michael.gabelmann
 */
public interface Auditable {
	/**
	 * Get created by.
	 * @return created by
	 */
	String getCreatedBy();
	
	/**
	 * Set created by.
	 * @param createdBy 
	 */
	void setCreatedBy(String createdBy);
	
	/**
	 * Get updated by.
	 * @return updated by
	 */
	String getUpdatedBy();
	
	/**
	 * Set updated by.
	 * @param updatedBy
	 */
	void setUpdatedBy(String updatedBy);
	
	/**
	 * Get created date/time.
	 * @return created date/time
	 */
	Date getCreatedDtm();
	
	/**
	 * Set created date/time.
	 * @param createdDtm date/time
	 */
	void setCreatedDtm(Date createdDtm);
	
	/**
	 * Get updated date/time.
	 * @return updated date/time
	 */
	Date getUpdatedDtm();
	
	/**
	 * Set updated date/time.
	 * @param updatedDtm date/time
	 */
	void setUpdatedDtm(Date updatedDtm);
}