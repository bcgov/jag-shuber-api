package ca.bc.gov.jag.shuber.persistence.dao;

import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.UUID;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
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
	void testGetShifts() {
		shift.setStartTime(DateUtil.getDate(2018, Calendar.JANUARY, 1, 9, 30, 0));
		shift.setEndTime(DateUtil.getDate(2018, Calendar.JANUARY, 1, 17, 30, 0));
		entityManager.persistAndFlush(shift);
		
		Date startDate = DateUtil.getDate(2018, Calendar.JANUARY, 1);
		Date endDate = DateUtil.getDate(2018, Calendar.JANUARY, 2);
		List<Shift> records = shiftDAO.getShifts(startDate, endDate, location.getLocationId());
		
		Assertions.assertNotNull(records);
		Assertions.assertTrue(records.size() == 1);
	}

}
