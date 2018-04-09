package ca.bc.gov.jag.shuber.client.unit;

import org.junit.jupiter.api.Tag;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.TestPropertySource;

import ca.bc.gov.jag.shuber.client.AbstractClientTest;

/**
 * Base class for testing end points using an in memory H2 database.
 * 
 * @author michael.gabelmann
 */
@Tag("unittest")
@TestPropertySource(
	locations = "classpath:application-unit.properties"
)
@ActiveProfiles("unit")
abstract class AbstractUnitTest extends AbstractClientTest {
	
}
