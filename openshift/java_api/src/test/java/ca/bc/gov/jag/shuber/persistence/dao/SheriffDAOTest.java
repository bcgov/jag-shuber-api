package ca.bc.gov.jag.shuber.persistence.dao;

import java.util.List;
import java.util.UUID;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import ca.bc.gov.jag.shuber.persistence.MockAuditorAware;
import ca.bc.gov.jag.shuber.persistence.model.Courthouse;
import ca.bc.gov.jag.shuber.persistence.model.Location;
import ca.bc.gov.jag.shuber.persistence.model.ModelUtil;
import ca.bc.gov.jag.shuber.persistence.model.Sheriff;

/**
 * 
 * @author michael.gabelmann
 */
public class SheriffDAOTest extends AbstractDAOTest {
	@Autowired
	private SheriffDAO sheriffDAO;

	/** Sheriff record. */
	private Sheriff s;
	
	@BeforeEach
	@Override
	public void beforeTest() {
		s = ModelUtil.getSheriff("M5000", "userId1");
		
		entityManager.persistAndFlush(s);
	}

	@AfterEach
	@Override
	public void afterTest() {
		
	}

	@Test
	public void testFindAll() {
		List<Sheriff> records = sheriffDAO.findAll();
		Assertions.assertTrue(records.size() == 1);
	}

	@Test
	public void testCount() {
		Assertions.assertEquals(1, sheriffDAO.count());
	}
	
	@Test
	public void testDelete() {
		sheriffDAO.delete(s);
		Assertions.assertTrue(sheriffDAO.findAll().size() == 0);
	}

	@Test
	public void testClientCreatedId() {
		UUID id = UUID.randomUUID();
		Sheriff s = ModelUtil.getSheriff("M5001", "userId2");
		s.setSheriffId(id);
		
		sheriffDAO.save(s);
		Assertions.assertTrue(sheriffDAO.count() == 2);
	}
	
	@Test
	public void testMockAuditorAware() {
		Sheriff s = new Sheriff();
		s.setBadgeNo("T32423");
		s.setUserid("userId");
		sheriffDAO.save(s);
		
		Assertions.assertNotNull(s.getSheriffId());
		Assertions.assertNotNull(s.getUserid());
		
		Assertions.assertEquals(MockAuditorAware.USER, s.getCreatedBy());
		Assertions.assertEquals(MockAuditorAware.USER, s.getUpdatedBy());
		Assertions.assertNotNull(s.getCreatedDtm());
		Assertions.assertNotNull(s.getUpdatedDtm());
		Assertions.assertEquals(0, s.getRevisionCount());
	}
	
	@Test
	public void getSheriffsByCourthouseId() {
		Location location = ModelUtil.getLocation("Victoria");
		Courthouse courthouse = ModelUtil.getCourthouse(location, "COURTHOUSE", UUID.randomUUID());
		
		entityManager.persistAndFlush(location);
		entityManager.persistAndFlush(courthouse);
		
		s.setCourthouse(courthouse);
		entityManager.persistAndFlush(s);
		
		List<Sheriff> records = sheriffDAO.getSheriffs(courthouse.getLocationId());
		
		Assertions.assertNotNull(records);
		Assertions.assertTrue(records.size() == 1);
	}
	
}
