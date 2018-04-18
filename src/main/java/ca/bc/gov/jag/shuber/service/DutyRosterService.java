package ca.bc.gov.jag.shuber.service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

import ca.bc.gov.jag.shuber.persistence.model.Assignment;
import ca.bc.gov.jag.shuber.persistence.model.Duty;
import ca.bc.gov.jag.shuber.persistence.model.DutyRecurrence;

/**
 * 
 * @author michael.gabelmann
 */
public interface DutyRosterService {

	/**
	 * Create default duties for a courthouse for given date.
	 * @param courthouseId
	 * @param date
	 * @return
	 */
	List<Duty> createDefaultDuties(UUID courthouseId, LocalDate date);

	/**
	 * 
	 * @param courthouseId
	 * @param startDtm
	 * @param endDtm
	 * @return
	 */
	List<Duty> getDutiesByCourthouseAndDateRange(UUID courthouseId, LocalDateTime startDtm, LocalDateTime endDtm);
	
	/**
	 * Expire assignment.
	 * @param assignmentId
	 * @param date optional
	 */
	Assignment expireAssignment(UUID assignmentId, LocalDate date);
	
	/**
	 * Expire duty recurrence.
	 * @param dutyRecurrenceId
	 * @param date optional
	 */
	DutyRecurrence expireDutyRecurrence(UUID dutyRecurrenceId, LocalDate date);
	
}
