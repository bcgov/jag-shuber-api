package ca.bc.gov.jag.shuber.persistence.model.projection;

import java.util.UUID;

import org.springframework.data.rest.core.config.Projection;

import ca.bc.gov.jag.shuber.persistence.model.Location;
import ca.bc.gov.jag.shuber.persistence.model.Region;

/**
 * 
 * @author michael.gabelmann
 */
@Projection(name = "regionWithDetail", types = { Region.class })
public interface RegionWithDetail {
	
	UUID getLocationId();
	
	Location getLocation();
	
	UUID getGeometry();
	
}
