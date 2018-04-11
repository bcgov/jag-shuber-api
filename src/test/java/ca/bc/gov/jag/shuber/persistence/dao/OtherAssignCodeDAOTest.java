package ca.bc.gov.jag.shuber.persistence.dao;

import java.util.Optional;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import ca.bc.gov.jag.shuber.persistence.model.ModelUtil;
import ca.bc.gov.jag.shuber.persistence.model.OtherAssignCode;

/**
 * 
 * @author michael.gabelmann
 */
public class OtherAssignCodeDAOTest extends AbstractDAOTest {
	@Autowired
	private OtherAssignCodeDAO otherAssignCodeDao;
	
	@BeforeEach
	@Override
	protected void beforeTest() {
		OtherAssignCode oac = ModelUtil.getOtherAssignCode("OTHER_ASSIGN_CODE", "Test Code", nowDate);
		entityManager.persistAndFlush(oac);
	}

	@AfterEach
	@Override
	protected void afterTest() {
		
	}
	
	@Test
	@DisplayName("Create a new other assign code")
	public void test1_create() {
		OtherAssignCode oac = ModelUtil.getOtherAssignCode("TEST", "Test Code", nowDate);
		
		otherAssignCodeDao.save(oac);
		Assertions.assertNotNull(oac.getOtherAssignCode());
	}
	
	@Test
	@DisplayName("Find an other assign code")
	public void test1_findByOtherAssignCode() {
		Optional<OtherAssignCode> wsc = otherAssignCodeDao.findByOtherAssignCode("OTHER_ASSIGN_CODE");
		Assertions.assertTrue(wsc.isPresent());
	}
	
}
