package ca.bc.gov.jag.shuber.service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import ca.bc.gov.jag.shuber.persistence.dao.SheriffDAO;
import ca.bc.gov.jag.shuber.persistence.model.Sheriff;

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
	
	@Override
	@Transactional(readOnly=true)
	public Optional<Sheriff> getSheriffByBadgeNo(String badgeNo) {
		Sheriff s = sheriffDao.findByBadgeNo(badgeNo);
		return s != null ? Optional.of(s) : Optional.empty();
	}

	@Override
	public List<Sheriff> getSheriffsByCourthouse(UUID locationId) {
		return sheriffDao.getSheriffsByCourthouse(locationId);
	}
	
}
