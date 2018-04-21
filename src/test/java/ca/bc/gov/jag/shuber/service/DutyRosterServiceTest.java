package ca.bc.gov.jag.shuber.service;

import javax.annotation.PostConstruct;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
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
	
}
