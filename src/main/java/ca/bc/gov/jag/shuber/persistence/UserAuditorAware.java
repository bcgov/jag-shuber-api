package ca.bc.gov.jag.shuber.persistence;

import java.util.Optional;

import org.springframework.data.domain.AuditorAware;
import org.springframework.stereotype.Component;

import ca.bc.gov.jag.shuber.Application;

/**
 * 
 * @author michael.gabelmann
 */
@Component
public class UserAuditorAware implements AuditorAware<String> {

	@Override
	public Optional<String> getCurrentAuditor() {

		/* 
		 * We could use Spring Security here and load the value from
		 * the security context, but this also works, since SiteMinder
		 * will authenticate users.
		 */
		String userGUID = Application.user.get();
		
		if (userGUID == null || "".equals(userGUID)) {
			userGUID = "IDIR\\NOBODY";
		}
		
		return Optional.of(userGUID);
	}

}
