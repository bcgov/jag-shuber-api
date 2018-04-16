package ca.bc.gov.jag.shuber.service;

import java.time.LocalDate;

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
import ca.bc.gov.jag.shuber.persistence.dao.AssignmentDAO;
import ca.bc.gov.jag.shuber.persistence.dao.DutyDAO;
import ca.bc.gov.jag.shuber.persistence.dao.DutyRecurrenceDAO;

/**
 * We mock our persistence layer since we dont care what happens in the DB.
 * @author michael.gabelmann
 */
@RunWith(JUnitPlatform.class)
@ExtendWith(SpringExtension.class)
public class DutyRosterServiceTest extends AbstractTest {

	private AssignmentDAO assignmentDao;
	private DutyRecurrenceDAO dutyRecurrenceDao;
	private DutyDAO dutyDao;
	
	private JpaDutyRosterService dutyRosterService;
	
	@PostConstruct
	public void setup() {
		assignmentDao = Mockito.mock(AssignmentDAO.class);
		dutyRecurrenceDao = Mockito.mock(DutyRecurrenceDAO.class);
		dutyDao = Mockito.mock(DutyDAO.class);
		dutyRosterService = new JpaDutyRosterService(assignmentDao, dutyRecurrenceDao, dutyDao);
	}
	
	@BeforeEach
	@Override
	protected void beforeTest() {
		
	}

	@AfterEach
	@Override
	protected void afterTest() {
		// TODO Auto-generated method stub
	}

	@Test
	@DisplayName("Create resource for Monday")
	public void test1_createForDate() {
		long daysBitmap = 1; 
		LocalDate date = LocalDate.of(2018, 4, 2); //is a monday
		Assertions.assertTrue(dutyRosterService.createForDate(date, daysBitmap));
	}
	
	@Test
	@DisplayName("Create resource for days of week, but not weekend")
	public void test2_createForDate() { 
		long daysBitmap = 31; 
		LocalDate date = LocalDate.of(2018, 4, 2); //is a monday

		Assertions.assertTrue(dutyRosterService.createForDate(date, daysBitmap));
		Assertions.assertTrue(dutyRosterService.createForDate(date.plusDays(1), daysBitmap));
		Assertions.assertTrue(dutyRosterService.createForDate(date.plusDays(2), daysBitmap));
		Assertions.assertTrue(dutyRosterService.createForDate(date.plusDays(3), daysBitmap));
		Assertions.assertTrue(dutyRosterService.createForDate(date.plusDays(4), daysBitmap));
		Assertions.assertFalse(dutyRosterService.createForDate(date.plusDays(5), daysBitmap));
		Assertions.assertFalse(dutyRosterService.createForDate(date.plusDays(6), daysBitmap));
	}
	
	@Test
	@DisplayName("Create resource for weekend only")
	public void test3_createForDate() {
		long daysBitmap = 96; 
		LocalDate date = LocalDate.of(2018, 4, 2); //is a monday

		Assertions.assertFalse(dutyRosterService.createForDate(date, daysBitmap));
		Assertions.assertFalse(dutyRosterService.createForDate(date.plusDays(1), daysBitmap));
		Assertions.assertFalse(dutyRosterService.createForDate(date.plusDays(2), daysBitmap));
		Assertions.assertFalse(dutyRosterService.createForDate(date.plusDays(3), daysBitmap));
		Assertions.assertFalse(dutyRosterService.createForDate(date.plusDays(4), daysBitmap));
		Assertions.assertTrue(dutyRosterService.createForDate(date.plusDays(5), daysBitmap));
		Assertions.assertTrue(dutyRosterService.createForDate(date.plusDays(6), daysBitmap));
	}
	
}
