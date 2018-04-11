package ca.bc.gov.jag.shuber.persistence.dao;

import java.util.Optional;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import ca.bc.gov.jag.shuber.persistence.model.ModelUtil;
import ca.bc.gov.jag.shuber.persistence.model.SheriffRankCode;

/**
 * 
 * @author michael.gabelmann
 */
public class SheriffRankCodeDAOTest extends AbstractDAOTest {
	@Autowired
	private SheriffRankCodeDAO sheriffRankCodeDao;
	
	@BeforeEach
	@Override
	protected void beforeTest() {
		SheriffRankCode src = ModelUtil.getSheriffRankCode("SHERIFF_RANK_CODE", "Test Code", nowDate);
		entityManager.persistAndFlush(src);
	}

	@AfterEach
	@Override
	protected void afterTest() {
		
	}
	
	@Test
	@DisplayName("Create a new sheriff rank code")
	public void test1_create() {
		SheriffRankCode src = ModelUtil.getSheriffRankCode("TEST", "Test Code", nowDate);
		
		sheriffRankCodeDao.save(src);
		Assertions.assertNotNull(src.getSheriffRankCode());
	}

	@Test
	@DisplayName("Find a sheriff rank code")
	public void test1_findBySheriffRankCode() {
		Optional<SheriffRankCode> src = sheriffRankCodeDao.findBySheriffRankCode("SHERIFF_RANK_CODE");
		Assertions.assertTrue(src.isPresent());
	}

}
