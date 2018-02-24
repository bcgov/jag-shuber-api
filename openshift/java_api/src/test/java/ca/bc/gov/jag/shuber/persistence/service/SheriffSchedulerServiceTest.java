package ca.bc.gov.jag.shuber.persistence.service;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Bean;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Order;
import org.springframework.test.context.junit4.SpringRunner;

import ca.bc.gov.jag.shuber.persistence.dao.SheriffDAO;
import ca.bc.gov.jag.shuber.persistence.model.Sheriff;

/**
 * <p>To test our service layer we mock the persistence layer, since we don't
 * care how it works.</p>
 * 
 * @author michael.gabelmann
 */
@RunWith(SpringRunner.class)
public class SheriffSchedulerServiceTest {
	@TestConfiguration
	static class SheriffSchedulerServiceConfig {
		
		@Bean
		public SheriffSchedulerService getSheriffSchedulerService() {
			return new JpaSheriffSchedulerService();
		}
	}
	
	@Autowired
	private SheriffSchedulerService sheriffSchedulerService;
	
	@MockBean
	private SheriffDAO sheriffDao;
	
	//Data fields
	private List<Sheriff> records;
	private List<Sheriff> sorted;
	private Sheriff s1;
	private Sheriff s2;
	private Date now;
	
	
	@Before
	public void setUp() {
		now = new Date();
		records = new ArrayList<>();
		sorted = new ArrayList<>();
		
		s1 = new Sheriff(UUID.randomUUID(),"badgeNo1", "createdBy", "updatedBy", now, now, 0);
		s1.setName("lastName1, firstName1");
		
		s2 = new Sheriff(UUID.randomUUID(),"badgeNo2", "createdBy", "updatedBy", now, now, 0);
		s2.setName("lastName2, firstName2");
		
		records.add(s2);
		records.add(s1);	
		
		Mockito.when(sheriffDao.findByBadgeNo("badgeNo2")).thenReturn(s2);
		Mockito.when(sheriffDao.findAll()).thenReturn(records);
		Mockito.when(sheriffDao.findById(s1.getSheriffId())).thenReturn(Optional.of(s1));
		
		//not ideal, but lambdas blow up
		sorted.add(s1); 
		sorted.add(s2);
		
		//NOTE: both these blow up with a NPE. why?
		//sorted.sort(Comparator.comparing(Sheriff::getName));
		//Collections.sort(sorted, (a, b) -> a.getName().compareTo(b.getName()));
		
		Mockito.when(sheriffDao.findAll(Sort.by(Order.asc("name")))).thenReturn(sorted).thenReturn(records);
	}
	

//TODO: implement these
//	Sheriff createSheriff(Sheriff sheriff);
//	void deleteSheriff(Sheriff sheriff);
	
	
	@Test
	public void test1_getSheriffs() {
		List<Sheriff> s = sheriffSchedulerService.getSheriffs();
		
		Assert.assertNotNull(s);
		Assert.assertTrue(s.size() == 2);
	}
	
	@Test
	public void test1_getSheriffsSortedByName() {
		List<Sheriff> results = sheriffSchedulerService.getSheriffsSortedByName();
		
		Assert.assertNotNull(results);
		Assert.assertTrue(results.size() == 2);
		Assert.assertEquals("lastName1, firstName1", results.get(0).getName());
		Assert.assertEquals("lastName2, firstName2", results.get(1).getName());
	}
	
	@Test
	public void test1_getSheriffById() {
		UUID id = s1.getSheriffId();
		Optional<Sheriff> result = sheriffSchedulerService.getSheriffById(id);
		Assert.assertTrue(result.isPresent());
	}
	
	@Test
	public void test2_getSheriffById() {
		UUID id = UUID.randomUUID();
		Optional<Sheriff> result = sheriffSchedulerService.getSheriffById(id);
		Assert.assertFalse(result.isPresent());
	}
	
	@Test
	public void test1_getSheriffByBadgeNo() {
		String badgeNo = "badgeNo2";
		Sheriff s = sheriffSchedulerService.getSheriffByBadgeNo(badgeNo);
		Assert.assertEquals(s2, s);
	}
	
	@Test
	public void test2_getSheriffByBadgeNo() {
		String badgeNo = "doesnotexist";
		Sheriff s = sheriffSchedulerService.getSheriffByBadgeNo(badgeNo);
		Assert.assertNull(s);
	}
	
	//TODO: createSheriff
	//TODO: deleteSheriff
	
}