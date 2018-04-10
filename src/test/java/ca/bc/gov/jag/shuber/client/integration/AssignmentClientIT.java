package ca.bc.gov.jag.shuber.client.integration;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.springframework.hateoas.Resources;

import ca.bc.gov.jag.shuber.persistence.model.Assignment;
import ca.bc.gov.jag.shuber.persistence.model.WorkSectionCode;

/**
 * Integration test.
 * @author michael.gabelmann
 */
public class AssignmentClientIT extends AbstractIntegrationTest {
	/** Logger. */
	private static final Logger log = LogManager.getLogger(AssignmentClientIT.class);
	
	@BeforeEach
	@Override
	protected void beforeTest() {
		
	}

	@AfterEach
	@Override
	protected void afterTest() {
		
	}

	/*
	@Test
	@DisplayName("Create an assignment with recurrences")
	public void test1_createAssignmentWithRecurrences() {
		UriComponentsBuilder builderWsc = UriComponentsBuilder.fromPath("/api/workSectionCodes/search/findByWorkSectionCode").queryParam("workSectionCode", WORK_SECTION_CODE.COURTS);
		ResponseEntity<WorkSectionCode> responseWsc = testRestTemplate.getForEntity(builderWsc.toUriString(), WorkSectionCode.class);
		WorkSectionCode wsc1 = responseWsc.getBody();
		
		Assertions.assertNotNull(wsc1);
		
		UriComponentsBuilder builderJrc = UriComponentsBuilder.fromPath("/api/jailRoleCodes/search/findByJailRoleCode").queryParam("jailRoleCode", JAIL_ROLE_CODE.CONTROL);
		ResponseEntity<JailRoleCode> responseJrc = testRestTemplate.getForEntity(builderJrc.toUriString(), JailRoleCode.class);
		JailRoleCode jrc1 = responseJrc.getBody();
		
		Assertions.assertNotNull(jrc1);
		
		UriComponentsBuilder builderCh = UriComponentsBuilder.fromPath("/api/courthouses/search/findByCourthouseCd").queryParam("courthouseCd", "1201");
		ResponseEntity<Courthouse> responseCh = testRestTemplate.getForEntity(builderCh.toUriString(), Courthouse.class);
		Courthouse ch1 = responseCh.getBody();
		
		Assertions.assertNotNull(ch1);
		
		Assignment a = ModelUtil.getAssignment(ch1, wsc1, "TEST");
		a.setJailRoleCode(jrc1);
		
		//DutyRecurrence dr1 = ModelUtil.getDutyRecurrence(null, LocalTime.MIDNIGHT, LocalTime.NOON, 31L, (byte) 2);
		//DutyRecurrence dr2 = ModelUtil.getDutyRecurrence(null, LocalTime.MIDNIGHT, LocalTime.now(), 7L, (byte) 1);

		//List<DutyRecurrence> records = new ArrayList<>();
		//records.add(dr1);
		//records.add(dr2);
		//a.setDutyRecurrences(records);
		
		UriComponentsBuilder builderA = UriComponentsBuilder.fromPath("/api/assignments");
		ResponseEntity<Assignment> response = testRestTemplate.postForEntity(builderA.toUriString(), a, Assignment.class);
		Assignment result = response.getBody();
		
		Assertions.assertEquals(HttpStatus.CREATED, response.getStatusCode());
		Assertions.assertNotNull(result);
		Assertions.assertNotNull(result.getAssignmentId());
		
		for (DutyRecurrence dr : result.getDutyRecurrences()) {
			Assertions.assertNotNull(dr.getDutyRecurrenceId());
		}
	}
	*/
	
	/** helper class. */
	static class AssignmentResources extends Resources<Assignment> {}
	
	/** helper class. */
	static class WorkSectionCodeResources extends Resources<WorkSectionCode> {}
}
