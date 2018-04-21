package ca.bc.gov.jag.shuber.service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import ca.bc.gov.jag.shuber.persistence.dao.CourthouseDAO;
import ca.bc.gov.jag.shuber.persistence.dao.ShiftDAO;
import ca.bc.gov.jag.shuber.persistence.dao.WorkSectionCodeDAO;
import ca.bc.gov.jag.shuber.persistence.model.Courthouse;
import ca.bc.gov.jag.shuber.persistence.model.Shift;
import ca.bc.gov.jag.shuber.persistence.model.WorkSectionCode;
import ca.bc.gov.jag.shuber.rest.request.ShiftCopyOptions;
import ca.bc.gov.jag.shuber.rest.request.ShiftCreateOptions;
import ca.bc.gov.jag.shuber.util.DateUtil;

/**
 * 
 * @author michael.gabelmann
 */
@Service
public class JpaScheduleService implements ScheduleService {
	/** Logger. */
	private static final Logger log = LogManager.getLogger(JpaScheduleService.class);
	
	private ShiftDAO shiftDao;
	private CourthouseDAO courthouseDao;
	private WorkSectionCodeDAO workSectionCodeDao;
	
	/**
	 * Constructor.
	 * @param shiftDao
	 * @param courthouseDao
	 * @param workSectionCodeDao
	 */
	@Autowired
	public JpaScheduleService(
		ShiftDAO shiftDao, 
		CourthouseDAO courthouseDao, 
		WorkSectionCodeDAO workSectionCodeDao) {
		
		this.shiftDao = shiftDao;
		this.courthouseDao = courthouseDao;
		this.workSectionCodeDao = workSectionCodeDao;
	}

	@Transactional(readOnly = false)
	@Override
	public List<Shift> copyShifts(UUID courthouseId, ShiftCopyOptions options) {
		List<Shift> newShifts = new ArrayList<>();
		
		int numDays = options.getNumDays().intValue() - 1;
		LocalDateTime sourceStartDtm = options.getSourceStartDate().atStartOfDay();
		LocalDateTime sourceEndDtm = DateUtil.atEndOfDay(options.getSourceStartDate().plusDays(numDays));
		
		//get records for period
		List<Shift> existingShifts = shiftDao.getShiftsByCourthouseAndDateTimeRange(courthouseId, sourceStartDtm, sourceEndDtm);
		
		for (Shift shift : existingShifts) {
			long daysOffset = ChronoUnit.DAYS.between(options.getSourceStartDate(), shift.getStartDtm());
			
			LocalDateTime startDtm = options.getDestinationStartDate().plusDays(daysOffset).atTime(shift.getStartDtm().toLocalTime());
			LocalDateTime endDtm = options.getDestinationStartDate().plusDays(daysOffset).atTime(shift.getEndDtm().toLocalTime());
			
			Shift newShift = new Shift();
			newShift.setCourthouse(shift.getCourthouse());
			newShift.setWorkSectionCode(shift.getWorkSectionCode());
			newShift.setStartDtm(startDtm);
			newShift.setEndDtm(endDtm);
			
			if (options.isIncludeSheriffs()) {
				newShift.setSheriff(shift.getSheriff());
			}
			
			if (log.isDebugEnabled()) {
				log.debug(String.format("copy shift %s, (start=%s, end=%s) to (start=%s, end=%s)", shift.getShiftId(), shift.getStartDtm(), shift.getEndDtm(),startDtm, endDtm));
			}
			
			shiftDao.save(newShift);
			newShifts.add(newShift);
		}
		
		return newShifts;
	}

	@Transactional(readOnly = false)
	@Override
	public List<Shift> createShifts(UUID courthouseId, ShiftCreateOptions options) {
		List<Shift> newShifts = new ArrayList<>();
		
		String workSectionCode = this.getId(options.getWorkSectionCode());
		
		Optional<Courthouse> c = courthouseDao.findById(courthouseId);
		Optional<WorkSectionCode> wsc = workSectionCodeDao.findById(workSectionCode);
		
		if (c.isPresent() && wsc.isPresent()) {
			for (int i=0; i < 7; i++) {
				LocalDate d = options.getStartDate().plusDays(i);
				
				if (DateUtil.createForDate(d, options.getDaysBitmap())) {
					for (int j=0; j < options.getNumShifts(); j++) {
						Shift newShift = new Shift();
						newShift.setCourthouse(c.get());
						newShift.setWorkSectionCode(wsc.get());
						newShift.setStartDtm(d.atTime(options.getStartTime()));
						newShift.setEndDtm(d.atTime(options.getEndTime()));
						
						if (log.isDebugEnabled()) {
							log.debug(String.format("create shift for courthouse %s, start=%s, end=%s", courthouseId, newShift.getStartDtm(), newShift.getEndDtm()));
						}
						
						shiftDao.save(newShift);
						newShifts.add(newShift);
					}
				}
			}
			
		} else if (! c.isPresent()) {
			log.warn(String.format("courthouse %s not found", courthouseId.toString()));
			
		} else if (! wsc.isPresent()) {
			log.warn(String.format("work section code %s not found", workSectionCode));
		}
	
		return newShifts;
	}

	@Transactional(readOnly = false)
	@Override
	public void deleteShiftsForDate(UUID courthouseId, LocalDate date) {
		LocalDateTime startOfDay = date.atStartOfDay();
		LocalDateTime endOfDay = DateUtil.atEndOfDay(date);
		
		if (date.isBefore(LocalDate.now())) {
			log.warn(String.format("unable to delete shifts in the past (current=%s, delete=%s)", LocalDate.now(), date));
		
		} else {
			List<Shift> shifts = shiftDao.getShiftsByCourthouseAndDateTimeRange(courthouseId, startOfDay, endOfDay);
			
			for (Shift shift : shifts) {
				if (log.isDebugEnabled()) {
					log.debug(String.format("delete shift %s for %s", shift.getShiftId(), date));
				}
				
				shiftDao.delete(shift);
			}
		}
	}
	
	/**
	 * 
	 * @param idPath
	 * @return
	 */
	private String getId(String idPath) {
		if (idPath.contains("/")) {
			return idPath.substring(idPath.lastIndexOf('/') + 1);
		} else {
			return idPath;
		}
	}
}
