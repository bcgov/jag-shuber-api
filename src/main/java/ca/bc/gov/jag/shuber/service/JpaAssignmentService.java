package ca.bc.gov.jag.shuber.service;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import ca.bc.gov.jag.shuber.persistence.dao.AssignmentDAO;
import ca.bc.gov.jag.shuber.persistence.dao.DutyRecurrenceDAO;
import ca.bc.gov.jag.shuber.persistence.model.Assignment;

@Service
public class JpaAssignmentService implements AssignmentService {
	/** Logger. */
	private static final Logger log = LogManager.getLogger(JpaAssignmentService.class);

	/** Assignment repository. */
	private final AssignmentDAO assignmentDao;
	
	/** DutyRecurrence repository. */
	private final DutyRecurrenceDAO dutyRecurrenceDao;
	
	
	/**
	 * Constructor.
	 * @param sheriffDao
	 */
	@Autowired
	public JpaAssignmentService(AssignmentDAO assignmentDao, DutyRecurrenceDAO dutyRecurrenceDao) {
		this.assignmentDao = assignmentDao;
		this.dutyRecurrenceDao = dutyRecurrenceDao;
	}
	
	@Transactional(readOnly=false)
	public Assignment createAssignment(Assignment assignment) {
		assignmentDao.save(assignment);
		return assignment;
	}
	
}
