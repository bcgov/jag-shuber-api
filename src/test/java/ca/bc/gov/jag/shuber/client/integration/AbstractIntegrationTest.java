package ca.bc.gov.jag.shuber.client.integration;

import org.junit.jupiter.api.Tag;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.TestPropertySource;

import ca.bc.gov.jag.shuber.client.AbstractClientTest;

/**
 * Base class for integration tests. Class name must match the pattern (*IT.java) to be
 * considered an integration test by Maven. These tests will run against a "real" database,
 * but <b>MUST</b> not run against production! Tests are not idempotent.
 * 
 * These tests rely will most likely rely on certain data existing in the DB, care should be 
 * taken to not alter or insert new data.
 * 
 * These tests should be used to *smoke* test the API.
 * 
 * @author michael.gabelmann
 */
@Tag("integrationtest")
@TestPropertySource(
	locations = "classpath:application-integration.properties"
)
@ActiveProfiles("integration")
abstract class AbstractIntegrationTest extends AbstractClientTest {

}
