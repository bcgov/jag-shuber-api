package ca.bc.gov.jag.shuber.persistence.dao;

import java.util.Optional;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import ca.bc.gov.jag.shuber.persistence.model.JailRoleCode;
import ca.bc.gov.jag.shuber.persistence.model.ModelUtil;

/**
 * 
 * @author michael.gabelmann
 */
public class JailRoleCodeDAOTest extends AbstractDAOTest {
	@Autowired
	private JailRoleCodeDAO jailRoleCodeDao;
	
	@BeforeEach
	@Override
	protected void beforeTest() {
		JailRoleCode src = ModelUtil.getJailRoleCode("JAIL_ROLE_CODE", "Test Code", nowDate);
		entityManager.persistAndFlush(src);
	}

	@AfterEach
	@Override
	protected void afterTest() {
		
	}
	
	@Test
	@DisplayName("Create a jail role code")
	public void test1_create() {
		JailRoleCode jrc = ModelUtil.getJailRoleCode("TEST", "Test Code", nowDate);
		
		jailRoleCodeDao.save(jrc);
		Assertions.assertNotNull(jrc.getJailRoleCode());
	}
	
	@Test
	@DisplayName("Find a jail role code")
	public void test1_findByJailRoleCode() {
		Optional<JailRoleCode> src = jailRoleCodeDao.findByJailRoleCode("JAIL_ROLE_CODE");
		Assertions.assertTrue(src.isPresent());
	}
	
}
