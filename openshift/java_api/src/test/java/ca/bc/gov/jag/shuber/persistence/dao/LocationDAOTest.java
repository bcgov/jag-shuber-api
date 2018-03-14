package ca.bc.gov.jag.shuber.persistence.dao;

import java.util.Optional;
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

/**
 * 
 * @author michael.gabelmann
 */
public class LocationDAOTest extends AbstractDAOTest {
	@Autowired
	private LocationDAO locationDAO;
	
	private Location loc;
	private Courthouse c;
	
	
	@BeforeEach
	@Override
	protected void beforeTest() {
		loc = ModelUtil.getLocation("VICTORIA");
		entityManager.persistAndFlush(loc);
		
		c = ModelUtil.getCourthouse(loc, "PROVINCIAL", UUID.randomUUID());
		entityManager.persistAndFlush(c);
		
		entityManager.refresh(loc);
	}

	@AfterEach
	@Override
	protected void afterTest() {
		// TODO Auto-generated method stub

	}

	@Test
	@DisplayName("Ensure that courthouse mapping works")
	public void getLocation() {
		Optional<Location> record = locationDAO.findById(loc.getLocationId());
		
		Assertions.assertTrue(record.isPresent());
		
		Location tmpLoc = record.get();
		Courthouse tmpC = tmpLoc.getCourthouse();
		
		Assertions.assertNotNull(tmpC);
	}
}
