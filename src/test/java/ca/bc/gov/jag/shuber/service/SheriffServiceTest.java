package ca.bc.gov.jag.shuber.service;

import java.util.List;
import java.util.UUID;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.platform.runner.JUnitPlatform;
import org.junit.runner.RunWith;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import ca.bc.gov.jag.shuber.AbstractTest;
import ca.bc.gov.jag.shuber.persistence.dao.SheriffDAO;
import ca.bc.gov.jag.shuber.persistence.model.Sheriff;

/**
 * <p>To test our service layer we mock the persistence layer, since we don't
 * care how it works.</p>
 * 
 * @author michael.gabelmann
 */
@RunWith(JUnitPlatform.class)
@ExtendWith(SpringExtension.class)
public class SheriffServiceTest extends AbstractTest {
	private SheriffDAO sheriffDao;
	private SheriffService sheriffService;
	
	//Data fields
	private List<Sheriff> records;
	//private List<Sheriff> sorted;
	private Sheriff s1;
	private Sheriff s2;
	private UUID courthouseId1;
	private UUID courthouseId2;
	
	@BeforeEach
	@Override
	protected void beforeTest() {
//		records = new ArrayList<>();
//		
//		s1 = new Sheriff(UUID.randomUUID(),"badgeNo1", "userId1", "createdBy", "updatedBy", now, now, 0);
//		s1.setLastName("lastName1");
//		s1.setFirstName("firstName1");
//		
//		s2 = new Sheriff(UUID.randomUUID(),"badgeNo2", "userId2", "createdBy", "updatedBy", now, now, 0);
//		s2.setLastName("lastName2");
//		s2.setFirstName("firstName2");
//		
//		records.add(s2);
//		records.add(s1);
//		
//		courthouseId1 = UUID.randomUUID();
//		courthouseId2 = UUID.randomUUID();
//		
//		//sorted = new ArrayList<>();
//		//not ideal, but lambdas blow up
//		//sorted.add(s1); 
//		//sorted.add(s2);
//		
//		//NOTE: both these blow up with a NPE. why?
//		//sorted.sort(Comparator.comparing(Sheriff::getName));
//		//Collections.sort(sorted, (a, b) -> a.getName().compareTo(b.getName()));
//		
//		sheriffDao = Mockito.mock(SheriffDAO.class);
//		sheriffService = new JpaSheriffService(sheriffDao);
//		
//		Mockito.when(sheriffDao.findByBadgeNo("badgeNo2")).thenReturn(s2);
//		Mockito.when(sheriffDao.getSheriffsByCourthouse(courthouseId1)).thenReturn(records);
//		Mockito.when(sheriffDao.getSheriffsByCourthouse(courthouseId2)).thenReturn(new ArrayList<Sheriff>());
	}
	
	@AfterEach
	@Override
	protected void afterTest() {
		
	}
	
	@Test
	@DisplayName("Search for sheriff by badge number that exists")
	public void test1_getSheriffByBadgeNo() {
		Assertions.fail("TODO");
		
//		String badgeNo = "badgeNo2";
//		Optional<Sheriff> s = sheriffService.getSheriffByBadgeNo(badgeNo);
//		Assertions.assertEquals(s2, s.get());
	}
	
	@Test
	@DisplayName("Search for sheriff by badge number that does not exist")
	public void test2_getSheriffByBadgeNo() {
		Assertions.fail("TODO");
		
//		String badgeNo = "doesnotexist";
//		Optional<Sheriff> s = sheriffService.getSheriffByBadgeNo(badgeNo);
//		Assertions.assertFalse(s.isPresent());
	}
	
	@Test
	@DisplayName("Search for sheriff by courthouse that exists")
	public void test1_getSheriffsByCourthouse() {
		Assertions.fail("TODO");
		
//		List<Sheriff> records = sheriffService.getSheriffsByCourthouse(courthouseId1);
//		Assertions.assertNotNull(records);
//		Assertions.assertTrue(records.size() == 2);
	}
	
	@Test
	@DisplayName("Search for sheriff by courhouse that does not exist")
	public void test2_getSheriffsByCourthouse() {
		Assertions.fail("TODO");
		
//		List<Sheriff> records = sheriffService.getSheriffsByCourthouse(courthouseId2);
//		Assertions.assertNotNull(records);
//		Assertions.assertTrue(records.size() == 0);
	}
	
}
