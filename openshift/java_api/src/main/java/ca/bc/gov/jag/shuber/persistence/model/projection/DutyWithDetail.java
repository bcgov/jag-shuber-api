package ca.bc.gov.jag.shuber.persistence.model.projection;

import java.util.Date;
import java.util.UUID;

import org.springframework.data.rest.core.config.Projection;

import ca.bc.gov.jag.shuber.persistence.model.Duty;
import ca.bc.gov.jag.shuber.persistence.model.Shift;
import ca.bc.gov.jag.shuber.persistence.model.WorkSectionCode;

/**
 * 
 * @author michael.gabelmann
 */
@Projection(name = "dutyWithDetail", types = { Duty.class })
public interface DutyWithDetail {
	
	UUID getDutyId();
	
	//AssignmentStream getAssignmentStream();
	
	//DutyTemplate getDutyTemplate();
	
	Shift getShift();
	
	WorkSectionCode getWorksectionCode();
	
	Date getStartTime();
	
	Date getEndTime();
	
}
