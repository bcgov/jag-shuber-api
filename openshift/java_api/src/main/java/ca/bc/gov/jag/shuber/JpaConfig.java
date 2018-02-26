package ca.bc.gov.jag.shuber;

import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.stereotype.Component;

@Component
@EnableJpaAuditing(auditorAwareRef = "userAuditorAware")
public class JpaConfig {
	//NOTE: not sure if we need this class anymore as I fixed an issue with the unit tests.
}
