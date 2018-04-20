package ca.bc.gov.jag.shuber.service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import ca.bc.gov.jag.shuber.persistence.dao.ShiftDAO;
import ca.bc.gov.jag.shuber.persistence.model.Shift;
import ca.bc.gov.jag.shuber.rest.request.ShiftCopyOptions;
import ca.bc.gov.jag.shuber.rest.request.ShiftCreateOptions;

/**
 * 
 * @author michael.gabelmann
 */
@Service
public class JpaScheduleService implements ScheduleService {
	/** Logger. */
	private static final Logger log = LogManager.getLogger(JpaScheduleService.class);
	
	private ShiftDAO shiftDao;
	
	/**
	 * Constructor.
	 * @param shiftDao
	 */
	@Autowired
	public JpaScheduleService(ShiftDAO shiftDao) {
		this.shiftDao = shiftDao;
	}

	@Transactional(readOnly = false)
	@Override
	public List<Shift> copyShifts(ShiftCopyOptions options) {
		// TODO Auto-generated method stub
		return new ArrayList<Shift>();
	}

	@Transactional(readOnly = false)
	@Override
	public List<Shift> createShifts(ShiftCreateOptions options) {
		// TODO Auto-generated method stub
		return new ArrayList<Shift>();
	}

	@Transactional(readOnly = false)
	@Override
	public void deleteShiftsForDate(LocalDate date) {
		// TODO Auto-generated method stub
	}
	
}
