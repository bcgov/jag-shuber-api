package ca.bc.gov.jag.shuber.rest.dto.post;

import com.fasterxml.jackson.annotation.JsonProperty;

/**
 * This class is used to POST to the end point.
 * 
 * @author michael.gabelmann
 */
public class DutyResource {
	public String assignment;
	public String dutyRecurrence;
	
	@JsonProperty("startDateTime")
	public String startDtm;
	
	@JsonProperty("endDateTime")
	public String endDtm;
	
	public String sheriffsRequired;

	
	public DutyResource(String assignment, String dutyRecurrence, String startDtm, String endDtm, String sheriffsRequired) {
		this.assignment = assignment;
		this.dutyRecurrence = dutyRecurrence;
		this.startDtm = startDtm;
		this.endDtm = endDtm;
		this.sheriffsRequired = sheriffsRequired;
	}
	
}
