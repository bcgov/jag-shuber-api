package ca.bc.gov.jag.shuber.persistence.model.projection;

import java.util.UUID;

import org.springframework.data.rest.core.config.Projection;

import ca.bc.gov.jag.shuber.persistence.model.Courthouse;
import ca.bc.gov.jag.shuber.persistence.model.Location;

/**
 * 
 * @author michael.gabelmann
 */
@Projection(name = "courthouseWithDetail", types = { Courthouse.class })
public interface CourthouseWithDetail {
	
	UUID getLocationId();
	
	Location getLocation();
	
	//Region getRegion();
	
	String getCourthouseTypeCode();
	
	UUID getOrgUnitId();
	
	UUID getGeometry();

}
