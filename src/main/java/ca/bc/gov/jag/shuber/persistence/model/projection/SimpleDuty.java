package ca.bc.gov.jag.shuber.persistence.model.projection;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.rest.core.config.Projection;

import com.fasterxml.jackson.annotation.JsonProperty;

import ca.bc.gov.jag.shuber.persistence.RestPath;
import ca.bc.gov.jag.shuber.persistence.model.Duty;

/**
 * 
 * @author michael.gabelmann
 */
@Projection(name = "simpleDuty", types = { Duty.class })
public interface SimpleDuty extends RestPath {
	
	@Value("#{target.assignment != null ? target.assignment.idPath : ''}")
	String getAssignmentIdPath();
	
	@Value("#{target.dutyRecurrence != null ? target.dutyRecurrence.idPath : ''}")
	String getDutyRecurrenceIdPath();
	
	@JsonProperty("startDateTime")
	LocalDateTime getStartDtm();

	@JsonProperty("endDateTime")
	LocalDateTime getEndDtm();
	
	byte getSheriffsRequired();
	
	List<SimpleSheriffDuty> getSheriffDuties();
	
}
