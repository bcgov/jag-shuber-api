package ca.bc.gov.jag.shuber.persistence.model.projection;

import java.util.UUID;

import org.springframework.data.rest.core.config.Projection;

import ca.bc.gov.jag.shuber.persistence.model.Courthouse;
import ca.bc.gov.jag.shuber.persistence.model.Courtroom;
import ca.bc.gov.jag.shuber.persistence.model.Location;

/**
 * 
 * @author michael.gabelmann
 */
@Projection(name = "courtroomWithDetail", types = { Courtroom.class })
public interface CourtroomWithDetail {
	
	UUID getLocationId();
	
	Courthouse getCourthouse();
	
	Location getLocation();
	
	String getRoomNumber();
	
}
