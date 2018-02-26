package ca.bc.gov.jag.shuber.client;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import ca.bc.gov.jag.shuber.persistence.model.Sheriff;

/**
 * Integration test.
 * @author michael.gabelmann
 */
public class SheriffClientIT extends AbstractIT {
	/** Logger. */
	private static final Logger log = LogManager.getLogger(SheriffClientIT.class);
	
	@Autowired
	private TestRestTemplate restTemplate;
	
	@BeforeEach
	@Override
	protected void beforeTest() {

	}

	@AfterEach
	@Override
	protected void afterTest() {

	}
	
	@Test
	public void test1_getSheriffs() {
		ResponseEntity<Sheriff[]> response = restTemplate.getForEntity("/api/sheriffs", Sheriff[].class);
		Sheriff[] results = response.getBody();
		
		for (int i=0; i < results.length; i++) {
			log.debug("Sheriff[" + i + "], name=" + results[i].getName());
		}
		
		Assertions.assertNotNull(results);
		Assertions.assertEquals(HttpStatus.OK, response.getStatusCode());
	}

}
