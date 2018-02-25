package ca.bc.gov.jag.shuber.rest.controller;

import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.platform.runner.JUnitPlatform;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;

import ca.bc.gov.jag.shuber.AbstractTest;

/**
 * Base class for testing Controller REST unit tests.
 * @author michael.gabelmann
 */
@RunWith(JUnitPlatform.class)
@ExtendWith(SpringExtension.class)
abstract class AbstractControllerTest extends AbstractTest {
	@Autowired
    protected MockMvc mvc;
	
}
