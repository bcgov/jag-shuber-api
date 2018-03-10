package ca.bc.gov.jag.shuber;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.context.annotation.Bean;

/**
 * Entry point for running the Spring application.
 * @author michael.gabelmann
 */
@SpringBootApplication
public class Application {
	/** Logger. */
	private static final Logger log = LogManager.getLogger(Application.class);

	/** Inject application acronym using Spring. */
	@Value("${app.acronym}")
	private String applicationAcronym;
	
	/**
	 * Main entry point used by Spring Boot to initialize the application.
	 * @param args application arguments
	 */
	public static void main(final String[] args) {
		ConfigurableApplicationContext ctx = SpringApplication.run(Application.class, args);

		if (log.isDebugEnabled()) {
			String[] names = ctx.getBeanDefinitionNames();
			for (String name : names) {
				//log.debug("bean name=" + name);
			}
			
			log.debug("startup complete");
		}

		//NOTE: spring doesn't shut down your app (it's in a new thread)
		
	}

	@Bean
	public CommandLineRunner commandLineRunner(ApplicationContext ctx) {
		return args -> log.debug("application started");
	}

}
