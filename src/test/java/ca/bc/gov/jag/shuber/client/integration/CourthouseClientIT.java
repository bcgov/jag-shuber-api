package ca.bc.gov.jag.shuber.client.integration;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.hateoas.Resources;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import ca.bc.gov.jag.shuber.persistence.model.Courthouse;

/**
 * Integration test.
 * @author michael.gabelmann
 */
public class CourthouseClientIT extends AbstractIntegrationTest {
	/** Logger. */
	private static final Logger log = LogManager.getLogger(CourthouseClientIT.class);
	
	@BeforeEach
	@Override
	protected void beforeTest() {
		
	}

	@AfterEach
	@Override
	protected void afterTest() {
		
	}

	@Test
	@DisplayName("Get all courthouses")
	public void test1_getCourthouses() {	
		ResponseEntity<CourthouseResources> response = testRestTemplate.getForEntity("/api/courthouses/", CourthouseResources.class);
		Assertions.assertEquals(HttpStatus.OK, response.getStatusCode());
		Assertions.assertNotNull(response.getBody().getContent());
		Assertions.assertTrue(response.getBody().getContent().size() > 0);
	}

	/** helper class. */
	static class CourthouseResources extends Resources<Courthouse> {}
}
