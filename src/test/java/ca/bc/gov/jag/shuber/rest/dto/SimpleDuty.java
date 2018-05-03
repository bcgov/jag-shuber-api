package ca.bc.gov.jag.shuber.rest.dto;

import java.time.LocalDateTime;
import java.util.List;

import ca.bc.gov.jag.shuber.persistence.model.SheriffDuty;

/**
 * 
 * @author michael.gabelmann
 */
public class SimpleDuty {
	public String assignmentIdPath;
	public String dutyRecurrenceIdPath;
	public LocalDateTime startDateTime;
	public LocalDateTime endDateTime;
	public byte sheriffsRequired;
	public List<SheriffDuty> sheriffDuties;

	public SimpleDuty() {}
	
	public SimpleDuty(String assignmentIdPath, String dutyRecurrenceIdPath, LocalDateTime startDateTime, LocalDateTime endDateTime, byte sheriffsRequired, List<SheriffDuty> sheriffDuties) {
		this.assignmentIdPath = assignmentIdPath;
		this.dutyRecurrenceIdPath = dutyRecurrenceIdPath;
		this.startDateTime = startDateTime;
		this.endDateTime = endDateTime;
		this.sheriffsRequired = sheriffsRequired;
		this.sheriffDuties = sheriffDuties;
	}
	
}
