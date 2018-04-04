package ca.bc.gov.jag.shuber.persistence.model.projection;

import java.util.Date;
import java.util.List;

import org.springframework.data.rest.core.config.Projection;

import ca.bc.gov.jag.shuber.persistence.RestPath;
import ca.bc.gov.jag.shuber.persistence.model.Assignment;
import ca.bc.gov.jag.shuber.persistence.model.Duty;
import ca.bc.gov.jag.shuber.persistence.model.SheriffDuty;

/**
 * 
 * @author michael.gabelmann
 */
@Projection(name = "dutyWithDetail", types = { Duty.class })
public interface DutyWithDetail extends RestPath {
	
	//UUID getDutyId();
	
	Assignment getAssignment();
	
	Date getStartDtm();
	
	Date getEndDtm();
	
	byte getSheriffsRequired();
	
	List<SheriffDuty> getSheriffDuties();
	
}
