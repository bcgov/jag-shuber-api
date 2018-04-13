package ca.bc.gov.jag.shuber.persistence.model.projection;

import java.time.LocalDate;
import java.time.LocalTime;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.rest.core.config.Projection;

import ca.bc.gov.jag.shuber.persistence.RestPath;
import ca.bc.gov.jag.shuber.persistence.model.DutyRecurrence;

/**
 * Create a simple view of the duty recurrence.
 * 
 * @author michael.gabelmann
 */
@Projection(name = "simpleDutyRecurrence", types = { DutyRecurrence.class })
public interface SimpleDutyRecurrence extends RestPath {
	
	@Value("#{target.assignment != null ? target.assignment.idPath : ''}")
	String getAssignmentIdPath();
	
	LocalTime getStartTime();
	
	LocalTime getEndTime();
	
	long getDaysBitmap();
	
	byte getSheriffsRequired();
	
	LocalDate getEffectiveDate();
	
	LocalDate getExpiryDate();
	
}
