package ca.bc.gov.jag.shuber;

import java.util.List;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.context.annotation.Bean;

import ca.bc.gov.jag.shuber.persistence.model.Sheriff;
import ca.bc.gov.jag.shuber.persistence.service.SheriffSchedulerService;

/**
 *
 * @author michael.gabelmann
 */
@SpringBootApplication
public class Application {
	/** Logger. */
	private static final Logger log = LogManager.getLogger(Application.class);

	/** Inject application acronym using Spring. */
	@Value("${app.acronym}")
	private String applicationAcronym;
	
	@Autowired
	private SheriffSchedulerService sheriffSchedulerService;
	
	
	/**
	 * Main entry point used by Spring Boot to initialize the application.
	 * @param args application arguments
	 */
	public static void main(final String[] args) {
		ConfigurableApplicationContext ctx = SpringApplication.run(Application.class, args);

		log.debug("done");

		//NOTE: if you don't do this spring doesn't shut down your app (it's in a new thread)
		//ctx.close();
	}

	@Bean
	public CommandLineRunner commandLineRunner(ApplicationContext ctx) {
		return args -> {
			List<Sheriff> sheriffs = sheriffSchedulerService.getSheriffsSortedByName();
					
			for (Sheriff sheriff : sheriffs) {
				log.debug(sheriff.getSheriffId() + ", name=" + sheriff.getName());
			}
		};
	}
}
