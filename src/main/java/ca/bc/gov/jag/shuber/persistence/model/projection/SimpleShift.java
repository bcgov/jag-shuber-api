package ca.bc.gov.jag.shuber.persistence.model.projection;

import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.rest.core.config.Projection;

import com.fasterxml.jackson.annotation.JsonProperty;

import ca.bc.gov.jag.shuber.persistence.RestPath;
import ca.bc.gov.jag.shuber.persistence.model.Shift;

/**
 * 
 * @author michael.gabelmann
 */
@Projection(name = "simpleShift", types = { Shift.class })
public interface SimpleShift extends RestPath {
	
	@Value("#{target.courthouse != null ? target.courthouse.idPath : ''}")
	String getCourthouseIdPath();
	
	@Value("#{target.sheriff != null ? target.sheriff.idPath : ''}")
	String getSheriffIdPath();
	
	@Value("#{target.workSectionCode != null ? target.workSectionCode.idPath : ''}")
	String getWorkSectionCodePath();
	
	@JsonProperty("startDateTime")
	LocalDateTime getStartDtm();

	@JsonProperty("endDateTime")
	LocalDateTime getEndDtm();
	
}
