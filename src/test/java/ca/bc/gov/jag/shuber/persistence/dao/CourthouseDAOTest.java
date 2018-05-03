package ca.bc.gov.jag.shuber.persistence.dao;

import java.util.Optional;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import ca.bc.gov.jag.shuber.persistence.model.Courthouse;
import ca.bc.gov.jag.shuber.persistence.model.ModelUtil;
import ca.bc.gov.jag.shuber.persistence.model.Region;

/**
 * 
 * @author michael.gabelmann
 */
public class CourthouseDAOTest extends AbstractDAOTest {
	@Autowired
	private CourthouseDAO courthouseDao;
	
	@BeforeEach
	@Override
	protected void beforeTest() {
		Region r = ModelUtil.getRegion("MYREGION", "My Region");
		Courthouse c = ModelUtil.getCourthouse(r, "12345", "My personal courthouse");
		
		entityManager.persist(r);
		entityManager.persistAndFlush(c);
	}

	@AfterEach
	@Override
	protected void afterTest() {
		
	}

	@Test
	@DisplayName("Find a courthouse by its business key that does not exist")
	public void test1_findByCourthouseCd() {
		Optional<Courthouse> c = courthouseDao.findByCourthouseCd("XXX");
		Assertions.assertFalse(c.isPresent());
	}
	
	@Test
	@DisplayName("Find a courthouse by its business key")
	public void test2_findByCourthouseCd() {
		Optional<Courthouse> c = courthouseDao.findByCourthouseCd("12345");
		Assertions.assertTrue(c.isPresent());
	}
	
}
