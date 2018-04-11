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
import org.springframework.hateoas.EntityLinks;
import org.springframework.hateoas.Link;
import org.springframework.hateoas.LinkBuilder;
import org.springframework.hateoas.Resources;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import ca.bc.gov.jag.shuber.persistence.model.Courthouse;
import ca.bc.gov.jag.shuber.persistence.model.Duty;
import ca.bc.gov.jag.shuber.persistence.model.projection.SimpleDuty;
import ca.bc.gov.jag.shuber.service.DutyRosterService;

/**
 * 
 * @author michael.gabelmann
 *
 */
@RestController
@RequestMapping(value = DutyRosterController.PATH, produces = "application/hal+json")
public class DutyRosterController {
	public static final String PATH = "/api";
	public static final String PATH_CREATE_DEFAULT_DUTIES = "/courthouses/{id}/createDefaultDuties";

	/** Logger. */
	private static final Logger log = LogManager.getLogger(DutyRosterController.class);
	
	@Autowired
	private DutyRosterService dutyRosterService;
	
	@Autowired
	private ProjectionFactory projectionFactory;
	
	@Autowired
    private EntityLinks entityLinks;
	
	/**
	 * 
	 * @param courthouseId
	 * @param date
	 * @return
	 */
	@PostMapping(path = PATH_CREATE_DEFAULT_DUTIES)
	public ResponseEntity<?> createDefaultDuties(
		@NotNull @PathVariable("id") UUID id, 
		@NotNull @RequestParam("date") LocalDate date) {
		
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
		return new ResponseEntity<Resources<SimpleDuty>>(r, HttpStatus.OK);
	}
	
}
