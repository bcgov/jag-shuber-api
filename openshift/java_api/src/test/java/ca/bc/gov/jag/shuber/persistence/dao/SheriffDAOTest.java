package ca.bc.gov.jag.shuber.persistence.dao;

import java.util.List;
import java.util.UUID;

import org.junit.Assert;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import ca.bc.gov.jag.shuber.persistence.MockAuditorAware;
import ca.bc.gov.jag.shuber.persistence.model.Sheriff;

/**
 * 
 * @author michael.gabelmann
 */
class SheriffDAOTest extends AbstractDAOTest {
	@Autowired
	private SheriffDAO sheriffDAO;

	/** Sheriff record. */
	private Sheriff s;
	
	
	@Test
	void testFindAll() {
		List<Sheriff> records = sheriffDAO.findAll();
		Assert.assertTrue(records.size() == 1);
	}

	@Test
	void testCount() {
		Assert.assertEquals(1, sheriffDAO.count());
	}
	
	@Test
	void testDelete() {
		sheriffDAO.delete(s);
		Assert.assertTrue(sheriffDAO.findAll().size() == 0);
	}

	@Test
	void testClientCreatedId() {
		UUID id = UUID.randomUUID();
		
		Sheriff s = new Sheriff(id, "M44532", "test", "test", now, now, 0);
		sheriffDAO.save(s);
		Assert.assertTrue(sheriffDAO.count() == 2);
	}
	
	@Test
	void testMockAuditorAware() {
		Sheriff s = new Sheriff();
		s.setBadgeNo("T32423");
		sheriffDAO.save(s);
		
		Assert.assertEquals(MockAuditorAware.USER, s.getCreatedBy());
		Assert.assertEquals(MockAuditorAware.USER, s.getUpdatedBy());
		Assert.assertNotNull(s.getCreatedDtm());
		Assert.assertNotNull(s.getUpdatedDtm());
		Assert.assertEquals(0, s.getRevisionCount());
	}
	
	@BeforeEach
	private void createRecord() {
		s = new Sheriff(null, "M12345", "test", "test", now, now, 0);
		entityManager.persistAndFlush(s);
	}
	
}
