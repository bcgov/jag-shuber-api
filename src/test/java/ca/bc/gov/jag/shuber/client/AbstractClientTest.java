package ca.bc.gov.jag.shuber.client;

import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.platform.runner.JUnitPlatform;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.hateoas.MediaTypes;
import org.springframework.hateoas.hal.Jackson2HalModule;
import org.springframework.http.MediaType;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;

import ca.bc.gov.jag.shuber.AbstractTest;

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
	
}
