package ca.bc.gov.jag.shuber.service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import ca.bc.gov.jag.shuber.persistence.dao.DutyDAO;
import ca.bc.gov.jag.shuber.persistence.dao.DutyRecurrenceDAO;
import ca.bc.gov.jag.shuber.persistence.model.Assignment;
import ca.bc.gov.jag.shuber.persistence.model.Duty;
import ca.bc.gov.jag.shuber.persistence.model.DutyRecurrence;
import ca.bc.gov.jag.shuber.persistence.model.SheriffDuty;

/**
 * 
 * @author michael.gabelmann
 */
@Service
public class JpaDutyRosterService implements DutyRosterService {
	/** Logger. */
	private static final Logger log = LogManager.getLogger(JpaDutyRosterService.class);
	
	@Autowired
	private DutyRecurrenceDAO dutyRecurrenceDao;
	
	@Autowired
	private DutyDAO dutyDao;
	
	
	@Transactional(readOnly = false)
	@Override
	public List<Duty> createDefaultDuties(UUID courthouseId, LocalDate date) {
		List<Duty> duties = new ArrayList<>();
		
		List<DutyRecurrence> recurrences = dutyRecurrenceDao.getDutyRecurrences(courthouseId);
		
		for (DutyRecurrence dutyRecurrence : recurrences) {
			Assignment a = dutyRecurrence.getAssignment();
			LocalDateTime start = dutyRecurrence.getStartTime().atDate(date);
			LocalDateTime end = dutyRecurrence.getEndTime().atDate(date);
			
			Duty d = new Duty(null, a, start, end, dutyRecurrence.getSheriffsRequired(), null, null, null, null, 0L, null);
			
			List<SheriffDuty> sheriffDuties = new ArrayList<>();
			
			int sheriffsRequired = (int) dutyRecurrence.getSheriffsRequired();
			for (int i=0; i < sheriffsRequired; i++) {
				SheriffDuty sd = new SheriffDuty(null, d, null, start, end, null, null, null, null, 0L);
				sheriffDuties.add(sd);
			}
			
			d.setSheriffDuties(sheriffDuties);
			dutyDao.saveAndFlush(d);
			
			duties.add(d);
		}
		
		return duties;
	}

}
