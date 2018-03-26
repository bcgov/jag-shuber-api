package ca.bc.gov.jag.shuber.service;

import java.util.List;
import java.util.UUID;

import ca.bc.gov.jag.shuber.persistence.model.Shift;

/**
 * 
 * @author michael.gabelmann
 */
public interface ShiftService {
	
	/**
	 * Get a set of shifts for the given date range and courthouse location.
	 * @param startDate start date
	 * @param endDate end date
	 * @param locationId courthouse
	 * @return records
	 */
	List<Shift> getShiftsByDateRangeAndCourthouse(String startDate, String endDate, UUID locationId);
	
}
