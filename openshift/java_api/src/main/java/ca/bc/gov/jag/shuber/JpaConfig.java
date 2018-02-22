package ca.bc.gov.jag.shuber;

import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.stereotype.Component;

@Component
@EnableJpaAuditing(auditorAwareRef = "userAuditorAware")
public class JpaConfig {

}
