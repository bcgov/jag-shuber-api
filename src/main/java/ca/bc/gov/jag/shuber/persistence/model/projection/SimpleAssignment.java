package ca.bc.gov.jag.shuber.persistence.model.projection;

import java.time.LocalDate;
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
	
	LocalDate getEffectiveDate();
	
	LocalDate getExpiryDate();
	
	@Value("#{target.workSectionCode != null ? target.workSectionCode.idPath : ''}")
	String getWorkSectionCodePath();
	
	@Value("#{target.jailRoleCode != null ? target.jailRoleCode.idPath : ''}")
	String getJailRoleCodePath();

	@Value("#{target.otherAssignCode != null ? target.otherAssignCode.idPath : ''}")
	String getOtherAssignCodePath();
	
	@Value("#{target.run != null ? target.run.idPath : ''}")
	String getRunIdPath();
	
	@Value("#{target.courthouse != null ? target.courthouse.idPath : ''}")
	String getCourthouseIdPath();
	
	@Value("#{target.courtroom != null ? target.courtroom.idPath : ''}")
	String getCourtroomIdPath();
	
	List<DutyRecurrence> getDutyRecurrences();
	
}
