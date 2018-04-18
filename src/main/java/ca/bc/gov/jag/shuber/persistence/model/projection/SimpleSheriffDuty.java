package ca.bc.gov.jag.shuber.persistence.model.projection;

import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.rest.core.config.Projection;

import com.fasterxml.jackson.annotation.JsonProperty;

import ca.bc.gov.jag.shuber.persistence.RestPath;
import ca.bc.gov.jag.shuber.persistence.model.SheriffDuty;

/**
 * 
 * @author michael.gabelmann
 */
@Projection(name = "simpleSheriffDuty", types = { SheriffDuty.class })
public interface SimpleSheriffDuty extends RestPath {

	@Value("#{target.duty != null ? target.duty.idPath : ''}")
	String getDutyIdPath();
	
	@Value("#{target.sheriff != null ? target.sheriff.idPath : ''}")
	String getSheriffIdPath();
	
	@JsonProperty("startDateTime")
	LocalDateTime getStartDtm();
	
	@JsonProperty("endDateTime")
	LocalDateTime getEndDtm();
	
}
