package ca.bc.gov.jag.shuber.persistence.dao;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import ca.bc.gov.jag.shuber.persistence.model.Region;

/**
 * RegionDAO generated by Hibernate Tools hbm2dao.
 *
 * <p>Domain data access object for database table region.
 *
 * @author hbm2dao
 * @version 391
 * @see ca.bc.gov.jag.shuber.persistence.model.Region
 */
//@Repository
@RepositoryRestResource
public interface RegionDAO extends JpaRepository<Region, UUID> {
    // NOTE: add custom methods here

	/**
	 * Find by region code.
	 * @param regionCd region code
	 * @return record
	 */
	Optional<Region> findByRegionCd(@Param("regionCd") String regionCd);
	
}
