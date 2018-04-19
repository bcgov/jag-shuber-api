package ca.bc.gov.jag.shuber.persistence;

import java.time.LocalDateTime;

/**
 *
 * @author michael.gabelmann
 */
public interface DateTimeRange {
	/**
	 * Get start datetime.
	 * @return datetime
	 */
	LocalDateTime getStartDtm();

	/**
	 * Set start datetime
	 * @param startDtm datetime
	 */
    void setStartDtm(LocalDateTime startDtm);

    /**
     * Get end datetime.
     * @return datetime
     */
    LocalDateTime getEndDtm();

    /**
     * Set end datetime
     * @param endDtm datetime
     */
    void setEndDtm(LocalDateTime endDtm);
    
}
