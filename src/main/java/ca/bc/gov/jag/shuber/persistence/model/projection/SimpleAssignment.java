package ca.bc.gov.jag.shuber.persistence.model.projection;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.rest.core.config.Projection;

import ca.bc.gov.jag.shuber.persistence.RestPath;
import ca.bc.gov.jag.shuber.persistence.model.Assignment;

/**
 * Create a simple view of the assignment and child records.
 * 
 * @author michael.gabelmann
 */
@Projection(name = "simpleAssignment", types = { Assignment.class })
public interface SimpleAssignment extends RestPath {
	
	String getTitle();
	
	@Value("#{'/workSectionCodes/' + target.workSectionCode.workSectionCode}")
	String getWorkSectionCode();
	
	@Value("#{target.jailRoleCode != null ? '/jailRoleCodes/' + target.jailRoleCode.jailRoleCode : ''}")
	String getJailRoleId();

	@Value("#{target.otherAssignCode != null ? '/otherAssignCodes/' + target.otherAssignCode.otherAssignCode : ''}")
	String getOtherAssignCode();
	
	@Value("#{target.run != null ? '/runs/' + target.run.runId : ''}")
	String getRunId();
	
	@Value("#{target.courthouse != null ? '/courthouses/' + target.courthouse.courthouseId : ''}")
	String getCourthouseId();
	
	@Value("#{target.courtroom != null ? '/courtrooms/' + target.courtroom.courtroomId : ''}")
	String getCourtroomId();

}
