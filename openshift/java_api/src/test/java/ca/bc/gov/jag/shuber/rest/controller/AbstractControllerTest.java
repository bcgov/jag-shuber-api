package ca.bc.gov.jag.shuber.rest.controller;

import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

import ca.bc.gov.jag.shuber.AbstractTest;

/**
 * 
 * @author michael.gabelmann
 */
@RunWith(SpringRunner.class)
abstract class AbstractControllerTest extends AbstractTest {
	@Autowired
    protected MockMvc mvc;
	
}
