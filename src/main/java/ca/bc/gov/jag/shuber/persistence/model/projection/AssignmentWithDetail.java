package ca.bc.gov.jag.shuber.persistence.model.projection;

import java.util.List;
import java.util.UUID;

import org.springframework.data.rest.core.config.Projection;

import ca.bc.gov.jag.shuber.persistence.model.Assignment;
import ca.bc.gov.jag.shuber.persistence.model.Courthouse;
import ca.bc.gov.jag.shuber.persistence.model.Courtroom;
import ca.bc.gov.jag.shuber.persistence.model.DutyRecurrence;
import ca.bc.gov.jag.shuber.persistence.model.JailRoleCode;
import ca.bc.gov.jag.shuber.persistence.model.OtherAssignCode;
import ca.bc.gov.jag.shuber.persistence.model.Run;
import ca.bc.gov.jag.shuber.persistence.model.WorkSectionCode;

/**
 * 
 * @author michael.gabelmann
 */
@Projection(name = "assignmentWithDetail", types = { Assignment.class })
public interface AssignmentWithDetail {
    
	UUID getAssignmentId();
	
	Courthouse getCourthouse();
	
	Courtroom getCourtroom();
	
	JailRoleCode getJailRoleCode();
	
	OtherAssignCode getOtherAssignCode();
	
	Run getRun();
	
	WorkSectionCode getWorkSectionCode();
	
	String getTitle();
	
	List<DutyRecurrence> getDutyRecurrences();
    
}
