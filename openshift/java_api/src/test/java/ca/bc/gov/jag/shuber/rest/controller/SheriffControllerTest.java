package ca.bc.gov.jag.shuber.rest.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.hamcrest.Matchers;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import ca.bc.gov.jag.shuber.persistence.model.Sheriff;
import ca.bc.gov.jag.shuber.service.SheriffSchedulerService;

/**
 * 
 * @author michael.gabelmann
 */
@WebMvcTest(SheriffController.class)
public class SheriffControllerTest extends AbstractControllerTest {
 
    @MockBean
    private SheriffSchedulerService sheriffSchedulerService;
    
    private List<Sheriff> records;
    
    @BeforeEach
    @Override
	public void beforeTest() {
		records = new ArrayList<>();
	}
    
    @AfterEach
	@Override
	public void afterTest() {

	}
    
    //public ResponseEntity<Sheriff> createSheriff(@Valid @RequestBody Sheriff record) {
    //public ResponseEntity<Sheriff> getSheriff(@PathVariable(value="id") String id) {
    /*public ResponseEntity<Sheriff> updateSheriff(
		@PathVariable(value="id") String id,
		@Valid @RequestBody Sheriff record) {*/
    //public ResponseEntity<Sheriff> deleteSheriff(@PathVariable(value="id") String id) {
   
	
    @Test
    public void test1_createSheriff() {
    		
    }
    
    @Test
    public void test1_getSheriffs() throws Exception {
    		Sheriff s1 = new Sheriff(UUID.randomUUID(),"badgeNo1", "createdBy", "updatedBy", now, now, 0);
    		records.add(s1);	
		
		Mockito.when(sheriffSchedulerService.getSheriffs()).thenReturn(records);
    		
    		mvc.perform(MockMvcRequestBuilders.get("/api/sheriffs")
    		      .contentType(MediaType.APPLICATION_JSON))
    		      .andExpect(MockMvcResultMatchers.status().isOk())
    		      .andExpect(MockMvcResultMatchers.jsonPath("$", Matchers.hasSize(1)))
    		      .andExpect(MockMvcResultMatchers.jsonPath("$[0].badgeNo", Matchers.is(s1.getBadgeNo())));
    }
    
    @Test
    public void test1_findSheriffByBadgeNo() throws Exception {
    		Sheriff s1 = new Sheriff(UUID.randomUUID(),"badgeNo1", "createdBy", "updatedBy", now, now, 0);
    		
    		Mockito.when(sheriffSchedulerService.getSheriffByBadgeNo("badgeNo1")).thenReturn(Optional.of(s1));
    		
    		mvc.perform(MockMvcRequestBuilders.get("/api/sheriffs/search")
    			  .param("badgeNo", "badgeNo1")
  		      .contentType(MediaType.APPLICATION_JSON))
  		      .andExpect(MockMvcResultMatchers.status().isOk())
  		      .andExpect(MockMvcResultMatchers.jsonPath("badgeNo", Matchers.is(s1.getBadgeNo())));
    }
    
    @Test
    public void test2_findSheriffByBadgeNo() throws Exception {
    		mvc.perform(MockMvcRequestBuilders.get("/api/sheriffs/search")
    			  .param("badgeNo", "doesnotexist")
  		      .contentType(MediaType.APPLICATION_JSON))
  		      .andExpect(MockMvcResultMatchers.status().is4xxClientError());
    }
}
