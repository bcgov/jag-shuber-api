package ca.bc.gov.jag.shuber.persistence.dao;

import java.time.LocalTime;

import org.hibernate.validator.HibernateValidator;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.Errors;
import org.springframework.validation.beanvalidation.LocalValidatorFactoryBean;

import ca.bc.gov.jag.shuber.persistence.model.Assignment;
import ca.bc.gov.jag.shuber.persistence.model.Courthouse;
import ca.bc.gov.jag.shuber.persistence.model.Courtroom;
import ca.bc.gov.jag.shuber.persistence.model.DutyRecurrence;
import ca.bc.gov.jag.shuber.persistence.model.JailRoleCode;
import ca.bc.gov.jag.shuber.persistence.model.JailRoleCode.JAIL_ROLE_CODE;
import ca.bc.gov.jag.shuber.persistence.model.ModelUtil;
import ca.bc.gov.jag.shuber.persistence.model.OtherAssignCode;
import ca.bc.gov.jag.shuber.persistence.model.OtherAssignCode.OTHER_ASSIGN_CODE;
import ca.bc.gov.jag.shuber.persistence.model.Region;
import ca.bc.gov.jag.shuber.persistence.model.Run;
import ca.bc.gov.jag.shuber.persistence.model.WorkSectionCode;
import ca.bc.gov.jag.shuber.persistence.model.WorkSectionCode.WORK_SECTION_CODE;
import ca.bc.gov.jag.shuber.rest.validation.AssignmentCreateOrSaveValidator;

/**
 * 
 * @author michael.gabelmann
 */
public class AssignmentDAOTest extends AbstractDAOTest {
	@Autowired
	private AssignmentDAO assignmentDao;

	private WorkSectionCode wsc1;
	private WorkSectionCode wsc2;
	private WorkSectionCode wsc3;
	private WorkSectionCode wsc4;
	private Region r;
	private Courthouse c;
	private Courtroom cr;
	
	private AssignmentCreateOrSaveValidator validator;
	
	@BeforeEach
	@Override
	protected void beforeTest() {
		wsc1 = ModelUtil.getWorkSectionCode(WORK_SECTION_CODE.COURTS.name(), "Courts", nowDate);
		wsc2 = ModelUtil.getWorkSectionCode(WORK_SECTION_CODE.JAIL.name(), "Jails", nowDate);
		wsc3 = ModelUtil.getWorkSectionCode(WORK_SECTION_CODE.ESCORTS.name(), "Escorts", nowDate);
		wsc4 = ModelUtil.getWorkSectionCode(WORK_SECTION_CODE.OTHER.name(), "Other", nowDate);
		
		r = ModelUtil.getRegion("VANISLAND", "Vancourver Island");
		c = ModelUtil.getCourthouse(r, "VIC", "Victoria");
		cr = ModelUtil.getCourtroom(c, "101", "Room 101");
		
		entityManager.persist(wsc1);
		entityManager.persist(wsc2);
		entityManager.persist(wsc3);
		entityManager.persist(wsc4);
		entityManager.persist(r);
		entityManager.persist(c);
		entityManager.persist(cr);
		entityManager.flush();
		
		LocalValidatorFactoryBean lvfb = new LocalValidatorFactoryBean();
		lvfb.afterPropertiesSet();
		lvfb.setProviderClass(HibernateValidator.class);
		
		validator = new AssignmentCreateOrSaveValidator(assignmentDao, lvfb);
	}

	@AfterEach
	@Override
	protected void afterTest() {
		;
	}

	@Test
	@DisplayName("Saving an assignment of type COURTS requires a courtroom")
	public void test1_save() {
		Assignment a = ModelUtil.getAssignment(c, wsc1, "Pirates vs. Ninjas");
		
		Errors errors = new CustomErrors("Assignment");
		validator.validate(a, errors);
		
		Assertions.assertEquals(1, errors.getFieldErrors().size());
		Assertions.assertEquals("courtroom", errors.getFieldError().getField());
	}
	
	@Test
	@DisplayName("Saving an assignment of type COURTS")
	public void test2_save() {
		Assignment a = ModelUtil.getAssignment(c, wsc1, "Pirates vs. Ninjas");
		a.setCourtroom(cr);
		
		Errors errors = new CustomErrors("Assignment");
		validator.validate(a, errors);
		Assertions.assertEquals(0, errors.getFieldErrors().size());
		
		assignmentDao.save(a);
		Assertions.assertNotNull(a.getAssignmentId());
	}
	
	@Test
	@DisplayName("Saving an assignment of type JAIL requires a JailRoleCode")
	public void test3_save() {
		Assignment a = ModelUtil.getAssignment(c, wsc2, "Pirates vs. Ninjas");
		
		Errors errors = new CustomErrors("Assignment");
		validator.validate(a, errors);
		
		Assertions.assertEquals(1, errors.getFieldErrors().size());
		Assertions.assertEquals("jailRoleCode", errors.getFieldError().getField());
	}
	
	@Test
	@DisplayName("Saving an assignment of type JAIL")
	public void test4_save() {
		Assignment a = ModelUtil.getAssignment(c, wsc2, "Pirates vs. Ninjas");
		
		JailRoleCode jrc = ModelUtil.getJailRoleCode(JAIL_ROLE_CODE.CONTROL.name(), "control", nowDate);
		a.setJailRoleCode(jrc);
		
		Errors errors = new CustomErrors("Assignment");
		validator.validate(a, errors);
		Assertions.assertEquals(0, errors.getFieldErrors().size());
		
		assignmentDao.save(a);
		Assertions.assertNotNull(a.getAssignmentId());
	}
	
	@Test
	@DisplayName("Saving an assignment of type ESCORTS requires a Run")
	public void test5_save() {
		Assignment a = ModelUtil.getAssignment(c, wsc3, "Pirates vs. Ninjas");
		
		Errors errors = new CustomErrors("Assignment");
		validator.validate(a, errors);
		
		Assertions.assertEquals(1, errors.getFieldErrors().size());
		Assertions.assertEquals("run", errors.getFieldError().getField());
	}
	
	@Test
	@DisplayName("Saving an assignment of type ESCORTS")
	public void test6_save() {
		Assignment a = ModelUtil.getAssignment(c, wsc3, "Pirates vs. Ninjas");
		
		Run run = ModelUtil.getRun(c, "run1");
		a.setRun(run);
		
		Errors errors = new CustomErrors("Assignment");
		validator.validate(a, errors);
		Assertions.assertEquals(0, errors.getFieldErrors().size());
		
		assignmentDao.save(a);
		Assertions.assertNotNull(a.getAssignmentId());
	}
	
	//TODO: OTHER validation error
	//TODO: OTHER save
	@Test
	@DisplayName("Saving an assignment of type OTHER requires an OtherAssignCode")
	public void test7_save() {
		Assignment a = ModelUtil.getAssignment(c, wsc4, "Pirates vs. Ninjas");
		
		Errors errors = new CustomErrors("Assignment");
		validator.validate(a, errors);
		
		Assertions.assertEquals(1, errors.getFieldErrors().size());
		Assertions.assertEquals("otherAssignCode", errors.getFieldError().getField());
	}
	
	@Test
	@DisplayName("Saving an assignment of type OTHER")
	public void test8_save() {
		Assignment a = ModelUtil.getAssignment(c, wsc4, "Pirates vs. Ninjas");
		
		OtherAssignCode oac = ModelUtil.getOtherAssignCode(OTHER_ASSIGN_CODE.GATE1.name(), "Gate 1", nowDate);
		a.setOtherAssignCode(oac);
		
		Errors errors = new CustomErrors("Assignment");
		validator.validate(a, errors);
		Assertions.assertEquals(0, errors.getFieldErrors().size());
		
		assignmentDao.save(a);
		Assertions.assertNotNull(a.getAssignmentId());
	}
	
	@Test
	@DisplayName("Save an assignment with recurrences")
	public void test1_saveAssignmentWithChildren() {
		Assignment a = ModelUtil.getAssignment(c, wsc1, "Pirates vs. Ninjas");
		a.setCourtroom(cr);
		
		DutyRecurrence dr1 = ModelUtil.getDutyRecurrence(null, LocalTime.MIDNIGHT, LocalTime.NOON, 31L, (byte) 1);
		a.getDutyRecurrences().add(dr1);
		
		Errors errors = new CustomErrors("Assignment");
		validator.validate(a, errors);
		Assertions.assertEquals(0, errors.getFieldErrors().size());
		
		assignmentDao.save(a);
		Assertions.assertNotNull(a.getAssignmentId());
		
		Assignment tmp = assignmentDao.getOne(a.getAssignmentId());
		Assertions.assertNotNull(tmp);
		Assertions.assertEquals(1, tmp.getDutyRecurrences().size());
	}
	
}
