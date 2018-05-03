package ca.bc.gov.jag.shuber.client;

import java.util.ArrayList;
import java.util.List;

import org.apache.http.client.HttpClient;
import org.apache.http.impl.client.HttpClientBuilder;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.platform.runner.JUnitPlatform;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.hateoas.MediaTypes;
import org.springframework.hateoas.Resource;
import org.springframework.hateoas.hal.Jackson2HalModule;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.http.client.HttpComponentsClientHttpRequestFactory;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;

import ca.bc.gov.jag.shuber.AbstractTest;
import ca.bc.gov.jag.shuber.persistence.model.Assignment;
import ca.bc.gov.jag.shuber.persistence.model.Courthouse;
import ca.bc.gov.jag.shuber.persistence.model.Courtroom;
import ca.bc.gov.jag.shuber.persistence.model.Duty;
import ca.bc.gov.jag.shuber.persistence.model.DutyRecurrence;
import ca.bc.gov.jag.shuber.persistence.model.JailRoleCode;
import ca.bc.gov.jag.shuber.persistence.model.OtherAssignCode;
import ca.bc.gov.jag.shuber.persistence.model.Region;
import ca.bc.gov.jag.shuber.persistence.model.WorkSectionCode;
import ca.bc.gov.jag.shuber.rest.dto.post.AssignmentResource;
import ca.bc.gov.jag.shuber.rest.dto.post.CourthouseResource;
import ca.bc.gov.jag.shuber.rest.dto.post.CourtroomResource;
import ca.bc.gov.jag.shuber.rest.dto.post.DutyRecurrenceResource;
import ca.bc.gov.jag.shuber.rest.dto.post.DutyResource;
import ca.bc.gov.jag.shuber.rest.dto.post.RegionResource;

/**
 * Base class for tests that will run against an end point. The database could be 
 * in memory (H2) or something else. You can also use MockMvc, RestTemplate or TestRestTemplate
 * for accessing the end points (repositories).
 * 
 * @see AbstractIntegrationTest
 * @see AbstractUnitTest
 * @author michael.gabelmann
 */
@RunWith(JUnitPlatform.class)
@ExtendWith(SpringExtension.class)
@SpringBootTest(
	webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT
)
@AutoConfigureMockMvc
public abstract class AbstractClientTest extends AbstractTest {
	@Autowired
	protected TestRestTemplate testRestTemplate;

	@Autowired 
	protected ObjectMapper mapper;
	
	@Autowired 
	protected MockMvc mvc;
	
	@LocalServerPort
	protected int port;
	
	protected final ParameterizedTypeReference<Resource<WorkSectionCode>> wscRef = new ParameterizedTypeReference<Resource<WorkSectionCode>>() {};
	protected final ParameterizedTypeReference<Resource<JailRoleCode>> jrcRef = new ParameterizedTypeReference<Resource<JailRoleCode>>() {};
	protected final ParameterizedTypeReference<Resource<OtherAssignCode>> oacRef = new ParameterizedTypeReference<Resource<OtherAssignCode>>() {};
	protected final ParameterizedTypeReference<Resource<Region>> rRef = new ParameterizedTypeReference<Resource<Region>>() {};
	protected final ParameterizedTypeReference<Resource<Courthouse>> cRef = new ParameterizedTypeReference<Resource<Courthouse>>() {};
	protected final ParameterizedTypeReference<Resource<Courtroom>> crtRef = new ParameterizedTypeReference<Resource<Courtroom>>() {};
	protected final ParameterizedTypeReference<Resource<Assignment>> aRef = new ParameterizedTypeReference<Resource<Assignment>>() {};
	protected final ParameterizedTypeReference<Resource<DutyRecurrence>> drRef = new ParameterizedTypeReference<Resource<DutyRecurrence>>() {};
	protected final ParameterizedTypeReference<Resource<Duty>> dRef = new ParameterizedTypeReference<Resource<Duty>>() {};

	/**
	 * Get REST template configured for HAL+JSON.
	 * @return rest template
	 */
	public final RestTemplate getRestTemplate() {
		ObjectMapper mapper = new ObjectMapper();
        mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
        mapper.registerModules(new Jackson2HalModule(), new JavaTimeModule());

        MappingJackson2HttpMessageConverter converter = new MappingJackson2HttpMessageConverter();
        converter.setSupportedMediaTypes(MediaType.parseMediaTypes(MediaTypes.HAL_JSON_VALUE));
        converter.setObjectMapper(mapper);

        List<HttpMessageConverter<?>> list = new ArrayList<HttpMessageConverter<?>>();
        list.add(converter);
        
        return new RestTemplate(list);
	}
	
	/**
	 * NOTE: there is an issue with PATCH and using testRestTemplate.exchange(). It will fail
	 * with method not allowed. You have to use the the code below to modify the restTemplate.
	 * There must be a better solution. Maybe try Mockito / MockMVC?
	 * 
	 * @see https://rtmccormick.com/2017/07/30/solved-testing-patch-spring-boot-testresttemplate/
	 * @return rest template
	 */
	public final RestTemplate getPatchRestTemplate() {
		HttpClient httpClient = HttpClientBuilder.create().build();
		RestTemplate patchRestTemplate = testRestTemplate.getRestTemplate();
        patchRestTemplate.setRequestFactory(new HttpComponentsClientHttpRequestFactory(httpClient));
        
        return patchRestTemplate;
	}
	
	public final ResponseEntity<Resource<WorkSectionCode>> postResource(WorkSectionCode wsc) {
		return testRestTemplate.exchange("/api/workSectionCodes", HttpMethod.POST, new HttpEntity<WorkSectionCode>(wsc), wscRef);
	}
	
	public final ResponseEntity<Resource<JailRoleCode>> postResource(JailRoleCode jrc) {
		return testRestTemplate.exchange("/api/jailRoleCodes", HttpMethod.POST, new HttpEntity<JailRoleCode>(jrc), jrcRef);
	}
	
	public final ResponseEntity<Resource<OtherAssignCode>> postResource(OtherAssignCode oac) {
		return testRestTemplate.exchange("/api/otherAssignCodes", HttpMethod.POST, new HttpEntity<OtherAssignCode>(oac), oacRef);
	}
	
	public final ResponseEntity<Resource<Region>> postResource(RegionResource r) {
		return testRestTemplate.exchange("/api/regions", HttpMethod.POST, new HttpEntity<RegionResource>(r), rRef);
	}
	
	public final ResponseEntity<Resource<Courthouse>> postResource(CourthouseResource c) {
		return testRestTemplate.exchange("/api/courthouses", HttpMethod.POST, new HttpEntity<CourthouseResource>(c), cRef);
	}
	
	public final ResponseEntity<Resource<Courtroom>> postResource(CourtroomResource c) {
		return testRestTemplate.exchange("/api/courtrooms", HttpMethod.POST, new HttpEntity<CourtroomResource>(c), crtRef);
	}
	
	public final ResponseEntity<Resource<Assignment>> postResource(AssignmentResource ar) {
		return testRestTemplate.exchange("/api/assignments", HttpMethod.POST, new HttpEntity<AssignmentResource>(ar), aRef);
	}
	
	public final ResponseEntity<Resource<DutyRecurrence>> postResource(DutyRecurrenceResource drr) {
		return testRestTemplate.exchange("/api/dutyRecurrences", HttpMethod.POST, new HttpEntity<DutyRecurrenceResource>(drr), drRef);
	}
	
	public final ResponseEntity<Resource<Duty>> postDuty(DutyResource d) {
		return testRestTemplate.exchange("/api/duties", HttpMethod.POST, new HttpEntity<DutyResource>(d), dRef);
	}
	
}
