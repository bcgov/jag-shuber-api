package ca.bc.gov.jag.shuber.service;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

import ca.bc.gov.jag.shuber.persistence.model.Shift;
import ca.bc.gov.jag.shuber.rest.request.ShiftCopyOptions;
import ca.bc.gov.jag.shuber.rest.request.ShiftCreateOptions;

/**
 * 
 * @author michael.gabelmann
 */
public interface ScheduleService {
	
	/**
	 * 
	 * @param courthouseId
	 * @param options
	 * @return
	 */
	List<Shift> copyShifts(UUID courthouseId, ShiftCopyOptions options);
	
	/**
	 * 
	 * @param courthouseId
	 * @param options
	 * @return
	 */
	List<Shift> createShifts(UUID courthouseId, ShiftCreateOptions options);
	
	/**
	 * 
	 * @param courthouseId
	 * @param date
	 */
	void deleteShiftsForDate(UUID courthouseId, LocalDate date);
	
}
