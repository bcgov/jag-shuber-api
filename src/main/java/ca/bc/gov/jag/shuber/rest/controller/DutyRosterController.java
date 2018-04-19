package ca.bc.gov.jag.shuber.rest.controller;

import java.time.LocalDate;
import java.time.LocalDateTime;
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
import org.springframework.hateoas.Resource;
import org.springframework.hateoas.Resources;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.Nullable;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import ca.bc.gov.jag.shuber.persistence.model.Assignment;
import ca.bc.gov.jag.shuber.persistence.model.Courthouse;
import ca.bc.gov.jag.shuber.persistence.model.Duty;
import ca.bc.gov.jag.shuber.persistence.model.DutyRecurrence;
import ca.bc.gov.jag.shuber.persistence.model.projection.SimpleAssignment;
import ca.bc.gov.jag.shuber.persistence.model.projection.SimpleDuty;
import ca.bc.gov.jag.shuber.persistence.model.projection.SimpleDutyRecurrence;
import ca.bc.gov.jag.shuber.rest.request.ExpiryDate;
import ca.bc.gov.jag.shuber.service.DutyRosterService;
import ca.bc.gov.jag.shuber.util.DateUtil;



/**
 * 
 * @author michael.gabelmann
 */
@RestController
@RequestMapping(value = DutyRosterController.PATH, produces = "application/hal+json")
public class DutyRosterController {
	public static final String PATH = "/api";
	public static final String PATH_CREATE_DEFAULT_DUTIES = "/courthouses/{id}/createDefaultDuties";
	public static final String PATH_EXPIRE_ASSIGNMENT = "/assignments/{id}/expire";
	public static final String PATH_EXPIRE_DUTY_RECURRENCE = "/dutyRecurrences/{id}/expire";
	public static final String PATH_GET_DUTIES_BY_COURTHOUSE_AND_DATERANGE = "/courthouses/{id}/getDutiesByDateRange";

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
		@PathVariable("id") UUID id, 
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
		return new ResponseEntity<>(r, HttpStatus.CREATED);
	}

	/**
	 * 
	 * @param id
	 * @return
	 */
	@CrossOrigin
	@PatchMapping(path = PATH_EXPIRE_ASSIGNMENT)
	public ResponseEntity<Resource<SimpleAssignment>> expireAssignment(
		@PathVariable("id") UUID id,
		@Nullable @RequestBody ExpiryDate e) {
		
		if (log.isDebugEnabled()) {
			log.debug("expire assignment " + id.toString());
		}
		
		LocalDate expiryDate = e == null || e.getExpiryDate() == null ? LocalDate.now() : e.getExpiryDate();
		Assignment a = dutyRosterService.expireAssignment(id, expiryDate);
		SimpleAssignment a2 = projectionFactory.createNullableProjection(SimpleAssignment.class, a);
		
		Resource<SimpleAssignment> respObj = new Resource<>(a2);
		HttpStatus status = a == null ? HttpStatus.NOT_FOUND : HttpStatus.OK;
		
		return new ResponseEntity<>(respObj, status);
	}
	
	/**
	 * Set expiry date on duty recurrence.
	 * @param id duty recurrence id
	 * @return 
	 */
	@CrossOrigin
	@PatchMapping(path = PATH_EXPIRE_DUTY_RECURRENCE)
	public ResponseEntity<Resource<SimpleDutyRecurrence>> expireDutyRecurrence(
		@PathVariable("id") UUID id,
		@Nullable @RequestBody ExpiryDate e) {
		
		if (log.isDebugEnabled()) {
			log.debug("expire duty recurrence " + id.toString());
		}
		
		LocalDate expiryDate = e == null || e.getExpiryDate() == null ? LocalDate.now() : e.getExpiryDate();
		DutyRecurrence dr = dutyRosterService.expireDutyRecurrence(id, expiryDate);
		SimpleDutyRecurrence dr2 = projectionFactory.createNullableProjection(SimpleDutyRecurrence.class, dr);
		
		Resource<SimpleDutyRecurrence> respObj = new Resource<>(dr2);
		HttpStatus status = dr == null ? HttpStatus.NOT_FOUND : HttpStatus.OK;
		
		return new ResponseEntity<>(respObj, status);
	}

	@CrossOrigin
	@GetMapping(path = PATH_GET_DUTIES_BY_COURTHOUSE_AND_DATERANGE)
	public ResponseEntity<Resources<SimpleDuty>> getDutiesByCourthouseAndDateRange(
		@PathVariable("id") UUID courthouseId,
		@NotNull @DateTimeFormat(iso = ISO.DATE) @RequestParam("startDate") LocalDate startDate,
		@Nullable @DateTimeFormat(iso = ISO.DATE) @RequestParam("endDate") LocalDate endDate) {
		
		LocalDateTime startDtm = startDate.atStartOfDay();
		LocalDateTime endDtm = endDate == null ? DateUtil.atEndOfDay(startDate) : DateUtil.atEndOfDay(endDate);
		
		List<Duty> duties = dutyRosterService.getDutiesByCourthouseAndDateRange(courthouseId, startDtm, endDtm);
		
		List<SimpleDuty> records = new ArrayList<>();
		for (Duty duty : duties) {
			records.add(projectionFactory.createProjection(SimpleDuty.class, duty));
		}
		
		LinkBuilder lb = entityLinks.linkFor(Courthouse.class);
		Link self =  new Link(lb.toString() + "/" + courthouseId + "/getDutiesByDateRange?startDate=" + startDate + (endDate != null ? "&endDate=" + endDate : ""));
		
		Resources<SimpleDuty> r = new Resources<>(records, self);
		return new ResponseEntity<>(r, HttpStatus.OK);
	}
	
}
