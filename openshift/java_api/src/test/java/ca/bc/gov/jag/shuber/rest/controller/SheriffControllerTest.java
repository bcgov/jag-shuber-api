package ca.bc.gov.jag.shuber.rest.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.hamcrest.Matchers;
import org.junit.Test;
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
    
    
    @Override
	public void beforeTest() {
		records = new ArrayList<>();
	}
    
	@Override
	public void afterTest() {

	}
    
    //public ResponseEntity<Sheriff> createSheriff(@Valid @RequestBody Sheriff record) {
    //public ResponseEntity<Sheriff> getSheriff(@PathVariable(value="id") String id) {
    /*public ResponseEntity<Sheriff> updateSheriff(
		@PathVariable(value="id") String id,
		@Valid @RequestBody Sheriff record) {*/
    //public ResponseEntity<Sheriff> deleteSheriff(@PathVariable(value="id") String id) {
    //public ResponseEntity<List<Sheriff>> getSheriffs() {
    //public ResponseEntity<Sheriff> findSheriffByBadgeNo(@RequestParam(value="badgeNo") String badgeNo) {
    
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
    
}
