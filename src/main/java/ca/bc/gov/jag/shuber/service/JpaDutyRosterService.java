package ca.bc.gov.jag.shuber.service;

import java.time.Instant;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ca.bc.gov.jag.shuber.persistence.dao.AssignmentDAO;
import ca.bc.gov.jag.shuber.persistence.dao.CourthouseDAO;
import ca.bc.gov.jag.shuber.persistence.model.Assignment;
import ca.bc.gov.jag.shuber.persistence.model.Duty;

/**
 * 
 * @author michael.gabelmann
 */
@Service
public class JpaDutyRosterService implements DutyRosterService {

	@Autowired
	private AssignmentDAO assignmentDao;
	
	@Autowired
	private CourthouseDAO courthouseDao;
	
	
	@Override
	public List<Duty> createDefaultDuties(UUID courthouseId, LocalDate date) {
		Assignment a = null;
		Duty d = new Duty(UUID.randomUUID(), a, (byte) 2, "test", "test", Instant.now(), Instant.now(), 0L);
		
		List<Duty> duties = new ArrayList<>();
		duties.add(d);
		
		return new ArrayList<>();
	}
	
}
