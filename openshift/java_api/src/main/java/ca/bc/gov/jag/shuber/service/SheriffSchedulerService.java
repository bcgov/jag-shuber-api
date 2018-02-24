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
	 * 
	 * @return
	 */
	List<Sheriff> getSheriffs();

	/**
	 * 
	 * @return
	 */
	List<Sheriff> getSheriffsSortedByName();

	/**
	 * 
	 * @param id
	 * @return
	 */
	Optional<Sheriff> getSheriffById(UUID id);

	/**
	 * 
	 * @param badgeNo
	 * @return
	 */
	Sheriff getSheriffByBadgeNo(String badgeNo);

	/**
	 * 
	 * @param sheriff
	 * @return
	 */
	Sheriff createSheriff(Sheriff sheriff);

	/**
	 * 
	 * @param sheriff
	 */
	void deleteSheriff(Sheriff sheriff);

}