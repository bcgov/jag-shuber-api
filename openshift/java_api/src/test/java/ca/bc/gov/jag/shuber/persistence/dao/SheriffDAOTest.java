package ca.bc.gov.jag.shuber.persistence.dao;

import java.util.List;
import java.util.UUID;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import ca.bc.gov.jag.shuber.persistence.MockAuditorAware;
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
		s = new Sheriff(null, "M12345", "test", "test", now, now, 0);
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
		
		Sheriff s = new Sheriff(id, "M44532", "test", "test", now, now, 0);
		sheriffDAO.save(s);
		Assertions.assertTrue(sheriffDAO.count() == 2);
	}
	
	@Test
	public void testMockAuditorAware() {
		Sheriff s = new Sheriff();
		s.setBadgeNo("T32423");
		sheriffDAO.save(s);
		
		Assertions.assertNotNull(s.getSheriffId());
		Assertions.assertEquals(MockAuditorAware.USER, s.getCreatedBy());
		Assertions.assertEquals(MockAuditorAware.USER, s.getUpdatedBy());
		Assertions.assertNotNull(s.getCreatedDtm());
		Assertions.assertNotNull(s.getUpdatedDtm());
		Assertions.assertEquals(0, s.getRevisionCount());
	}
	
}
