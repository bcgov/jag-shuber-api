package ca.bc.gov.jag.shuber.client.unit;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.time.LocalDate;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.ResultActions;

import ca.bc.gov.jag.shuber.persistence.model.ModelUtil;
import ca.bc.gov.jag.shuber.persistence.model.SheriffRankCode;
import ca.bc.gov.jag.shuber.persistence.model.SheriffRankCode.SHERIFF_RANK_CODE;
import ca.bc.gov.jag.shuber.rest.dto.post.SheriffResource;

/**
 * 
 * @author michael.gabelmann
 *
 */
public class SheriffClientTest extends AbstractUnitTest {
	/** Logger. */
	private static final Logger log = LogManager.getLogger(SheriffClientTest.class);
	
	@BeforeEach
	@Override
	protected void beforeTest() {
		// TODO Auto-generated method stub
		
	}

	@AfterEach
	@Override
	protected void afterTest() {
		// TODO Auto-generated method stub
		
	}
	
	@Test
	@DisplayName("Create a Sheriff")
	public void test1_create() throws Exception {
		LocalDate nowDate = LocalDate.now();
		
		SheriffRankCode src = ModelUtil.getSheriffRankCode(SHERIFF_RANK_CODE.DEPUTYSHERIFF.name(), "Deputy Sheriff", nowDate);
		
		mvc.perform(post("http://localhost:8082/api/sheriffRankCodes")
			       .contentType(MediaType.APPLICATION_JSON)
			       .content(mapper.writeValueAsString(src))
			       .accept(MediaType.APPLICATION_JSON))
			       .andExpect(status().isCreated());
		
		//NOTE: this mimics what the end point expects for the resource
		SheriffResource sr = new SheriffResource("testbadge1234", "userId1234", "http://localhost:8082/api/sheriffRankCodes/DEPUTYSHERIFF", "firstName", "lastName");
		
	    ResultActions ra = mvc.perform(post("http://localhost:8082/api/sheriffs")
	       .contentType(MediaType.APPLICATION_JSON)
	       .content(mapper.writeValueAsString(sr))
	       .accept(MediaType.APPLICATION_JSON))
	       .andExpect(status().isCreated());
	    
	    MvcResult mr = ra.andReturn();
	    log.debug(mr.getResponse().getContentAsString());
	}
	
	/*
	@Test
	@DisplayName("Create a sheriff")
	public void test1_create() {
		//NOTE: this test only works once as it persists the data into the POSTGRES DB, would be better to use H2DB.
		//NOTE: it is a pain in the ass to test services this way, might be easier to use MockMvc. See SheriffIT.java
		
		//Fix the craziness of generics and Java, otherwise how to you to this Resource<SheriffRankCode>.getClass()?
		ParameterizedTypeReference<Resource<SheriffRankCode>> srcRef = new ParameterizedTypeReference<Resource<SheriffRankCode>>() {};
		ParameterizedTypeReference<Resource<Sheriff>> sRef = new ParameterizedTypeReference<Resource<Sheriff>>() {};
		
		UriComponentsBuilder builder = UriComponentsBuilder.fromPath("/api/sheriffRankCodes/search/findBySheriffRankCode").queryParam("sheriffRankCode", SHERIFF_RANK_CODE.DEPUTYSHERIFF);
		ResponseEntity<Resource<SheriffRankCode>> responseSrc = testRestTemplate.exchange(builder.toUriString(), HttpMethod.GET, null, srcRef);
		Assertions.assertEquals(HttpStatus.OK, responseSrc.getStatusCode());
		
		Link srcId = responseSrc.getBody().getId();
		log.debug("SheriffRankCode id=" + srcId.getHref());
		
		SheriffResource sr = new SheriffResource("testbadge1238", "userId1238", srcId.getHref(), "firstName", "lastName");
		
		UriComponentsBuilder builder2 = UriComponentsBuilder.fromPath("/api/sheriffs");
	
		ResponseEntity<Resource<Sheriff>> response = testRestTemplate.exchange(builder2.toUriString(), HttpMethod.POST, new HttpEntity<SheriffResource>(sr), sRef);
		Assertions.assertEquals(HttpStatus.CREATED, response.getStatusCode());
		Assertions.assertNotNull(response.getBody());
		log.debug("Sheriff id=" + response.getBody().getId().getHref());
		
		//ResponseEntity<String> response = restTemplate.postForEntity(builder2.toUriString(), sr, String.class);
		//log.debug("BODY=" + response.getBody());
		//Assertions.assertEquals(HttpStatus.CREATED, response.getStatusCode());
	}
	*/
	
}

