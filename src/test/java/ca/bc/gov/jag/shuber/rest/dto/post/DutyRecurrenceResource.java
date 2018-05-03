package ca.bc.gov.jag.shuber.rest.dto.post;

/**
 * This class is used to POST to the end point.
 * 
 * @author michael.gabelmann
 */
public class DutyRecurrenceResource {
	public String assignment;
	public String startTime;
	public String endTime;
	public String daysBitmap;
	public String sheriffsRequired;
	public String effectiveDate;
	public String expiryDate;
	
	public DutyRecurrenceResource(String assignment, String startTime, String endTime, String daysBitmap,
			String sheriffsRequired, String effectiveDate, String expiryDate) {
		
		this.assignment = assignment;
		this.startTime = startTime;
		this.endTime = endTime;
		this.daysBitmap = daysBitmap;
		this.sheriffsRequired = sheriffsRequired;
		this.effectiveDate = effectiveDate;
		this.expiryDate = expiryDate;
	}

}
