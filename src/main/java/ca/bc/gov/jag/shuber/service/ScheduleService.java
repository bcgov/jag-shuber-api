package ca.bc.gov.jag.shuber.service;

import java.time.LocalDate;
import java.util.List;

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
	 * @param options
	 * @return
	 */
	List<Shift> copyShifts(ShiftCopyOptions options);
	
	/**
	 * 
	 * @param options
	 * @return
	 */
	List<Shift> createShifts(ShiftCreateOptions options);
	
	/**
	 * 
	 * @param date
	 */
	void deleteShiftsForDate(LocalDate date);
	
}
