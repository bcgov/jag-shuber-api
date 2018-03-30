package ca.bc.gov.jag.shuber.service;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ca.bc.gov.jag.shuber.persistence.dao.SheriffDAO;

/**
 * 
 * @author michael.gabelmann
 */
@Service
public class JpaSheriffService implements SheriffService {
	/** Logger. */
	private static final Logger log = LogManager.getLogger(JpaSheriffService.class);

	/** Sheriff repository. */
	private final SheriffDAO sheriffDao;
	
	/**
	 * Constructor.
	 * @param sheriffDao
	 */
	@Autowired
	public JpaSheriffService(SheriffDAO sheriffDao) {
		this.sheriffDao = sheriffDao;
	}
	
}
