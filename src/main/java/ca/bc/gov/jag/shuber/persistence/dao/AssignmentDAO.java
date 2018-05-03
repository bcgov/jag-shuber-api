package ca.bc.gov.jag.shuber.persistence.dao;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import ca.bc.gov.jag.shuber.persistence.model.Assignment;

/**
 * AssignmentDAO generated by Hibernate Tools hbm2dao.
 *
 * <p>Domain data access object for database table assignment.
 *
 * @author hbm2dao
 * @version 391
 * @see ca.bc.gov.jag.shuber.persistence.model.Assignment
 */
//@Repository
@RepositoryRestResource
public interface AssignmentDAO extends JpaRepository<Assignment, UUID> {
    // NOTE: add custom methods here
	
	/**
	 * Find all active assignments for a courthouse and date range.
	 * <pre>
	 * A.end >= B.start AND A.start <= B.end
	 * </pre>
	 * @param courthouseId 
	 * @param startDate 
	 * @param endDate 
	 * 
	 * @see https://stackoverflow.com/questions/325933/determine-whether-two-date-ranges-overlap
	 * @return 
	 */
	@Query("SELECT a FROM Assignment a WHERE a.courthouse.courthouseId = :courthouseId AND :endDate >= a.effectiveDate AND (a.expiryDate IS NULL OR :startDate <= a.expiryDate)")
	List<Assignment> findByCourthouseId(
		@Param("courthouseId") UUID courthouseId,
		@Param("startDate") LocalDate startDate,
		@Param("endDate") LocalDate endDate);

	
	//NOTE: to hide delete you must export both!
//	@RestResource(exported = false)
//	void deleteById(UUID id);
//
//	@RestResource(exported = false)
//	void delete(Assignment entity);
	
}
