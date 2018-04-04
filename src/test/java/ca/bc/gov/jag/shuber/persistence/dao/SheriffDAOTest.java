package ca.bc.gov.jag.shuber.persistence.dao;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import ca.bc.gov.jag.shuber.persistence.MockAuditorAware;
import ca.bc.gov.jag.shuber.persistence.model.Courthouse;
import ca.bc.gov.jag.shuber.persistence.model.ModelUtil;
import ca.bc.gov.jag.shuber.persistence.model.Region;
import ca.bc.gov.jag.shuber.persistence.model.Sheriff;
import ca.bc.gov.jag.shuber.persistence.model.SheriffRankCode;

/**
 * 
 * @author michael.gabelmann
 */
public class SheriffDAOTest extends AbstractDAOTest {
	@Autowired
	private SheriffDAO sheriffDAO;

	/** Sheriff rank. */
	private SheriffRankCode src;
	
	/** Sheriff record. */
	private Sheriff s;
	
	@BeforeEach
	@Override
	public void beforeTest() {
		src = ModelUtil.getSheriffRankCode("SERGEANT", "Sergeant", LocalDate.now());
		entityManager.persistAndFlush(src);
		
		s = ModelUtil.getSheriff(src, "M5000", "userid1");
		entityManager.persistAndFlush(s);
	}

	@AfterEach
	@Override
	public void afterTest() {
		
	}

	@Test
	@DisplayName("Find all sheriffs")
	public void testFindAll() {
		List<Sheriff> records = sheriffDAO.findAll();
		Assertions.assertTrue(records.size() == 1);
	}

	@Test
	@DisplayName("Get count of all sheriffs")
	public void testCount() {
		Assertions.assertEquals(1, sheriffDAO.count());
	}
	
	@Test
	@DisplayName("Delete a sheriff")
	public void testDelete() {
		sheriffDAO.delete(s);
		Assertions.assertTrue(sheriffDAO.findAll().size() == 0);
	}

	@Test
	@DisplayName("Test that id can be pre-populated for a create")
	public void testClientCreatedId() {
		UUID id = UUID.randomUUID();
		
		Sheriff s = ModelUtil.getSheriff(src, "M5001", "userId2");
		s.setSheriffId(id);
		
		sheriffDAO.save(s);
		Assertions.assertTrue(sheriffDAO.count() == 2);
		Assertions.assertEquals(id, s.getSheriffId());
	}
	
	@Test
	@DisplayName("Ensure that the audit fields are populated on creation")
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
	@DisplayName("Find sheriffs for a given courthose")
	public void test1_getSheriffsByCourthouse() {
		Region r = ModelUtil.getRegion("VANISLAND", "Vancouver Island");
		Courthouse c = ModelUtil.getCourthouse(r, "1201", "Victoria");
		
		entityManager.persist(r);
		entityManager.persist(c);
		entityManager.flush();
		
		s.setCourthouse(c);
		entityManager.persistAndFlush(s);
		
		List<Sheriff> records = sheriffDAO.getSheriffsByCourthouse("1201");
		Assertions.assertNotNull(records);
		Assertions.assertTrue(records.size() == 1);
	}

	@Test
	@DisplayName("Find sheriff by user id")
	public void test1_findByUserid() {
		Sheriff tmp = sheriffDAO.findByUserid("userid1");
		
		Assertions.assertNotNull(tmp);
	}
	
	@Test
	@DisplayName("Find by badge number")
	public void test1_findByBadgeNo() {
		Sheriff tmp = sheriffDAO.findByBadgeNo("M5000");
		
		Assertions.assertNotNull(tmp);
	}
	
}
