package ca.bc.gov.jag.shuber.persistence.dao;

import java.time.LocalDateTime;
import java.util.List;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import ca.bc.gov.jag.shuber.persistence.model.Assignment;
import ca.bc.gov.jag.shuber.persistence.model.Courthouse;
import ca.bc.gov.jag.shuber.persistence.model.Courtroom;
import ca.bc.gov.jag.shuber.persistence.model.Duty;
import ca.bc.gov.jag.shuber.persistence.model.ModelUtil;
import ca.bc.gov.jag.shuber.persistence.model.Region;
import ca.bc.gov.jag.shuber.persistence.model.WorkSectionCode;
import ca.bc.gov.jag.shuber.persistence.model.WorkSectionCode.WORK_SECTION_CODE;
import ca.bc.gov.jag.shuber.rest.dto.SimpleDuty;
import ca.bc.gov.jag.shuber.util.DateUtil;

/**
 * 
 * @author michael.gabelmann
 */
public class DutyDAOTest extends AbstractDAOTest {
	@Autowired
	private DutyDAO dutyDao;
	
	private WorkSectionCode wsc1;
	private Region r;
	private Courthouse c;
	private Courtroom cr;
	private Assignment a;
	
	@BeforeEach
	@Override
	protected void beforeTest() {
		wsc1 = ModelUtil.getWorkSectionCode(WORK_SECTION_CODE.COURTS.name(), "Courts", nowDate);
		r = ModelUtil.getRegion("VANISLAND", "Vancourver Island");
		c = ModelUtil.getCourthouse(r, "VIC", "Victoria");
		cr = ModelUtil.getCourtroom(c, "101", "Room 101");
		a = ModelUtil.getAssignment(c, wsc1, "title", nowDate);
		a.setCourtroom(cr);
		
		entityManager.persist(wsc1);
		entityManager.persist(r);
		entityManager.persist(c);
		entityManager.persist(cr);
		entityManager.persist(a);
		entityManager.flush();
	}

	@AfterEach
	@Override
	protected void afterTest() {
		
	}

	@Test
	@DisplayName("Get duties by courthouse and time period (duty within period)")
	public void test1_getDutiesByCourthouse() {
		LocalDateTime start = LocalDateTime.of(2018, 1, 1,  9, 0);
		LocalDateTime end   = LocalDateTime.of(2018, 1, 1, 17, 0);
		
		Duty d = ModelUtil.getDuty(a, start, end, (byte) 1);
		dutyDao.save(d);
		
		LocalDateTime paramStart = LocalDateTime.of(2018, 1, 1,  0,  0,  0);
		LocalDateTime paramEnd   = LocalDateTime.of(2018, 1, 1, 23, 59, 59);
		
		List<Duty> records = dutyDao.getByCourthouseAndDay(c.getCourthouseId(), paramStart, paramEnd);	
		Assertions.assertEquals(1, records.size());
	}
	
	@Test
	@DisplayName("Get duties by courthouse and time period (paramEnd touches duty start)")
	public void test2_getDutiesByCourthouse() {
		LocalDateTime start = LocalDateTime.of(2018, 2, 1,  9, 0);
		LocalDateTime end   = LocalDateTime.of(2018, 2, 1, 17, 0);
		
		Duty d = ModelUtil.getDuty(a, start, end, (byte) 1);
		dutyDao.save(d);
		
		LocalDateTime paramStart = LocalDateTime.of(2018, 1, 31, 12,  0,  0);
		LocalDateTime paramEnd   = LocalDateTime.of(2018, 2,  1,  9,  0,  0);
		
		List<Duty> records = dutyDao.getByCourthouseAndDay(c.getCourthouseId(), paramStart, paramEnd);	
		Assertions.assertEquals(1, records.size());
	}
	
	@Test
	@DisplayName("Get duties by courthouse and time period (param start touches duty end)")
	public void test3_getDutiesByCourthouse() {
		LocalDateTime start = LocalDateTime.of(2018, 2, 1,  9, 0);
		LocalDateTime end   = LocalDateTime.of(2018, 2, 1, 17, 0);
		
		Duty d = ModelUtil.getDuty(a, start, end, (byte) 1);
		dutyDao.save(d);
		
		LocalDateTime paramStart = LocalDateTime.of(2018, 2, 1, 17, 0);
		LocalDateTime paramEnd   = LocalDateTime.of(2018, 2, 2,  0, 0);
		
		List<Duty> records = dutyDao.getByCourthouseAndDay(c.getCourthouseId(), paramStart, paramEnd);	
		Assertions.assertEquals(1, records.size());
	}
	
	@Test
	@DisplayName("Get duties by courthouse and time period (period before duty start)")
	public void test4_getDutiesByCourthouse() {
		LocalDateTime start = LocalDateTime.of(2018, 2, 1,  9, 0);
		LocalDateTime end   = LocalDateTime.of(2018, 2, 1, 17, 0);
		
		Duty d = ModelUtil.getDuty(a, start, end, (byte) 1);
		dutyDao.save(d);
		
		LocalDateTime paramStart = LocalDateTime.of(2018, 1, 30,  0,  0,  0);
		LocalDateTime paramEnd   = LocalDateTime.of(2018, 2,  1,  8, 59, 59);
		
		List<Duty> records = dutyDao.getByCourthouseAndDay(c.getCourthouseId(), paramStart, paramEnd);	
		Assertions.assertEquals(0, records.size());
	}
	
	@Test
	@DisplayName("Get duties by courthouse and time period (period overlaps duty start)")
	public void test5_getDutiesByCourthouse() {
		LocalDateTime start = LocalDateTime.of(2018, 2, 1,  9, 0);
		LocalDateTime end   = LocalDateTime.of(2018, 2, 1, 17, 0);
		
		Duty d = ModelUtil.getDuty(a, start, end, (byte) 1);
		dutyDao.save(d);
		
		LocalDateTime paramStart = LocalDateTime.of(2018, 2,  1,  8,  0,  0);
		LocalDateTime paramEnd   = LocalDateTime.of(2018, 2,  1, 13,  0,  0);
		
		List<Duty> records = dutyDao.getByCourthouseAndDay(c.getCourthouseId(), paramStart, paramEnd);	
		Assertions.assertEquals(1, records.size());
	}
	
}
