package ca.bc.gov.jag.shuber.persistence.dao;

import java.util.Optional;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import ca.bc.gov.jag.shuber.persistence.model.ModelUtil;
import ca.bc.gov.jag.shuber.persistence.model.WorkSectionCode;

/**
 * 
 * @author michael.gabelmann
 */
public class WorkSectionCodeDAOTest extends AbstractDAOTest {
	@Autowired
	private WorkSectionCodeDAO workSectionCodeDao;
	
	@BeforeEach
	@Override
	protected void beforeTest() {
		WorkSectionCode wsc = ModelUtil.getWorkSectionCode("WORK_SECTION_CODE", "Test Code", nowDate);
		entityManager.persistAndFlush(wsc);
	}

	@AfterEach
	@Override
	protected void afterTest() {
		// TODO Auto-generated method stub
		
	}

	@Test
	@DisplayName("Create a new work section code")
	public void test1_create() {
		WorkSectionCode wsc = ModelUtil.getWorkSectionCode("TEST", "Test Code", nowDate);
		
		workSectionCodeDao.save(wsc);
		Assertions.assertNotNull(wsc.getWorkSectionCode());
	}
	
	@Test
	@DisplayName("Find a work section code")
	public void test1_findByWorkSectionCode() {
		Optional<WorkSectionCode> wsc = workSectionCodeDao.findByWorkSectionCode("WORK_SECTION_CODE");
		Assertions.assertTrue(wsc.isPresent());
	}
	
}
