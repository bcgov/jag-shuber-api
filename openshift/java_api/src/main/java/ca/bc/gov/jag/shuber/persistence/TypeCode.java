package ca.bc.gov.jag.shuber.persistence;

/**
*
* @author michael.gabelmann
*/
public interface TypeCode<T> {
	/**
	 * Get code.
	 * @return code
	 */
	T getCode();
	
	/**
	 * Set code.
	 * @param code value
	 */
	void setCode(T code);
}
