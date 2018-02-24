package ca.bc.gov.jag.shuber;

import java.util.Date;

import javax.annotation.PostConstruct;

import org.junit.After;
import org.junit.Before;

/**
 * 
 * @author michael.gabelmann
 */
public abstract class AbstractTest {
	/** Current date/time. */
	protected Date now;
	
	
	@PostConstruct
	public void postConstruct() {
		now = new Date();
	}
	
	/** This method is run before every test. Place any setup that is required here. */
	@Before
	public abstract void beforeTest();
	
	/** This method is run after every test. Place any cleanup that is required. */
	@After
	public abstract void afterTest();
	
}
