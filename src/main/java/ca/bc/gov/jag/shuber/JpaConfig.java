package ca.bc.gov.jag.shuber;

import org.springframework.context.annotation.Bean;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.data.projection.SpelAwareProxyProjectionFactory;
import org.springframework.stereotype.Component;

/**
 * 
 * @author michael.gabelmann
 */
@Component
@EnableJpaAuditing(auditorAwareRef = "userAuditorAware")
public class JpaConfig {
	//NOTE: not sure if we need this class anymore as I fixed an issue with the unit tests.
	
	/**
	 * For working with projections.
	 * @return
	 */
	@Bean
	public SpelAwareProxyProjectionFactory projectionFactory() {
		return new SpelAwareProxyProjectionFactory();
	}
}
