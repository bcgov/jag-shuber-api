package ca.bc.gov.jag.shuber.service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import ca.bc.gov.jag.shuber.persistence.model.Sheriff;

/**
 * 
 * @author michael.gabelmann
 */
public interface SheriffService {

	/**
	 * Get sheriff by badge number.
	 * @param badgeNo badge number
	 * @return value
	 */
	Optional<Sheriff> getSheriffByBadgeNo(String badgeNo);
	
	/**
	 * Get Sheriffs by their courthouse.
	 * @param locationId courthouse id
	 * @return records
	 */
	List<Sheriff> getSheriffsByCourthouse(UUID locationId);
	
}