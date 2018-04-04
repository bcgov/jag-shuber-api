package ca.bc.gov.jag.shuber;

import java.time.Instant;
import java.time.LocalDate;

import javax.annotation.PostConstruct;

/**
 * Base class for JUnit tests.
 * @author michael.gabelmann
 */
public abstract class AbstractTest {
	/** Current date and time with time zone. */
	protected Instant now;
	
	/** Current date. */
	protected LocalDate nowDate;
	
	
	@PostConstruct
	public void postConstruct() {
		now  = Instant.now();
		nowDate = LocalDate.now();	
	}
	
	/** This method is run before every test. Place any setup that is required here. */
	protected abstract void beforeTest();
	
	/** This method is run after every test. Place any cleanup that is required. */
	protected abstract void afterTest();
	
}
