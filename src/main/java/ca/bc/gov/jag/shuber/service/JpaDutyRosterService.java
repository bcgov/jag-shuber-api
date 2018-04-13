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
	
	private DutyRecurrenceDAO dutyRecurrenceDao;
	
	private DutyDAO dutyDao;
	
	
	/**
	 * 
	 * @param dutyRecurrenceDao
	 * @param dutyDao
	 */
	@Autowired
	public JpaDutyRosterService(DutyRecurrenceDAO dutyRecurrenceDao, DutyDAO dutyDao) {
		this.dutyRecurrenceDao = dutyRecurrenceDao;
		this.dutyDao = dutyDao;
	}
	
	@Transactional(readOnly = false)
	@Override
	public List<Duty> createDefaultDuties(UUID courthouseId, LocalDate date) {
		List<Duty> duties = new ArrayList<>();
		
		List<DutyRecurrence> recurrences = dutyRecurrenceDao.getDutyRecurrences(courthouseId);
		
		for (DutyRecurrence dutyRecurrence : recurrences) {
			Assignment a = dutyRecurrence.getAssignment();
			LocalDateTime start = dutyRecurrence.getStartTime().atDate(date);
			LocalDateTime end = dutyRecurrence.getEndTime().atDate(date);
			
			if (createForDate(date, dutyRecurrence.getDaysBitmap())) {
				//only create a duty and sheriff duties if day of week matches
				Duty d = new Duty(null, a, start, end, dutyRecurrence.getSheriffsRequired(), null, null, null, null, 0L, null);
				
				List<SheriffDuty> sheriffDuties = new ArrayList<>();
				
				int sheriffsRequired = (int) dutyRecurrence.getSheriffsRequired();
				for (int i=0; i < sheriffsRequired; i++) {
					SheriffDuty sd = new SheriffDuty(null, d, null, start, end, null, null, null, null, 0L);
					sheriffDuties.add(sd);
				}
				
				//this works since we set the CascadeType on Duty.SheriffDuties
				d.setSheriffDuties(sheriffDuties);
				dutyDao.saveAndFlush(d);
				
				duties.add(d);
			}
		}
		
		return duties;
	}

	/**
	 * Calculate if we need to create records based on the day of week 
	 * for the given date and whether that matches a bit in the bitmap 
	 * using the following formula.
	 * 
	 * <pre>
	 * mon=1, tues=2, wed=4, thu=8, fri=16, sat=32, sun=64
	 * </pre>
	 * 
	 * @param date
	 * @param daysBitmap
	 * @return true if matches, false otherwise
	 */
	boolean createForDate(LocalDate date, long daysBitmap) {
		int dayOfWeek = date.getDayOfWeek().getValue();
		int bitshifted = 1 << (dayOfWeek - 1);
		
		return ((daysBitmap & bitshifted) == bitshifted);
	}
	
}
