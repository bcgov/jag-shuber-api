package ca.bc.gov.jag.shuber.persistence.dao;

import java.util.Optional;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import ca.bc.gov.jag.shuber.persistence.model.ModelUtil;
import ca.bc.gov.jag.shuber.persistence.model.Region;

/**
 * 
 * @author michael.gabelmann
 */
public class RegionDAOTest extends AbstractDAOTest {
	@Autowired
	private RegionDAO regionDao;
	
	@BeforeEach
	@Override
	protected void beforeTest() {
		Region r = ModelUtil.getRegion("REGION", "Test Region");
		entityManager.persistAndFlush(r);
	}

	@AfterEach
	@Override
	protected void afterTest() {
		
	}
	
	@Test
	@DisplayName("Create a new region")
	public void test1_create() {
		Region r = ModelUtil.getRegion("BC", "British Columbia");
		
		regionDao.save(r);
		Assertions.assertNotNull(r.getRegionId());
	}
	
	@Test
	@DisplayName("Find a region")
	public void test1_findByRegion() {
		Optional<Region> src = regionDao.findByRegionCd("REGION");
		Assertions.assertTrue(src.isPresent());
	}
}
