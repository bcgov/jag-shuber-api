package ca.bc.gov.jag.shuber.persistence.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.stereotype.Service;

import ca.bc.gov.jag.shuber.persistence.model.Sheriff;

/**
 * <p>To test our service layer we mock the persistence layer, since we don't
 * care how it works.</p>
 * 
 * @author michael.gabelmann
 */
@Service
public class MockSheriffSchedulerService implements SheriffSchedulerService {
	private List<Sheriff> records = new ArrayList<>();
	
	@Override
	public List<Sheriff> getSherrifs() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Sheriff> getSheriffsSortedByName() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Optional<Sheriff> getSheriffById(UUID id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Sheriff getSheriffByBadgeNo(String badgeNo) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Sheriff createSheriff(Sheriff sheriff) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void deleteSheriff(Sheriff sheriff) {
		// TODO Auto-generated method stub
		
	}

}
