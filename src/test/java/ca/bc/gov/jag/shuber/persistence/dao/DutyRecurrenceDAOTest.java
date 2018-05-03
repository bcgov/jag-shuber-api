package ca.bc.gov.jag.shuber.persistence.dao;

import java.time.LocalTime;
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
import ca.bc.gov.jag.shuber.persistence.model.DutyRecurrence;
import ca.bc.gov.jag.shuber.persistence.model.ModelUtil;
import ca.bc.gov.jag.shuber.persistence.model.Region;
import ca.bc.gov.jag.shuber.persistence.model.WorkSectionCode;
import ca.bc.gov.jag.shuber.persistence.model.WorkSectionCode.WORK_SECTION_CODE;

/**
 * 
 * @author michael.gabelmann
 */
public class DutyRecurrenceDAOTest extends AbstractDAOTest {

	@Autowired
	private DutyRecurrenceDAO dutyRecurrenceDao;
	
	private WorkSectionCode wsc;
	private Region r;
	private Courthouse c;
	private Courtroom cr;
	private Assignment a;
	DutyRecurrence dr;
	
	@BeforeEach
	@Override
	protected void beforeTest() {
		// TODO Auto-generated method stub

		wsc = ModelUtil.getWorkSectionCode(WORK_SECTION_CODE.COURTS.name(), "Courts", nowDate);
		r = ModelUtil.getRegion("VANISLAND", "Vancourver Island");
		c = ModelUtil.getCourthouse(r, "VIC", "Victoria");
		cr = ModelUtil.getCourtroom(c, "101", "Room 101");
		a = ModelUtil.getAssignment(c, wsc, "Pirates vs. Ninjas", nowDate);
		a.setCourtroom(cr);
		
		dr = ModelUtil.getDutyRecurrence(a, nowTime, LocalTime.MIDNIGHT, 31, (byte) 2, nowDate);
		
		entityManager.persist(wsc);
		entityManager.persist(r);
		entityManager.persist(c);
		entityManager.persist(cr);
		entityManager.persist(a);
		entityManager.persist(dr);
		entityManager.flush();
		
		entityManager.refresh(c);
	}

	@AfterEach
	@Override
	protected void afterTest() {
		
	}
	
	@Test
	@DisplayName("Get duty recurrences by courthouse id, no expiry date")
	public void test1_getDutyRecurrences() {
		//before start
		List<DutyRecurrence> records = dutyRecurrenceDao.getDutyRecurrences(c.getCourthouseId(), nowDate.minusDays(1));
		Assertions.assertTrue(records.size() == 0);
		
		//same as start
		records = dutyRecurrenceDao.getDutyRecurrences(c.getCourthouseId(), nowDate);
		Assertions.assertTrue(records.size() == 1);
		
		//day after start
		records = dutyRecurrenceDao.getDutyRecurrences(c.getCourthouseId(), nowDate.plusDays(1));
		Assertions.assertTrue(records.size() == 1);
	}
	
	@Test
	@DisplayName("Get duty recurrences by courthouse id, only effective 1 day")
	public void test2_getDutyRecurrences() {
		dr.setExpiryDate(nowDate);
		entityManager.flush();
		
		//before start
		List<DutyRecurrence> records = dutyRecurrenceDao.getDutyRecurrences(c.getCourthouseId(), nowDate.minusDays(1));
		Assertions.assertTrue(records.size() == 0);
		
		//same day
		records = dutyRecurrenceDao.getDutyRecurrences(c.getCourthouseId(), nowDate);
		Assertions.assertTrue(records.size() == 1);
		
		//after end
		records = dutyRecurrenceDao.getDutyRecurrences(c.getCourthouseId(), nowDate.plusDays(1));
		Assertions.assertTrue(records.size() == 0);
	}
	
	@Test
	@DisplayName("Get duty recurrences by courthouse id, between start/end")
	public void test3_getDutyRecurrences() {
		dr.setExpiryDate(nowDate.plusDays(2));
		entityManager.flush();
		
		//in between
		List<DutyRecurrence> records = dutyRecurrenceDao.getDutyRecurrences(c.getCourthouseId(), nowDate.plusDays(1));
		Assertions.assertTrue(records.size() == 1);
	}
	
}
