package ca.bc.gov.jag.shuber.client.unit;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.UUID;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.hateoas.Resource;
import org.springframework.hateoas.Resources;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.annotation.DirtiesContext.ClassMode;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.databind.JsonNode;

import ca.bc.gov.jag.shuber.persistence.model.Assignment;
import ca.bc.gov.jag.shuber.persistence.model.Courthouse;
import ca.bc.gov.jag.shuber.persistence.model.Courtroom;
import ca.bc.gov.jag.shuber.persistence.model.Duty;
import ca.bc.gov.jag.shuber.persistence.model.DutyRecurrence;
import ca.bc.gov.jag.shuber.persistence.model.ModelUtil;
import ca.bc.gov.jag.shuber.persistence.model.Region;
import ca.bc.gov.jag.shuber.persistence.model.WorkSectionCode;
import ca.bc.gov.jag.shuber.rest.controller.DutyRosterController;
import ca.bc.gov.jag.shuber.rest.dto.SimpleDuty;
import ca.bc.gov.jag.shuber.rest.dto.post.AssignmentResource;
import ca.bc.gov.jag.shuber.rest.dto.post.CourthouseResource;
import ca.bc.gov.jag.shuber.rest.dto.post.CourtroomResource;
import ca.bc.gov.jag.shuber.rest.dto.post.DutyRecurrenceResource;
import ca.bc.gov.jag.shuber.rest.dto.post.DutyResource;
import ca.bc.gov.jag.shuber.rest.dto.post.RegionResource;
import ca.bc.gov.jag.shuber.rest.request.ExpiryDate;

/**
 * 
 * @author michael.gabelmann
 */
@DirtiesContext(classMode = ClassMode.BEFORE_EACH_TEST_METHOD)
public class DutyRosterClientTest extends AbstractUnitTest {
	/** Logger. */
	private static final Logger log = LogManager.getLogger(DutyRosterClientTest.class);
	
	private LocalTime startTime = LocalTime.of(8, 0);
	private LocalTime endTime = LocalTime.of(17, 0);
	
	private String wscURI;
	private String rURI;
	private String cURI;
	private String crtURI;
	
	@BeforeEach
	@Override
	protected void beforeTest() {
		
	}

	@AfterEach
	@Override
	protected void afterTest() {
		
	}
	
	/**
	 * Example Response:
	 * <pre>
<200,{
  "_embedded" : {
    "duties" : [ {
      "sheriffsRequired" : 2,
      "startDtm" : "2018-04-12T08:00:00",
      "endDtm" : "2018-04-12T17:00:00",
      "sheriffDuties" : [ {
        "idPath" : "/sheriffDuties/1f102906-5a25-4f63-9c6f-1ff76bc1551f",
        "startDateTime" : "2018-04-12T08:00:00",
        "endDateTime" : "2018-04-12T17:00:00"
      }, {
        "idPath" : "/sheriffDuties/e09fb1c2-5397-4e35-abbc-6730eb956dfa",
        "startDateTime" : "2018-04-12T08:00:00",
        "endDateTime" : "2018-04-12T17:00:00"
      } ],
      "assignmentIdPath" : "/assignments/10cc8982-475e-4643-8c0a-05f2b6f9cf9a",
      "idPath" : "/duties/f46ab6b1-8900-412a-b1c3-95ce06d2e632",
      "_links" : {
        "self" : {
          "href" : "http://localhost:53664/api/duties/f46ab6b1-8900-412a-b1c3-95ce06d2e632{?projection}",
          "templated" : true
        },
        "assignment" : {
          "href" : "http://localhost:53664/api/duties/f46ab6b1-8900-412a-b1c3-95ce06d2e632/assignment{?projection}",
          "templated" : true
        },
        "sheriffDuties" : {
          "href" : "http://localhost:53664/api/duties/f46ab6b1-8900-412a-b1c3-95ce06d2e632/sheriffDuties"
        }
      }
    } ]
  },
  "_links" : {
    "self" : {
      "href" : "http://localhost:53664/api/courthouses/c72a9d73-70c0-40b6-b96a-4559199f8989/createDefaultDuties?date=2018-04-12"
    }
  }
},{Content-Type=[application/hal+json;charset=UTF-8], Transfer-Encoding=[chunked], Date=[Thu, 12 Apr 2018 21:16:56 GMT]}>
	 * </pre>
	 * @throws Exception
	 */
	@Test
	@DisplayName("Create default duties")
	public void test1_createDefaultDuties() throws Exception {
		//assignment
		ResponseEntity<Resource<Assignment>> response5 = this.postResource(new AssignmentResource(cURI, crtURI, null, null, null, wscURI, "Assignment 1", "2018-01-01", null));
		Assertions.assertEquals(HttpStatus.CREATED, response5.getStatusCode());
		String aURI = response5.getBody().getId().getHref();
		
		//duty recurrence
		ResponseEntity<Resource<DutyRecurrence>> response6 = this.postResource(new DutyRecurrenceResource(aURI, startTime.toString(), endTime.toString(), "1", "2", "2018-01-01", null));
		Assertions.assertEquals(HttpStatus.CREATED, response6.getStatusCode());
		String drURI = response6.getBody().getId().getHref();	
		
		//we must choose a date that has a valid value in daysBitmap
		LocalDate dateWithMonday = LocalDate.of(2018, 4, 2);
		
		String courthouseId = cURI.substring(cURI.lastIndexOf("/") + 1);
		String uri = String.format("/api/courthouses/%s/createDefaultDuties?date=%s", courthouseId, dateWithMonday);
		ResponseEntity<SimpleDutyResources> response7 = testRestTemplate.postForEntity(
				uri,
				null,
				SimpleDutyResources.class);
		
		Assertions.assertEquals(HttpStatus.CREATED, response7.getStatusCode());
		Assertions.assertEquals(1,  response7.getBody().getContent().size());
		
		SimpleDuty sd = response7.getBody().getContent().iterator().next();
		
		LocalDateTime exStart = LocalDateTime.of(dateWithMonday, startTime);
		LocalDateTime exEnd = LocalDateTime.of(dateWithMonday, endTime);
		String assignmentIdPath = "/assignments/" + aURI.substring(aURI.lastIndexOf("/") + 1);
		String dutyRecurrenceIdPath = "/dutyRecurrences/" + drURI.substring(drURI.lastIndexOf("/") + 1);
		
		Assertions.assertEquals(assignmentIdPath, sd.assignmentIdPath);
		Assertions.assertEquals(dutyRecurrenceIdPath, sd.dutyRecurrenceIdPath);
		Assertions.assertEquals(exStart, sd.startDateTime);
		Assertions.assertEquals(exEnd, sd.endDateTime);
		Assertions.assertEquals(2, sd.sheriffsRequired);
		Assertions.assertEquals(2, sd.sheriffDuties.size());
		
		//TODO: iterate over sheriff duties and ensure they are correct
	}
	
	@Test
	@DisplayName("Try to DELETE an assignment that does not exist")
	public void test1_expireAssignment() throws Exception {
		ResponseEntity<Assignment> response = testRestTemplate.exchange("/api/assignments/" + UUID.randomUUID(), HttpMethod.DELETE, null, Assignment.class);
		Assertions.assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
	}
	
	@Test
	@DisplayName("Expire assignment that exists with no children")
	public void test2_expireAssignment() throws Exception {
		//assignment
		ResponseEntity<Resource<Assignment>> response = this.postResource(new AssignmentResource(cURI, crtURI, null, null, null, wscURI, "Assignment 1", "2018-01-01", null));
		Assertions.assertEquals(HttpStatus.CREATED, response.getStatusCode());
		String aURI = response.getBody().getId().getHref();
		
		/* Verify expiry date set, we used a date prior to the effectiveDate to
		 * ensure that the effectiveDate is set instead.
		 */
		ExpiryDate ed = new ExpiryDate(LocalDate.of(2017, 1, 1));
		String patchPath = DutyRosterController.PATH + DutyRosterController.PATH_EXPIRE_ASSIGNMENT.replace("{id}", aURI.substring(aURI.lastIndexOf("/") + 1));
		
		RestTemplate patchRestTemplate = this.getPatchRestTemplate();
        ResponseEntity<String> response2 = patchRestTemplate.exchange(patchPath, HttpMethod.PATCH, new HttpEntity<ExpiryDate>(ed), String.class);
		Assertions.assertEquals(HttpStatus.OK, response2.getStatusCode());
		
		JsonNode jsonNodeRoot = mapper.readTree(response2.getBody());
		Assertions.assertEquals("2018-01-01", jsonNodeRoot.get("expiryDate").asText());
	}

	@Test
	@DisplayName("Expire assignment that exists with children")
	public void test3_expireAssignment() throws Exception {
		//assignment
		ResponseEntity<Resource<Assignment>> response = this.postResource(new AssignmentResource(cURI, crtURI, null, null, null, wscURI, "Assignment 1", "2018-01-01", null));
		Assertions.assertEquals(HttpStatus.CREATED, response.getStatusCode());
		String aURI = response.getBody().getId().getHref();
		
		//duty recurrence
		ResponseEntity<Resource<DutyRecurrence>> response2 = this.postResource(new DutyRecurrenceResource(aURI, startTime.toString(), endTime.toString(), "1", "2", "2018-01-01", null));
		Assertions.assertEquals(HttpStatus.CREATED, response2.getStatusCode());
		String drURI = response2.getBody().getId().getHref();	
		
		ExpiryDate ed = new ExpiryDate(nowDate);
		String patchPath = DutyRosterController.PATH + DutyRosterController.PATH_EXPIRE_ASSIGNMENT.replace("{id}", aURI.substring(aURI.lastIndexOf("/") + 1));		
		
		RestTemplate patchRestTemplate = this.getPatchRestTemplate();
		ResponseEntity<String> response3 = patchRestTemplate.exchange(patchPath, HttpMethod.PATCH, new HttpEntity<ExpiryDate>(ed), String.class);
		Assertions.assertEquals(HttpStatus.OK, response3.getStatusCode());
		
		JsonNode jsonNodeRoot = mapper.readTree(response3.getBody());
		Assertions.assertEquals(nowDate.toString(), jsonNodeRoot.get("expiryDate").asText());
		
		JsonNode dutyRecurrences = jsonNodeRoot.get("dutyRecurrences");
		JsonNode dr = dutyRecurrences.get(0);
		Assertions.assertEquals(nowDate.toString(), dr.get("expiryDate").asText());
	}
	
	@Test
	@DisplayName("Try to DELETE a duty recurrence that does not exist")
	public void test1_expireDutyRecurrence() {
		ResponseEntity<DutyRecurrence> response = testRestTemplate.exchange("/api/dutyRecurrences/" + UUID.randomUUID(), HttpMethod.DELETE, null, DutyRecurrence.class);
		Assertions.assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
	}
	
	@Test
	@DisplayName("Expire a duty recurrence that exists")
	public void test2_expireDutyRecurrence() throws Exception {
		//assignment
		ResponseEntity<Resource<Assignment>> response = this.postResource(new AssignmentResource(cURI, crtURI, null, null, null, wscURI, "Assignment 1", "2018-01-01", null));
		Assertions.assertEquals(HttpStatus.CREATED, response.getStatusCode());
		String aURI = response.getBody().getId().getHref();
		
		//duty recurrence
		ResponseEntity<Resource<DutyRecurrence>> response2 = this.postResource(new DutyRecurrenceResource(aURI, startTime.toString(), endTime.toString(), "1", "2", "2018-01-01", null));
		Assertions.assertEquals(HttpStatus.CREATED, response2.getStatusCode());
		String drURI = response2.getBody().getId().getHref();	
		
		/* Verify expiry date set, we used a date prior to the effectiveDate to
		 * ensure that the effectiveDate is set instead.
		 */
		ExpiryDate ed = new ExpiryDate(LocalDate.of(2017, 1, 1));
		String expirePath = DutyRosterController.PATH + DutyRosterController.PATH_EXPIRE_DUTY_RECURRENCE.replace("{id}", drURI.substring(drURI.lastIndexOf("/") + 1));

		RestTemplate patchRestTemplate = this.getPatchRestTemplate();
		ResponseEntity<String> response3 = patchRestTemplate.exchange(expirePath, HttpMethod.PATCH, new HttpEntity<ExpiryDate>(ed), String.class);
		Assertions.assertEquals(HttpStatus.OK, response3.getStatusCode());
		
		JsonNode jsonNodeRoot = mapper.readTree(response3.getBody());
		Assertions.assertEquals("2018-01-01", jsonNodeRoot.get("expiryDate").asText());
	}
	
	@Test
	@DisplayName("Get duties for a courthouse")
	public void test1_getDutiesByCourthouseAndDateRange() throws Exception {
		//assignment
		ResponseEntity<Resource<Assignment>> response = this.postResource(new AssignmentResource(cURI, crtURI, null, null, null, wscURI, "Assignment 1", "2018-01-01", null));
		Assertions.assertEquals(HttpStatus.CREATED, response.getStatusCode());
		String aURI = response.getBody().getId().getHref();
		
		//duty
		LocalDateTime start = LocalDateTime.of(2018, 1, 1, 9, 0);
		LocalDateTime end = LocalDateTime.of(2018, 1, 1, 17, 0);
		
		ResponseEntity<Resource<Duty>> response2 = this.postDuty(new DutyResource(aURI, null, start.toString(), end.toString(), "1"));
		Assertions.assertEquals(HttpStatus.CREATED, response2.getStatusCode());
		String dURI = response2.getBody().getId().getHref();
		String dutyId = dURI.substring(dURI.lastIndexOf("/") + 1);
		
		String getPath = DutyRosterController.PATH + DutyRosterController.PATH_GET_DUTIES_BY_COURTHOUSE_AND_DATERANGE.replace("{id}", cURI.substring(cURI.lastIndexOf("/") + 1));
		getPath += "?startDate=" + start.toLocalDate();
		
		ResponseEntity<String> response3 = testRestTemplate.exchange(getPath, HttpMethod.GET, null, String.class);
		Assertions.assertEquals(HttpStatus.OK, response3.getStatusCode());
		
		JsonNode jsonNodeRoot = mapper.readTree(response3.getBody());
		JsonNode dutiesNode = jsonNodeRoot.findValue("duties");
		Assertions.assertTrue(dutiesNode.has(0));
		
		JsonNode simpleDuty = dutiesNode.get(0);
		Assertions.assertEquals("/duties/" + dutyId, simpleDuty.get("idPath").asText());
	}
	
	/**
	 * This is run before each test but is depends upon the @DirtiesContext annotation. 
	 * NOTE: We really just need to truncate all the tables, so there may be a faster way to do this.
	 * 
	 * @see DirtiesContext
	 * @throws Exception error
	 */
	@BeforeEach
	public void initializeData() throws Exception {
		//work section code
		ResponseEntity<Resource<WorkSectionCode>> response1 = this.postResource(ModelUtil.getWorkSectionCode("COURTS", "Courts", nowDate));
		Assertions.assertEquals(HttpStatus.CREATED, response1.getStatusCode());
		wscURI = response1.getBody().getId().getHref();
		
		//region
		ResponseEntity<Resource<Region>> response2 = this.postResource(new RegionResource("VANISLAND", "Vancouver Island", null));
		Assertions.assertEquals(HttpStatus.CREATED, response2.getStatusCode());
		rURI = response2.getBody().getId().getHref();
		
		//courthouse
		ResponseEntity<Resource<Courthouse>> response3 = this.postResource(new CourthouseResource(rURI, "1201", "Victoria"));
		Assertions.assertEquals(HttpStatus.CREATED, response3.getStatusCode());
		cURI = response3.getBody().getId().getHref();
		
		//courtroom
		ResponseEntity<Resource<Courtroom>> response4 = this.postResource(new CourtroomResource(cURI, "101", "Room 101"));
		Assertions.assertEquals(HttpStatus.CREATED, response4.getStatusCode());
		crtURI = response4.getBody().getId().getHref();
	}
	
	static class SimpleDutyResources extends Resources<SimpleDuty> {} 
}
