package ca.bc.gov.jag.shuber.service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.ExampleMatcher;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import ca.bc.gov.jag.shuber.persistence.dao.AssignmentDAO;
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
	
	private AssignmentDAO assignmentDao;
	
	
	/**
	 * 
	 * @param dutyRecurrenceDao
	 * @param dutyDao
	 */
	@Autowired
	public JpaDutyRosterService(
		AssignmentDAO assignmentDao, 
		DutyRecurrenceDAO dutyRecurrenceDao, 
		DutyDAO dutyDao) {
		
		this.assignmentDao = assignmentDao;
		this.dutyRecurrenceDao = dutyRecurrenceDao;
		this.dutyDao = dutyDao;
	}
	
	@Transactional(readOnly = false)
	@Override
	public List<Duty> createDefaultDuties(UUID courthouseId, LocalDate date) {
		List<Duty> duties = new ArrayList<>();
		List<DutyRecurrence> recurrences = dutyRecurrenceDao.getDutyRecurrences(courthouseId, date);
		
		for (DutyRecurrence dutyRecurrence : recurrences) {
			if (createForDate(date, dutyRecurrence.getDaysBitmap())) {
				LocalDateTime start = dutyRecurrence.getStartTime().atDate(date);
				LocalDateTime end = dutyRecurrence.getEndTime().atDate(date);
				
				long count = this.getExistingDutyCount(dutyRecurrence.getDutyRecurrenceId(), start, end);
					
				if (count > 0) {
					if (log.isDebugEnabled()) {
						log.debug("skipping creation of duty for duty recurrence " + dutyRecurrence.getDutyRecurrenceId() + ", count=" + count);
					}
					continue;
				}
				
				//only create a duty and sheriff duties if day of week matches
				Duty d = new Duty(null, dutyRecurrence.getAssignment(), dutyRecurrence, start, end, dutyRecurrence.getSheriffsRequired(), null, null, null, null, 0L, null);
				
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
	
	@Transactional(readOnly = false)
	@Override
	public boolean expireAssignment(UUID assignmentId, LocalDate date) {
		Optional<Assignment> tmp = assignmentDao.findById(assignmentId);
		
		if (! tmp.isPresent()) {
			return false;
		}
		
		Assignment a = tmp.get();
		if (date == null) date = LocalDate.now();
		if (date.isBefore(a.getEffectiveDate())) {
			a.setExpiryDate(a.getEffectiveDate());
			
		} else {
			a.setExpiryDate(date);
		}

		assignmentDao.save(a);
		
		List<DutyRecurrence> records = a.getDutyRecurrences();
		for (DutyRecurrence dr : records) {
			if (date.isBefore(dr.getEffectiveDate())) {
				dr.setExpiryDate(dr.getEffectiveDate());
				
			} else {
				dr.setExpiryDate(date);
			}
			
			dutyRecurrenceDao.save(dr);
		}
		
		return true;
	}

	@Transactional(readOnly = false)
	@Override
	public boolean expireDutyRecurrence(UUID dutyRecurrenceId, LocalDate date) {
		Optional<DutyRecurrence> tmp = dutyRecurrenceDao.findById(dutyRecurrenceId);
		
		if (! tmp.isPresent()) {
			return false;
		}
		
		DutyRecurrence dr = tmp.get();
		if (date == null) date = LocalDate.now();
		if (date.isBefore(dr.getEffectiveDate())) {
			dr.setExpiryDate(dr.getEffectiveDate());
			
		} else {
			dr.setExpiryDate(date);
		}
		
		dr.setExpiryDate(date);
		dutyRecurrenceDao.save(dr);
		
		return true;
	}

	/**
	 * 
	 * @param dutyRecurrenceId
	 * @param start
	 * @param end
	 * @return
	 */
	long getExistingDutyCount(UUID dutyRecurrenceId, LocalDateTime start, LocalDateTime end) {
		//find count of existing records
		DutyRecurrence tmpDr = new DutyRecurrence();
		tmpDr.setDutyRecurrenceId(dutyRecurrenceId);
		
		Duty tmpD = new Duty();
		tmpD.setDutyRecurrence(tmpDr);
		tmpD.setStartDtm(start);
		tmpD.setEndDtm(end);
		
		/* ignore primitive values since they are never null, you need to be careful
		 * with naming as the current entity doesn't need to be prefixed, but children do
		 */
		Example<Duty> example = Example.of(tmpD, ExampleMatcher.matching()
			.withIgnorePaths("dutyRecurrence.sheriffsRequired", "dutyRecurrence.daysBitmap", "dutyRecurrence.revisionCount", "sheriffsRequired", "revisionCount")
			.withIgnoreNullValues());
		
		return dutyDao.count(example);
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
