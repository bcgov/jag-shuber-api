package ca.bc.gov.jag.shuber.persistence;

/**
 * Describes code tables.
 * 
 * @author michael.gabelmann
 */
public interface TypeCode {
	/**
	 * Get code. 
	 * @return code
	 */
	String getTypeCode();
	
	/**
	 * Get description.
	 * @return description
	 */
	String getDescription();
	
	/**
	 * Set description.
	 * @param description description
	 */
	void setDescription(String description);
	
}
