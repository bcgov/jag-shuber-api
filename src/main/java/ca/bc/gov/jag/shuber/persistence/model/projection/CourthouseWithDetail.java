package ca.bc.gov.jag.shuber.persistence.model.projection;

import java.util.List;
import java.util.UUID;

import org.springframework.data.rest.core.config.Projection;

import ca.bc.gov.jag.shuber.persistence.model.Address;
import ca.bc.gov.jag.shuber.persistence.model.Assignment;
import ca.bc.gov.jag.shuber.persistence.model.Courthouse;
import ca.bc.gov.jag.shuber.persistence.model.Courtroom;
import ca.bc.gov.jag.shuber.persistence.model.Region;
import ca.bc.gov.jag.shuber.persistence.model.Sheriff;

/**
 * 
 * @author michael.gabelmann
 */
@Projection(name = "courthouseWithDetail", types = { Courthouse.class })
public interface CourthouseWithDetail {
	
	UUID getCourthouseId();
	
	Address getAddress();
	
	Region getRegion();
	
	String getCourthouseCd();
	
	String getCourthouseName();
	
	UUID getLocation();
	
	UUID getParentCourthouseId();
	
	List<Assignment> getAssignments();
	
	List<Sheriff> getSheriffs();
	
	List<Courtroom> getCourtrooms();

}
