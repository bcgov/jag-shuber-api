package ca.bc.gov.jag.shuber.rest.dto.post;

/**
 * This class is used to POST to the end point.
 * 
 * @author michael.gabelmann
 */
public class AssignmentResource {
	public String courthouse;
	public String courtroom;
	public String jailRoleCode;
	public String otherAssignCode;
	public String run;
	public String workSectionCode;
	public String title;
	public String effectiveDate;
	public String expiryDate;
	
	public AssignmentResource(String courthouse, String courtroom, String jailRoleCode, String otherAssignCode,
			String run, String workSectionCode, String title, String effectiveDate, String expiryDate) {
		this.courthouse = courthouse;
		this.courtroom = courtroom;
		this.jailRoleCode = jailRoleCode;
		this.otherAssignCode = otherAssignCode;
		this.run = run;
		this.workSectionCode = workSectionCode;
		this.title = title;
		this.effectiveDate = effectiveDate;
		this.expiryDate = expiryDate;
	}
	
}
