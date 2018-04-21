package ca.bc.gov.jag.shuber.persistence.dao;

import java.time.LocalDateTime;
import java.util.List;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import ca.bc.gov.jag.shuber.persistence.model.Courthouse;
import ca.bc.gov.jag.shuber.persistence.model.ModelUtil;
import ca.bc.gov.jag.shuber.persistence.model.Region;
import ca.bc.gov.jag.shuber.persistence.model.Sheriff;
import ca.bc.gov.jag.shuber.persistence.model.SheriffRankCode;
import ca.bc.gov.jag.shuber.persistence.model.Shift;
import ca.bc.gov.jag.shuber.persistence.model.WorkSectionCode;
import ca.bc.gov.jag.shuber.persistence.model.WorkSectionCode.WORK_SECTION_CODE;
import ca.bc.gov.jag.shuber.util.DateUtil;

/**
 * 
 * @author michael.gabelmann
 */
public class ShiftDAOTest extends AbstractDAOTest {

	@Autowired
	private ShiftDAO shiftDao;
	
	private WorkSectionCode wsc1;
	private SheriffRankCode src1;
	private Region r;
	private Courthouse c;
	private Sheriff s;
	
	
	@BeforeEach
	@Override
	protected void beforeTest() {
		wsc1 = ModelUtil.getWorkSectionCode(WORK_SECTION_CODE.COURTS.name(), "Courts", nowDate);
		src1 = ModelUtil.getSheriffRankCode("DEPUTY", "Deputy", nowDate);
		
		r = ModelUtil.getRegion("VANISLAND", "Vancourver Island");
		c = ModelUtil.getCourthouse(r, "VIC", "Victoria");
		s = ModelUtil.getSheriff(src1, "B10003", "1003");
		s.setCourthouse(c);
		
		entityManager.persist(wsc1);
		entityManager.persist(src1);
		entityManager.persist(r);
		entityManager.persist(c);
		entityManager.persist(s);
		entityManager.flush();
	}

	@AfterEach
	@Override
	protected void afterTest() {
		
	}
	
	@Test
	@DisplayName("Get shifts that exist within date range")
	void test1_getShiftsByCourthouseAndDateTimeRange() {
		LocalDateTime startDtm = LocalDateTime.of(2018, 1, 1, 9, 0);
		LocalDateTime endDtm = LocalDateTime.of(2018, 1, 1, 17, 0);
		
		Shift sh1 = ModelUtil.getShift(c, wsc1, startDtm, endDtm);
		sh1.setSheriff(s);
		shiftDao.save(sh1);
		
		List<Shift> records = shiftDao.getShiftsByCourthouseAndDateTimeRange(c.getCourthouseId(), startDtm.toLocalDate().atStartOfDay(), DateUtil.atEndOfDay(endDtm.toLocalDate()));
		Assertions.assertEquals(1, records.size());
	}
	
	@Test
	@DisplayName("Get shifts where date range is before record")
	void test2_getShiftsByCourthouseAndDateTimeRange() {
		LocalDateTime startDtm = LocalDateTime.of(2018, 1, 1, 9, 0);
		LocalDateTime endDtm = LocalDateTime.of(2018, 1, 1, 17, 0);
		
		Shift sh1 = ModelUtil.getShift(c, wsc1, startDtm, endDtm);
		sh1.setSheriff(s);
		shiftDao.save(sh1);
		
		List<Shift> records = shiftDao.getShiftsByCourthouseAndDateTimeRange(c.getCourthouseId(), startDtm.minusDays(2), endDtm.minusDays(1));
		Assertions.assertEquals(0, records.size());
		
	}
	
//	@Autowired
//	private ShiftDAO shiftDAO;
//	
//	private Location location;
//	private Courthouse courthouse;
//	private Shift shift;
//	
//	@BeforeEach
//	@Override
//	protected void beforeTest() {
//		location = ModelUtil.getLocation("Victoria");
//		courthouse = ModelUtil.getCourthouse(location, "COURTHOUSE", UUID.randomUUID());
//		shift = ModelUtil.getShift(courthouse);
//		
//		entityManager.persistAndFlush(location);
//		entityManager.persistAndFlush(courthouse);
//		entityManager.persistAndFlush(shift);
//	}
	
//	@Test
//	@DisplayName("Search dates same day as shift")
//	void test1_getShifts() {
//		Date start = DateUtil.getDate(2018, Calendar.JANUARY, 1, 9, 30, 0);
//		Date end = DateUtil.getDate(2018, Calendar.JANUARY, 1, 17, 30, 0);
//		shift.setStartTime(start);
//		shift.setEndTime(end);
//		entityManager.persistAndFlush(shift);
//		
//		String searchStartDate = "2018-01-01";
//		String searchEndDate = "2018-01-02";
//		List<Shift> records = shiftDAO.getShifts(searchStartDate, searchEndDate, location.getLocationId());
//		
//		Assertions.assertNotNull(records);
//		Assertions.assertTrue(records.size() == 1);
//	}
//
//	@Test
//	@DisplayName("Search dates outside shift")
//	void test2_getShifts() {
//		Date start = DateUtil.getDate(2018, Calendar.JANUARY, 1, 0, 0, 0);
//		Date end = DateUtil.getDate(2018, Calendar.JANUARY, 1, 23, 59, 59);
//		shift.setStartTime(start);
//		shift.setEndTime(end);
//		entityManager.persistAndFlush(shift);
//		
//		String searchStartDate = "2018-01-02";
//		String searchEndDate = "2018-01-03";
//		List<Shift> records = shiftDAO.getShifts(searchStartDate, searchEndDate, location.getLocationId());
//		
//		Assertions.assertNotNull(records);
//		Assertions.assertTrue(records.size() == 0);
//	}
//	
//	@Test
//	@DisplayName("Shift inside start and end date search")
//	void test3_getShifts() {
//		Date start = DateUtil.getDate(2018, Calendar.JANUARY, 2, 9, 0, 0);
//		Date end = DateUtil.getDate(2018, Calendar.JANUARY, 2, 17, 30, 0);
//		shift.setStartTime(start);
//		shift.setEndTime(end);
//		entityManager.persistAndFlush(shift);
//		
//		String searchStartDate = "2018-01-01";
//		String searchEndDate = "2018-01-03";
//		List<Shift> records = shiftDAO.getShifts(searchStartDate, searchEndDate, location.getLocationId());
//		
//		Assertions.assertNotNull(records);
//		Assertions.assertTrue(records.size() == 1);
//	}
}
