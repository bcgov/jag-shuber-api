package ca.bc.gov.jag.shuber.rest.controller;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import ca.bc.gov.jag.shuber.service.SheriffService;

/**
 * 
 * @author michael.gabelmann
 */
@WebMvcTest(SheriffController.class)
public class SheriffControllerTest extends AbstractControllerTest {
 
    @MockBean
    private SheriffService sheriffService;
    
    //private List<Sheriff> records;
    
    @BeforeEach
    @Override
	public void beforeTest() {
		//records = new ArrayList<>();
	}
    
    @AfterEach
	@Override
	public void afterTest() {

    }
    
    /*
    @Test
    @DisplayName("Find a sheriff by a badge number that exists")
    public void test1_findSheriffByBadgeNo() throws Exception {
    		Assertions.fail("TODO");
    		
    		Sheriff s1 = ModelUtil.getSheriff("badgeNo1", "userId1");
    		
    		Mockito.when(sheriffService.getSheriffByBadgeNo("badgeNo1")).thenReturn(Optional.of(s1));
    		
    		mvc.perform(MockMvcRequestBuilders.get(SheriffController.PATH + SheriffController.GET_SHERIFFBYBADGENO)
    			  .param("badgeNo", "badgeNo1")
  		      .contentType(MediaType.APPLICATION_JSON))
  		      .andExpect(MockMvcResultMatchers.status().isOk())
  		      .andExpect(MockMvcResultMatchers.jsonPath("badgeNo", Matchers.is(s1.getBadgeNo())));
    }
    
    @Test
    @DisplayName("Find a sheriff by a badge number that does not exist")
    public void test2_findSheriffByBadgeNo() throws Exception {
    		Assertions.fail("TODO");
    	
    		mvc.perform(MockMvcRequestBuilders.get(SheriffController.PATH + SheriffController.GET_SHERIFFBYBADGENO)
    			  .param("badgeNo", "doesnotexist")
  		      .contentType(MediaType.APPLICATION_JSON))
  		      .andExpect(MockMvcResultMatchers.status().is4xxClientError());
    }
    
    @Test
    @DisplayName("Find sheriffs for a given courthouse")
    public void test1_getSheriffsByCourthouse() throws Exception {
    		Assertions.fail("TODO");
    	
    		Sheriff s1 = ModelUtil.getSheriff("badgeNo1", "userId1");
    		UUID locationId1 = UUID.randomUUID();
    		
    		List<Sheriff> records = new ArrayList<>();
    		records.add(s1);
    		
    		Mockito.when(sheriffService.getSheriffsByCourthouse(locationId1)).thenReturn(records);
    		
    		mvc.perform(MockMvcRequestBuilders.get(SheriffController.PATH + SheriffController.GET_SHERIFFBYCOURTHOUSE)
    			.param("locationId", locationId1.toString())
    			.contentType(MediaType.APPLICATION_JSON))
    			.andExpect(MockMvcResultMatchers.status().isOk())
    			.andExpect(MockMvcResultMatchers.jsonPath("$[0].badgeNo", Matchers.is(s1.getBadgeNo())));
    }
    */
    
}
