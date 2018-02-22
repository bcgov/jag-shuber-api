package ca.bc.gov.jag.shuber.persistence;

import java.util.Optional;

import org.springframework.data.domain.AuditorAware;
import org.springframework.stereotype.Component;

/**
 * Contains current user information for CreatedBy and UpdatedBy database fields.
 * @author michael.gabelmann
 */
@Component
public class MockAuditorAware implements AuditorAware<String> {
	/** Logged in user. */
	public static final String USER = "TEST\\TESTUSER";
	
	@Override
	public Optional<String> getCurrentAuditor() {
		return Optional.of(USER);
	}
	
}
