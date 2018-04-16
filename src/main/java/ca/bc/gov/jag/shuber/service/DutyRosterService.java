package ca.bc.gov.jag.shuber.service;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

import ca.bc.gov.jag.shuber.persistence.model.Duty;

/**
 * 
 * @author michael.gabelmann
 */
public interface DutyRosterService {

	/**
	 * 
	 * @param courthouseId
	 * @param date
	 * @return
	 */
	List<Duty> createDefaultDuties(UUID courthouseId, LocalDate date);

	/**
	 * 
	 * @param assignmentId
	 * @param date
	 */
	boolean expireAssignment(UUID assignmentId, LocalDate date);
	
	/**
	 * 
	 * @param dutyRecurrenceId
	 * @param date
	 */
	boolean expireDutyRecurrence(UUID dutyRecurrenceId, LocalDate date);
	
}
