package ca.bc.gov.jag.shuber.rest.controller;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import javax.validation.constraints.NotNull;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.Link;
import org.springframework.hateoas.Resource;
import org.springframework.hateoas.Resources;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import ca.bc.gov.jag.shuber.persistence.model.Duty;
import ca.bc.gov.jag.shuber.service.DutyRosterService;

/**
 * 
 * @author michael.gabelmann
 *
 */
@RestController
@RequestMapping(value = DutyRosterController.PATH, produces = "application/hal+json")
public class DutyRosterController {
	public static final String PATH = "/api/custom";
	public static final String PATH_CREATE_DEFAULT_DUTIES = "/courthouses/{courthouseId}/createDefaultDuties";

	/** Logger. */
	private static final Logger log = LogManager.getLogger(DutyRosterController.class);
	
	@Autowired
	private DutyRosterService dutyRosterService;
	
	
	/**
	 * 
	 * @param courthouseId
	 * @param date
	 * @return
	 */
	@PostMapping(path = PATH_CREATE_DEFAULT_DUTIES)
	public ResponseEntity<?> createDefaultDuties(
		@PathVariable("courthouseId") UUID courthouseId, 
		@NotNull @RequestParam("date") LocalDate date) {
		
		if (log.isDebugEnabled()) {
			log.debug("creating default duties for courthouse " + courthouseId + " and date " + date);
		}
		
		List<Duty> duties = dutyRosterService.createDefaultDuties(courthouseId, date);
		List<Resource<Duty>> records = new ArrayList<Resource<Duty>>();
		
		for (Duty duty : duties) {
			Resource<Duty> r1 = new Resource<>(duty, new Link("/api" + duty.getIdPath()));
			records.add(r1);
		}
		
		Resources<Resource<Duty>> r = new Resources<>(records, new Link(PATH + PATH_CREATE_DEFAULT_DUTIES));
		return new ResponseEntity<Resources<Resource<Duty>>>(r, HttpStatus.OK);
	}
	
}
