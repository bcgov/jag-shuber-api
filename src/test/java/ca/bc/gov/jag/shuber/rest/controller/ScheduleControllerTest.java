package ca.bc.gov.jag.shuber.rest.controller;

import static org.hamcrest.Matchers.hasSize;
import static org.junit.jupiter.api.Assertions.fail;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.Arrays;
import java.util.List;
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

import com.fasterxml.jackson.databind.ObjectMapper;

import ca.bc.gov.jag.shuber.persistence.model.Courthouse;
import ca.bc.gov.jag.shuber.persistence.model.ModelUtil;
import ca.bc.gov.jag.shuber.persistence.model.Region;
import ca.bc.gov.jag.shuber.persistence.model.Sheriff;
import ca.bc.gov.jag.shuber.persistence.model.SheriffRankCode;
import ca.bc.gov.jag.shuber.persistence.model.Shift;
import ca.bc.gov.jag.shuber.persistence.model.WorkSectionCode;
import ca.bc.gov.jag.shuber.rest.request.ShiftCopyOptions;
import ca.bc.gov.jag.shuber.service.ScheduleService;

@WebMvcTest(ScheduleController.class)
public class ScheduleControllerTest extends AbstractControllerTest {
	/** Logger. */
	private static final Logger log = LogManager.getLogger(ScheduleControllerTest.class);
	
	@MockBean
	private ScheduleService scheduleService;
	
	private SheriffRankCode src;
	private WorkSectionCode wsc;
	private Region r;
	private Courthouse c;
	private Sheriff s;
	
	private ShiftCopyOptions co1;
	
	private LocalTime shiftStart = LocalTime.of(9, 0);
	private LocalTime shiftEnd = LocalTime.of(17, 0);
	
	@BeforeEach
	@Override
	protected void beforeTest() {
		src = ModelUtil.getSheriffRankCode("DEPUTY", "Deputy", nowDate);
		wsc = ModelUtil.getWorkSectionCode("COURTS", "Courts", nowDate);
		
		r = ModelUtil.getRegion("BC", "BritishColumbia");
		c = ModelUtil.getCourthouse(r, "101", "Room 101");
		c.setCourthouseId(UUID.randomUUID());
		s = ModelUtil.getSheriff(src, "B1001", "U1001");
		
		co1 = new ShiftCopyOptions();
		co1.setNumDays(Integer.valueOf(10));
	}

	@AfterEach
	@Override
	protected void afterTest() {
		
	}
	
	@Test
	@DisplayName("Copy shifts")
	void testCopyShifts() throws Exception {
		LocalDateTime startDtm = nowDate.plusDays(7).atTime(shiftStart);
		LocalDateTime endDtm = nowDate.plusDays(7).atTime(shiftEnd);
		
		Shift s1 = ModelUtil.getShift(c, wsc, startDtm, endDtm);
		Shift s2 = ModelUtil.getShift(c, wsc, startDtm.plusDays(1), endDtm.plusDays(1));
		List<Shift> records = Arrays.asList(s1, s2);
		
		String path = ScheduleController.PATH + ScheduleController.PATH_COPY_SHIFTS.replace("{id}", c.getCourthouseId().toString());
		
		ObjectMapper mapper = this.getObjectMapper();
		String obj = mapper.writeValueAsString(co1);
		
		Mockito.when(scheduleService.copyShifts(c.getCourthouseId(), co1)).thenReturn(records);
		
		MvcResult result = mvc.perform(MockMvcRequestBuilders.post(path)
				.content(obj)
				.contentType(MediaType.APPLICATION_JSON))
					.andExpect(status().is2xxSuccessful())
					//.andExpect(jsonPath("$..shifts", hasSize(2)))
					.andExpect(jsonPath("$..shifts[0].idPath").value("/shifts/null"))
					.andExpect(jsonPath("$..shifts[0].sheriffIdPath").value(""))
					.andExpect(jsonPath("$..shifts[0].workSectionCodePath").value("/workSectionCodes/COURTS"))
					.andExpect(jsonPath("$..shifts[0].courthouseIdPath").value("/courthouses/" + c.getCourthouseId().toString()))
					.andExpect(jsonPath("$..shifts[0].startDateTime").value(startDtm.toString() + ":00"))
					.andExpect(jsonPath("$..shifts[0].endDateTime").value(endDtm.toString() + ":00"))
					.andReturn();
		
		//NOTE: how to get JSON string from result
		String json = result.getResponse().getContentAsString();
		log.debug("json=" + json);
	}
	
	@Test
	void testCreateShifts() {
		fail("Not yet implemented");
	}

	@Test
	void testDeleteShiftsForDate() {
		fail("Not yet implemented");
	}


}
