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
	public LocalDateTime startDtm;
	public LocalDateTime endDtm;
	public byte sheriffsRequired;
	public List<SheriffDuty> sheriffDuties;

	public SimpleDuty() {}
	
	public SimpleDuty(String assignmentIdPath, String dutyRecurrenceIdPath, LocalDateTime startDtm, LocalDateTime endDtm, byte sheriffsRequired, List<SheriffDuty> sheriffDuties) {
		this.assignmentIdPath = assignmentIdPath;
		this.dutyRecurrenceIdPath = dutyRecurrenceIdPath;
		this.startDtm = startDtm;
		this.endDtm = endDtm;
		this.sheriffsRequired = sheriffsRequired;
		this.sheriffDuties = sheriffDuties;
	}
	
}
