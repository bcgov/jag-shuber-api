package ca.bc.gov.jag.shuber.rest.controller;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import javax.validation.constraints.NotNull;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.projection.ProjectionFactory;
import org.springframework.data.projection.SpelAwareProxyProjectionFactory;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.format.annotation.DateTimeFormat.ISO;
import org.springframework.hateoas.EntityLinks;
import org.springframework.hateoas.Link;
import org.springframework.hateoas.LinkBuilder;
import org.springframework.hateoas.Resources;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.Nullable;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import ca.bc.gov.jag.shuber.persistence.model.Assignment;
import ca.bc.gov.jag.shuber.persistence.model.Courthouse;
import ca.bc.gov.jag.shuber.persistence.model.Duty;
import ca.bc.gov.jag.shuber.persistence.model.DutyRecurrence;
import ca.bc.gov.jag.shuber.persistence.model.projection.SimpleDuty;
import ca.bc.gov.jag.shuber.service.DutyRosterService;



/**
 * 
 * @author michael.gabelmann
 */
@RestController
@RequestMapping(value = DutyRosterController.PATH, produces = "application/hal+json")
public class DutyRosterController {
	public static final String PATH = "/api";
	public static final String PATH_CREATE_DEFAULT_DUTIES = "/courthouses/{id}/createDefaultDuties";
	public static final String PATH_DELETE_ASSIGNMENT = "/assignments/{id}/expire";
	public static final String PATH_DELETE_DUTY_RECURRENCE = "/dutyRecurrences/{id}/expire";

	/** Logger. */
	private static final Logger log = LogManager.getLogger(DutyRosterController.class);
	
	@Autowired
	private DutyRosterService dutyRosterService;
	
	@Autowired
    private EntityLinks entityLinks;
	
	private ProjectionFactory projectionFactory = new SpelAwareProxyProjectionFactory();
	
	
	/**
	 * Create a set of default duties for the given courthouse and date.
	 * @param id courthouse id
	 * @param date create entries for this date
	 * @return list of duties and sheriff duties created
	 */
	@CrossOrigin
	@PostMapping(path = PATH_CREATE_DEFAULT_DUTIES)
	public ResponseEntity<Resources<SimpleDuty>> createDefaultDuties(
		@NotNull @PathVariable("id") UUID id, 
		@NotNull @DateTimeFormat(iso = ISO.DATE) @RequestParam("date") LocalDate date) {
		
		if (log.isDebugEnabled()) {
			log.debug("creating default duties for courthouse " + id + " and date " + date);
		}
		
		List<Duty> duties = dutyRosterService.createDefaultDuties(id, date);
		List<SimpleDuty> records = new ArrayList<SimpleDuty>();
		
		for (Duty duty : duties) {
			records.add(projectionFactory.createProjection(SimpleDuty.class, duty));
		}
		
		LinkBuilder lb = entityLinks.linkFor(Courthouse.class);
		Link self =  new Link(lb.toString() + "/" + id + "/createDefaultDuties?date=" + date);
		
		Resources<SimpleDuty> r = new Resources<>(records, self);
		return new ResponseEntity<Resources<SimpleDuty>>(r, HttpStatus.CREATED);
	}

	/**
	 * 
	 * @param id
	 * @return
	 */
	@CrossOrigin
	@DeleteMapping(path = PATH_DELETE_ASSIGNMENT)
	public ResponseEntity<Assignment> expireAssignment(
		@NotNull @PathVariable("id") UUID id,
		@Nullable @DateTimeFormat(iso = ISO.DATE) @RequestParam("expiryDate") LocalDate date) {
		
		if (log.isDebugEnabled()) {
			log.debug("expire assignment " + id.toString());
		}
		
		if (date == null) date = LocalDate.now();
		
		boolean state = dutyRosterService.expireAssignment(id, date);
		HttpStatus status = state ? HttpStatus.NO_CONTENT : HttpStatus.METHOD_NOT_ALLOWED;
		
		return new ResponseEntity<Assignment>(status);
	}
	
	/**
	 * 
	 * @param id
	 * @return
	 */
	@CrossOrigin
	@DeleteMapping(path = PATH_DELETE_DUTY_RECURRENCE)
	public ResponseEntity<DutyRecurrence> expireDutyRecurrence(
		@NotNull @PathVariable("id") UUID id,
		@Nullable @DateTimeFormat(iso = ISO.DATE) @RequestParam("expiryDate") LocalDate date) {
		
		if (log.isDebugEnabled()) {
			log.debug("expire duty recurrence " + id.toString());
		}
		
		if (date == null) date = LocalDate.now();
		
		boolean state = dutyRosterService.expireDutyRecurrence(id, date);
		HttpStatus status = state ? HttpStatus.NO_CONTENT : HttpStatus.METHOD_NOT_ALLOWED;
		
		return new ResponseEntity<DutyRecurrence>(status);
	}

}
