package ca.bc.gov.jag.shuber.service;

import java.util.List;
import java.util.UUID;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import ca.bc.gov.jag.shuber.persistence.dao.ShiftDAO;
import ca.bc.gov.jag.shuber.persistence.model.Shift;

/**
 * 
 * @author michael.gabelmann
 */
@Service
public class JpaShiftService implements ShiftService {
	/** Logger. */
	private static final Logger log = LogManager.getLogger(JpaShiftService.class);
	
	/** Shift repository. */
	private final ShiftDAO shiftDao;
	
	/**
	 * Constructor.
	 * @param shiftDao
	 */
	@Autowired
	public JpaShiftService(ShiftDAO shiftDao) {
		this.shiftDao = shiftDao;
	}
	
	@Override
	@Transactional(readOnly=true)
	public List<Shift> getShiftsByDateRangeAndCourthouse(String startDate, String endDate, UUID locationId) {
		return shiftDao.getShifts(startDate, endDate, locationId);
	}
	
}
