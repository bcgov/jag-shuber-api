package ca.bc.gov.jag.shuber.client;

import org.junit.jupiter.api.Tag;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.platform.runner.JUnitPlatform;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import ca.bc.gov.jag.shuber.AbstractTest;

/**
 * Base class for integration tests. Class name must match the pattern (*IT.java) to be
 * considered an integration test by Maven.
 * @author michael.gabelmann
 */
@Tag("integrationtest")
@RunWith(JUnitPlatform.class)
@ExtendWith(SpringExtension.class)
@SpringBootTest(
	webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT
)
@TestPropertySource(
	locations = "classpath:application-integration.properties"
)
abstract class AbstractIT extends AbstractTest {
	
}
