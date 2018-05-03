package ca.bc.gov.jag.shuber.persistence.model.projection;

import java.util.List;
import java.util.UUID;

import org.springframework.data.rest.core.config.Projection;

import ca.bc.gov.jag.shuber.persistence.RestPath;
import ca.bc.gov.jag.shuber.persistence.model.Courthouse;
import ca.bc.gov.jag.shuber.persistence.model.Region;

/**
 * 
 * @author michael.gabelmann
 */
@Projection(name = "regionWithDetail", types = { Region.class })
public interface RegionWithDetail extends RestPath {
	
	//UUID getRegionId();
	
	String getRegionCd();
	
	String getRegionName();
	
	UUID getLocation();
	
	List<Courthouse> getCourthouses();
	
}
