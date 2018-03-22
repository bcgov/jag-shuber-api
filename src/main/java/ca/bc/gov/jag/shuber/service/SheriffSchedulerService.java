package ca.bc.gov.jag.shuber.service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import ca.bc.gov.jag.shuber.persistence.model.Sheriff;

/**
 * 
 * @author michael.gabelmann
 */
public interface SheriffSchedulerService {

	/**
	 * Get all sheriffs.
	 * @return records
	 */
	List<Sheriff> getSheriffs();

	/**
	 * Get all sheriffs sorted by name.
	 * @return records
	 */
	List<Sheriff> getSheriffsSortedByName();

	/**
	 * Get sheriff by id.
	 * @param id unique id
	 * @return value
	 */
	Optional<Sheriff> getSheriffById(UUID id);

	/**
	 * Get sheriff by badge number.
	 * @param badgeNo badge number
	 * @return value
	 */
	Optional<Sheriff> getSheriffByBadgeNo(String badgeNo);

	/**
	 * Create a sheriff record
	 * @param sheriff record to create
	 * @return record
	 */
	Sheriff createSheriff(Sheriff sheriff);

	/**
	 * Delete a sheriff.
	 * @param sheriff record to delete
	 */
	void deleteSheriff(Sheriff sheriff);

}