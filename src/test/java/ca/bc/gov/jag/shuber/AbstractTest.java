package ca.bc.gov.jag.shuber;

import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.ZoneId;

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
	
	/** Current time. */
	protected LocalTime nowTime;
	
	/** Current date and time. */
	protected LocalDateTime nowDateTime;
	
	
	@PostConstruct
	public void postConstruct() {
		now  = Instant.now();
		nowDate = now.atZone(ZoneId.systemDefault()).toLocalDate();
		nowTime = now.atZone(ZoneId.systemDefault()).toLocalTime();
		nowDateTime = now.atZone(ZoneId.systemDefault()).toLocalDateTime();
	}

	/** This method is run before every test. Place any setup that is required here. */
	protected abstract void beforeTest();

	/** This method is run after every test. Place any cleanup that is required. */
	protected abstract void afterTest();

}
