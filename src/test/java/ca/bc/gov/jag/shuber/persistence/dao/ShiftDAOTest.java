package ca.bc.gov.jag.shuber.persistence.dao;

import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.UUID;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import ca.bc.gov.jag.shuber.persistence.model.Courthouse;
import ca.bc.gov.jag.shuber.persistence.model.Location;
import ca.bc.gov.jag.shuber.persistence.model.ModelUtil;
import ca.bc.gov.jag.shuber.persistence.model.Shift;
import ca.bc.gov.jag.shuber.util.DateUtil;

/**
 * 
 * @author michael.gabelmann
 */
public class ShiftDAOTest extends AbstractDAOTest {
	@Autowired
	private ShiftDAO shiftDAO;
	
	private Location location;
	private Courthouse courthouse;
	private Shift shift;
	
	@BeforeEach
	@Override
	protected void beforeTest() {
		location = ModelUtil.getLocation("Victoria");
		courthouse = ModelUtil.getCourthouse(location, "COURTHOUSE", UUID.randomUUID());
		shift = ModelUtil.getShift(courthouse);
		
		entityManager.persistAndFlush(location);
		entityManager.persistAndFlush(courthouse);
		entityManager.persistAndFlush(shift);
	}

	@AfterEach
	@Override
	protected void afterTest() {

	}

	@Test
	@DisplayName("Search dates same day as shift")
	void test1_getShifts() {
		Date start = DateUtil.getDate(2018, Calendar.JANUARY, 1, 9, 30, 0);
		Date end = DateUtil.getDate(2018, Calendar.JANUARY, 1, 17, 30, 0);
		shift.setStartTime(start);
		shift.setEndTime(end);
		entityManager.persistAndFlush(shift);
		
		String searchStartDate = "2018-01-01";
		String searchEndDate = "2018-01-02";
		List<Shift> records = shiftDAO.getShifts(searchStartDate, searchEndDate, location.getLocationId());
		
		Assertions.assertNotNull(records);
		Assertions.assertTrue(records.size() == 1);
	}

	@Test
	@DisplayName("Search dates outside shift")
	void test2_getShifts() {
		Date start = DateUtil.getDate(2018, Calendar.JANUARY, 1, 0, 0, 0);
		Date end = DateUtil.getDate(2018, Calendar.JANUARY, 1, 23, 59, 59);
		shift.setStartTime(start);
		shift.setEndTime(end);
		entityManager.persistAndFlush(shift);
		
		String searchStartDate = "2018-01-02";
		String searchEndDate = "2018-01-03";
		List<Shift> records = shiftDAO.getShifts(searchStartDate, searchEndDate, location.getLocationId());
		
		Assertions.assertNotNull(records);
		Assertions.assertTrue(records.size() == 0);
	}
	
	@Test
	@DisplayName("Shift inside start and end date search")
	void test3_getShifts() {
		Date start = DateUtil.getDate(2018, Calendar.JANUARY, 2, 9, 0, 0);
		Date end = DateUtil.getDate(2018, Calendar.JANUARY, 2, 17, 30, 0);
		shift.setStartTime(start);
		shift.setEndTime(end);
		entityManager.persistAndFlush(shift);
		
		String searchStartDate = "2018-01-01";
		String searchEndDate = "2018-01-03";
		List<Shift> records = shiftDAO.getShifts(searchStartDate, searchEndDate, location.getLocationId());
		
		Assertions.assertNotNull(records);
		Assertions.assertTrue(records.size() == 1);
	}
}
