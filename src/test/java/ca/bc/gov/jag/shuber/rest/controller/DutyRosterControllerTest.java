package ca.bc.gov.jag.shuber.rest.controller;

import static org.hamcrest.Matchers.hasSize;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.UUID;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import ca.bc.gov.jag.shuber.persistence.model.Assignment;
import ca.bc.gov.jag.shuber.persistence.model.Courthouse;
import ca.bc.gov.jag.shuber.persistence.model.Duty;
import ca.bc.gov.jag.shuber.persistence.model.ModelUtil;
import ca.bc.gov.jag.shuber.persistence.model.Region;
import ca.bc.gov.jag.shuber.persistence.model.WorkSectionCode;
import ca.bc.gov.jag.shuber.service.DutyRosterService;

/**
 * 
 * @author michael.gabelmann
 */
@WebMvcTest(DutyRosterController.class)
public class DutyRosterControllerTest extends AbstractControllerTest {

	/** Logger. */
	private static final Logger log = LogManager.getLogger(DutyRosterControllerTest.class);
	
	@MockBean
	private DutyRosterService dutyRosterService;
	
	private UUID dutyId;
	private UUID courthouseId;
	private UUID courthouseId2;
	private WorkSectionCode wsc;
	private Region r;
	private Courthouse c;
	private Assignment a;
	private LocalTime start;
	private LocalTime end;
	
	@BeforeEach
	@Override
	protected void beforeTest() {
		courthouseId = UUID.randomUUID();
		courthouseId2 = UUID.randomUUID();
		dutyId = UUID.randomUUID();
		
		wsc = ModelUtil.getWorkSectionCode("COURTS", "Courts", nowDate);
		r = ModelUtil.getRegion("BC", "BritishColumbia");
		c = ModelUtil.getCourthouse(r, "101", "Room 101");
		a = ModelUtil.getAssignment(c, wsc, "Assignment 1", nowDate);
		start = LocalTime.of(8, 0);
		end = LocalTime.of(17, 0);
		
		Mockito.when(dutyRosterService.createDefaultDuties(courthouseId2, nowDate)).thenReturn(new ArrayList<Duty>());
	}

	@AfterEach
	@Override
	protected void afterTest() {
		
	}

	//curl -i -X POST -H "Content-Type:application/json" -d '{ }' http://localhost:8082/api/courthouses/d67b9684-43c8-474f-80de-9b7b44ab094f/createDefaultDuties?date=2018-04-16	
	
	
	@Test
	@DisplayName("Create default duties for a courthouse and day")
	public void test1_createDefaultDuties() throws Exception {
		LocalDate date = LocalDate.of(2018, 1, 1);
		LocalDateTime startDtm = date.atTime(start);
		LocalDateTime endDtm = date.atTime(end);
		
		//NOTE: if I include SheriffDuty JSON goes into recursive loop and returns a ton of records. why?
		
		Duty d = ModelUtil.getDuty(a, startDtm, endDtm, (byte) 2);
		d.setDutyId(dutyId);
		
		Mockito.when(dutyRosterService.createDefaultDuties(courthouseId, date)).thenReturn(Arrays.asList(d));
		
		//NOTE: fails because it can't convert a String to LocalDate. Not sure why.
		String path = DutyRosterController.PATH + DutyRosterController.PATH_CREATE_DEFAULT_DUTIES.replace("{id}", courthouseId.toString());
		
		MvcResult result = mvc.perform(MockMvcRequestBuilders.post(path)
			.param("date", date.toString())
			.contentType(MediaType.APPLICATION_JSON))
				.andExpect(status().is2xxSuccessful())
				.andExpect(jsonPath("$..duties", hasSize(1)))
				
				.andExpect(jsonPath("$..duties[0].idPath").isNotEmpty())
				.andExpect(jsonPath("$..duties[0].sheriffsRequired").value(2))
				.andExpect(jsonPath("$..duties[0].sheriffDuties").isArray())
				.andExpect(jsonPath("$..duties[0].dutyRecurrenceIdPath").value(""))
				.andExpect(jsonPath("$..duties[0].assignmentIdPath").value("/assignments/null"))
				.andExpect(jsonPath("$..duties[0].startDateTime").value("2018-01-01T08:00:00"))
				.andExpect(jsonPath("$..duties[0].endDateTime").value("2018-01-01T17:00:00"))
				.andReturn();
		
		//NOTE: how to get JSON string from result
		String json = result.getResponse().getContentAsString();
		log.debug("json=" + json);
		
/* example output
{"_embedded":{
	"duties":[
		{"idPath":"/duties/c2c23bf0-b02a-42e2-beb5-2ccc8515313c",
		 "sheriffsRequired":2,
		 "sheriffDuties":[],
		 "dutyRecurrenceIdPath":"",
		 "assignmentIdPath":"/assignments/null",
		 "endDateTime":"2018-04-21T17:00:00",
		 "startDateTime":"2018-04-21T08:00:00"}
	]},
"_links":{
	"self":{"href":"/courthouses/8ea7ff80-22b9-4e30-9697-a1a1afa8eadc/createDefaultDuties?date=2018-04-21"}}
}
*/
	}

}
