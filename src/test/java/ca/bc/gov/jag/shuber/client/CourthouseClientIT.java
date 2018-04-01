package ca.bc.gov.jag.shuber.client;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.springframework.hateoas.Resources;

import ca.bc.gov.jag.shuber.persistence.model.Courthouse;

/**
 * Integration test.
 * @author michael.gabelmann
 */
public class CourthouseClientIT extends AbstractIT {
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

//	@Test
//	public void test1_getSheriffs() {	
//		ResponseEntity<CourthouseResources> response = restTemplate.getForEntity("/api/courthouses/", CourthouseResources.class);
//		Collection<Courthouse> results = response.getBody().getContent();
//		
//		Assertions.assertNotNull(results);
//		Assertions.assertEquals(HttpStatus.OK, response.getStatusCode());
//		
//		for (Courthouse c : results) {
//			log.debug("Courthouse = " + c.getCourthouseCode());
//		}
//	}

	/** helper class. */
	static class CourthouseResources extends Resources<Courthouse> {}
}
