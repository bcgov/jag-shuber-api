package ca.bc.gov.jag.shuber.persistence.dao;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.data.rest.core.annotation.RestResource;

import ca.bc.gov.jag.shuber.persistence.model.DutyRecurrence;

/**
 * DutyRecurrenceDAO generated by Hibernate Tools hbm2dao.
 *
 * <p>Domain data access object for database table duty_recurrence.
 *
 * @author hbm2dao
 * @version 391
 * @see ca.bc.gov.jag.shuber.persistence.model.DutyRecurrence
 */
//@Repository
@RepositoryRestResource
public interface DutyRecurrenceDAO extends JpaRepository<DutyRecurrence, UUID> {
    // NOTE: add custom methods here

	/**
	 * 
	 * @param courthouseId
	 * @param date
	 * @return
	 */
	@Query("SELECT r FROM DutyRecurrence r WHERE r.assignment.courthouse.courthouseId = :courthouseId AND r.effectiveDate <= :date AND (r.expiryDate IS NULL OR r.expiryDate >= :date)")
	List<DutyRecurrence> getDutyRecurrences(
		@Param("courthouseId") UUID courthouseId,
		@Param("date") LocalDate date);

	//NOTE: to hide delete you must export both!
	@RestResource(exported = false)
	void deleteById(UUID id);

	@RestResource(exported = false)
	void delete(DutyRecurrence entity);
	
}
