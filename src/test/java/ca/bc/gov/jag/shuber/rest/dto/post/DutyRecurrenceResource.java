package ca.bc.gov.jag.shuber.rest.dto.post;

public class DutyRecurrenceResource {
	public String assignment;
	public String startTime;
	public String endTime;
	public String daysBitmap;
	public String sheriffsRequired;
	
	public DutyRecurrenceResource(String assignment, String startTime, String endTime, String daysBitmap, String sheriffsRequired) {
		this.assignment = assignment;
		this.startTime = startTime;
		this.endTime = endTime;
		this.daysBitmap = daysBitmap;
		this.sheriffsRequired = sheriffsRequired;
	}
	
}
