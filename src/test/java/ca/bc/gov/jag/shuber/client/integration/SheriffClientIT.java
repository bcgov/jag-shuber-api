package ca.bc.gov.jag.shuber.client.integration;

import java.util.Collection;

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
import org.springframework.web.util.UriComponentsBuilder;

import ca.bc.gov.jag.shuber.persistence.model.Sheriff;


/**
 * Integration test.
 * 
 * @author michael.gabelmann
 */
public class SheriffClientIT extends AbstractIntegrationTest {
	/** Logger. */
	private static final Logger log = LogManager.getLogger(SheriffClientIT.class);
	
	@BeforeEach
	@Override
	protected void beforeTest() {
		
	}

	@AfterEach
	@Override
	protected void afterTest() {

	}
	
	@Test
	@DisplayName("Get all sheriffs")
	public void test1_getSheriffs() {
		ResponseEntity<SheriffResources> response = testRestTemplate.getForEntity("/api/sheriffs", SheriffResources.class);
		Collection<Sheriff> results = response.getBody().getContent();	
		
		Assertions.assertNotNull(results);
		Assertions.assertEquals(HttpStatus.OK, response.getStatusCode());
		
		for (Sheriff s : results) {
			log.debug("Sheriff name=" + s.getName());
		}
	}

	@Test
	@DisplayName("Find sheriff by badge number")
	public void test1_findByBadgeNo() {		
		UriComponentsBuilder builder = UriComponentsBuilder.fromPath("/api/sheriffs/search/findByBadgeNo").queryParam("badgeNo", "BN10000");
		ResponseEntity<Sheriff> response = testRestTemplate.getForEntity(builder.toUriString(), Sheriff.class);
		Sheriff s1 = response.getBody();
		
		Assertions.assertNotNull(s1);
	}
	
	@Test
	@DisplayName("Find sheriff by user id")
	public void test1_findByUserid() {		
		UriComponentsBuilder builder = UriComponentsBuilder.fromPath("/api/sheriffs/search/findByUserid").queryParam("userid", "userId10000");
		ResponseEntity<Sheriff> response = testRestTemplate.getForEntity(builder.toUriString(), Sheriff.class);
		Sheriff s1 = response.getBody();
		
		Assertions.assertNotNull(s1);
	}
	
	@Test
	@DisplayName("Find sheriffs by courthouse")
	public void test1_getByCourthouse() {
		UriComponentsBuilder builder = UriComponentsBuilder.fromPath("/api/sheriffs/search/getSheriffsByCourthouse").queryParam("courthouseCd", "1201");
		ResponseEntity<SheriffResources> response = testRestTemplate.getForEntity(builder.toUriString(), SheriffResources.class);
		Collection<Sheriff> records = response.getBody().getContent();
		
		Assertions.assertNotNull(records);
		Assertions.assertTrue(records.size() > 0);
	}
	
	/** helper class. */
	static class SheriffResources extends Resources<Sheriff> {}
	
}
