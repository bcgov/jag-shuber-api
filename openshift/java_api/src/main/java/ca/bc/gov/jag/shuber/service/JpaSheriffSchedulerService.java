package ca.bc.gov.jag.shuber.service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Order;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import ca.bc.gov.jag.shuber.persistence.dao.SheriffDAO;
import ca.bc.gov.jag.shuber.persistence.model.Sheriff;

/**
 * 
 * @author michael.gabelmann
 */
@Service
public class JpaSheriffSchedulerService implements SheriffSchedulerService {
	/** Logger. */
	private static final Logger log = LogManager.getLogger(JpaSheriffSchedulerService.class);

	/** Sheriff repository. */
	private final SheriffDAO sheriffDao;
	
	/**
	 * Constructor.
	 * @param sheriffDao
	 */
	@Autowired
	public JpaSheriffSchedulerService(SheriffDAO sheriffDao) {
		this.sheriffDao = sheriffDao;
	}
	
	@Override
	@Transactional(readOnly=true)
	public List<Sheriff> getSheriffs() {
		return sheriffDao.findAll();
	}
	
	@Override
	@Transactional(readOnly=true)
	public List<Sheriff> getSheriffsSortedByName() {
		return sheriffDao.findAll(Sort.by(Order.asc("name")));
	}

	@Override
	@Transactional(readOnly=true)
	public Optional<Sheriff> getSheriffById(UUID id) {
		return sheriffDao.findById(id);
	}

	@Override
	@Transactional(readOnly=true)
	public Sheriff getSheriffByBadgeNo(String badgeNo) {
		return sheriffDao.findByBadgeNo(badgeNo);
	}
	
	@Override
	@Transactional(readOnly=false)
	public Sheriff createSheriff(Sheriff sheriff) {
		return sheriffDao.save(sheriff);
	}

	@Override
	@Transactional(readOnly=false)
	public void deleteSheriff(Sheriff sheriff) {
		sheriffDao.delete(sheriff);
	}
	
}
