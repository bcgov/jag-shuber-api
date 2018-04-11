package ca.bc.gov.jag.shuber.persistence.model.projection;

import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.rest.core.config.Projection;

import ca.bc.gov.jag.shuber.persistence.RestPath;
import ca.bc.gov.jag.shuber.persistence.model.Assignment;
import ca.bc.gov.jag.shuber.persistence.model.DutyRecurrence;

/**
 * Create a simple view of the assignment and child records.
 * 
 * @author michael.gabelmann
 */
@Projection(name = "simpleAssignment", types = { Assignment.class })
public interface SimpleAssignment extends RestPath {
	
	String getTitle();
	
	@Value("#{'/workSectionCodes/' + target.workSectionCode.workSectionCode}")
	String getWorkSectionCodePath();
	
	@Value("#{target.jailRoleCode != null ? '/jailRoleCodes/' + target.jailRoleCode.jailRoleCode : ''}")
	String getJailRoleIdPath();

	@Value("#{target.otherAssignCode != null ? '/otherAssignCodes/' + target.otherAssignCode.otherAssignCode : ''}")
	String getOtherAssignCodePath();
	
	@Value("#{target.run != null ? '/runs/' + target.run.runId : ''}")
	String getRunIdPath();
	
	@Value("#{target.courthouse != null ? '/courthouses/' + target.courthouse.courthouseId : ''}")
	String getCourthouseIdPath();
	
	@Value("#{target.courtroom != null ? '/courtrooms/' + target.courtroom.courtroomId : ''}")
	String getCourtroomIdPath();

	List<DutyRecurrence> getDutyRecurrences();
	
}
