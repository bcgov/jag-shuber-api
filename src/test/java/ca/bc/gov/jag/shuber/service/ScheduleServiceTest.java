package ca.bc.gov.jag.shuber.service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;
import java.util.UUID;

import javax.annotation.PostConstruct;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.platform.runner.JUnitPlatform;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import ca.bc.gov.jag.shuber.AbstractTest;
import ca.bc.gov.jag.shuber.persistence.dao.CourthouseDAO;
import ca.bc.gov.jag.shuber.persistence.dao.ShiftDAO;
import ca.bc.gov.jag.shuber.persistence.dao.WorkSectionCodeDAO;
import ca.bc.gov.jag.shuber.persistence.model.Courthouse;
import ca.bc.gov.jag.shuber.persistence.model.ModelUtil;
import ca.bc.gov.jag.shuber.persistence.model.Region;
import ca.bc.gov.jag.shuber.persistence.model.Sheriff;
import ca.bc.gov.jag.shuber.persistence.model.SheriffRankCode;
import ca.bc.gov.jag.shuber.persistence.model.Shift;
import ca.bc.gov.jag.shuber.persistence.model.WorkSectionCode;
import ca.bc.gov.jag.shuber.rest.request.ShiftCopyOptions;
import ca.bc.gov.jag.shuber.util.DateUtil;

/**
 * We mock our persistence layer since we don't care what happens in the DB.
 * @author michael.gabelmann
 */
@RunWith(JUnitPlatform.class)
@ExtendWith(SpringExtension.class)
public class ScheduleServiceTest extends AbstractTest {

	private ShiftDAO shiftDao;
	private CourthouseDAO courthouseDao;
	private WorkSectionCodeDAO workSectionCodeDao;
	
	private JpaScheduleService scheduleService;
	
	private Region r1;
	private WorkSectionCode wsc1;
	private SheriffRankCode src1;
	private Courthouse c1;
	private Courthouse c2;
	private Sheriff s1;
	
	
	@PostConstruct
	public void setup() {		
		shiftDao = Mockito.mock(ShiftDAO.class);
		courthouseDao = Mockito.mock(CourthouseDAO.class);
		workSectionCodeDao = Mockito.mock(WorkSectionCodeDAO.class);
		scheduleService = new JpaScheduleService(shiftDao, courthouseDao, workSectionCodeDao);
	}
	
	@BeforeEach
	@Override
	protected void beforeTest() {
		r1 = ModelUtil.getRegion("VANISLAND", "Vancouver Island");
		wsc1 = ModelUtil.getWorkSectionCode("COURTS", "Courts", nowDate);
		src1 = ModelUtil.getSheriffRankCode("DEPUTY", "Deputy", nowDate);
		s1 = ModelUtil.getSheriff(src1, "B1001", "U1001");
		
		c1 = ModelUtil.getCourthouse(r1, "1002", "Victoria");
		c1.setCourthouseId(UUID.randomUUID());
		c2 = ModelUtil.getCourthouse(r1, "1003", "Sidney");
		c2.setCourthouseId(UUID.randomUUID());
		
		LocalDateTime shiftStart = LocalDateTime.of(2018, 1, 1,  9, 0);
		LocalDateTime shiftEnd   = LocalDateTime.of(2018, 1, 1, 17, 0);
		LocalDate startDate = shiftStart.toLocalDate();
		LocalDate endDate = startDate.plusDays(6);
		
		Shift sh1 = ModelUtil.getShift(c1, wsc1, shiftStart, shiftEnd);
		List<Shift> shifts1 = Arrays.asList(sh1);
		
		Shift sh2 = ModelUtil.getShift(c2, wsc1, shiftStart, shiftEnd);
		sh2.setSheriff(s1);
		Shift sh3 = ModelUtil.getShift(c2, wsc1, shiftStart.plusDays(1), shiftEnd.plusDays(1));
		List<Shift> shifts2 = Arrays.asList(sh2, sh3);
		
		Mockito.when(shiftDao.getShiftsByCourthouseAndDateTimeRange(c1.getCourthouseId(), startDate.atStartOfDay(), DateUtil.atEndOfDay(endDate))).thenReturn(shifts1);
		Mockito.when(shiftDao.getShiftsByCourthouseAndDateTimeRange(c2.getCourthouseId(), startDate.atStartOfDay(), DateUtil.atEndOfDay(endDate))).thenReturn(shifts2);
	}

	@AfterEach
	@Override
	protected void afterTest() {
		
	}
	
	@Test
	@DisplayName("Copy shifts with no sheriffs")
	void test1_copyShifts() {
		LocalDate startDate = LocalDate.of(2018, 1, 1);
		LocalDate destDate = startDate.plusDays(7);
		ShiftCopyOptions sco = new ShiftCopyOptions(false, startDate, destDate, 7);
		
		List<Shift> newShifts = scheduleService.copyShifts(c1.getCourthouseId(), sco);
		Assertions.assertEquals(1, newShifts.size());
		
		Shift tmp = newShifts.get(0);
		Assertions.assertEquals("2018-01-08T09:00", tmp.getStartDtm().toString());
		Assertions.assertEquals("2018-01-08T17:00", tmp.getEndDtm().toString());
		Assertions.assertNull(tmp.getSheriff());
		Assertions.assertEquals(c1, tmp.getCourthouse());
	}
	
	@Test
	@DisplayName("Copy shifts and sheriffs")
	void test2_copyShifts() {
		LocalDate startDate = LocalDate.of(2018, 1, 1);
		LocalDate destDate = startDate.plusDays(7);
		ShiftCopyOptions sco = new ShiftCopyOptions(true, startDate, destDate, 7);
		
		List<Shift> newShifts = scheduleService.copyShifts(c2.getCourthouseId(), sco);
		Assertions.assertEquals(2, newShifts.size());
		
		Shift tmp = newShifts.get(0);
		Assertions.assertEquals("2018-01-08T09:00", tmp.getStartDtm().toString());
		Assertions.assertEquals("2018-01-08T17:00", tmp.getEndDtm().toString());
		Assertions.assertNotNull(tmp.getSheriff());
		Assertions.assertEquals(c2, tmp.getCourthouse());
		
		Shift tmp2 = newShifts.get(1);
		Assertions.assertEquals("2018-01-09T09:00", tmp2.getStartDtm().toString());
		Assertions.assertEquals("2018-01-09T17:00", tmp2.getEndDtm().toString());
		Assertions.assertNull(tmp2.getSheriff());
		Assertions.assertEquals(c2, tmp2.getCourthouse());
	}
	
	//TODO: test create shifts
	
	//TODO: test delete shifts for day
	
	
}
