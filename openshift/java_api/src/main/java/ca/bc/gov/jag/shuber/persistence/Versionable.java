package ca.bc.gov.jag.shuber.persistence;

/**
 *
 * @author michael.gabelmann
 */
public interface Versionable {
	/**
	 * Get revision count.
	 * @return revision count
	 */
	long getRevisionCount();
	
	/**
	 * Set revision count.
	 * @param revisionCount revision count
	 */
	void setRevisionCount(long revisionCount);
}