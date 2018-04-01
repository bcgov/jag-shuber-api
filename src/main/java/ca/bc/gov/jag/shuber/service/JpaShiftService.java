package ca.bc.gov.jag.shuber.service;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Service;

/**
 * 
 * @author michael.gabelmann
 */
@Service
public class JpaShiftService implements ShiftService {
	/** Logger. */
	private static final Logger log = LogManager.getLogger(JpaShiftService.class);
	
//	/** Shift repository. */
//	private final ShiftDAO shiftDao;
//	
//	/**
//	 * Constructor.
//	 * @param shiftDao
//	 */
//	@Autowired
//	public JpaShiftService(ShiftDAO shiftDao) {
//		this.shiftDao = shiftDao;
//	}
	
}
