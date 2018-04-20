package ca.bc.gov.jag.shuber.rest.controller;

import java.time.LocalDate;
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
import org.springframework.hateoas.Resources;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import ca.bc.gov.jag.shuber.persistence.model.projection.SimpleShift;
import ca.bc.gov.jag.shuber.rest.request.ShiftCopyOptions;
import ca.bc.gov.jag.shuber.rest.request.ShiftCreateOptions;

/**
 * 
 * @author michael.gabelmann
 */
@RestController
@RequestMapping(value = SheduleController.PATH, produces = "application/hal+json")
public class SheduleController {
	public static final String PATH = "/api";
	
	/** Logger. */
	private static final Logger log = LogManager.getLogger(SheduleController.class);
	
	//@Autowired
	//private DutyRosterService dutyRosterService;
	
	@Autowired
    private EntityLinks entityLinks;
	
	private ProjectionFactory projectionFactory = new SpelAwareProxyProjectionFactory();
	
	
	/**
	 * Copy shifts from a previous period.
	 * @param courthouseId
	 * @param copyOptions
	 * @return
	 */
	@CrossOrigin
	@PostMapping(path = "/courthouses/{id}/copyShifts")
	public ResponseEntity<Resources<SimpleShift>> copyShifts(
		@PathVariable("id") UUID courthouseId,
		@RequestBody ShiftCopyOptions copyOptions) {
		
		if (log.isDebugEnabled()) {
			log.debug(String.format("copying shifts for courthouse=%s, copyOptions=%s", courthouseId, copyOptions.toString()));
		}
		
		//TODO: call service to do work
		
		
		return new ResponseEntity<>(null, HttpStatus.OK);
	}
	
	/**
	 * Create shifts for a period of time.
	 * @param courthouseId
	 * @param createOptions
	 * @return
	 */
	@CrossOrigin
	@PostMapping(path = "/courthouses/{id}/createShifts")
	public ResponseEntity<Resources<SimpleShift>> createShifts(
		@PathVariable("id") UUID courthouseId,
		@RequestBody ShiftCreateOptions createOptions) {
		
		if (log.isDebugEnabled()) {
			log.debug(String.format("creating shifts for courthouse=%s, createOptions=%s", courthouseId, createOptions.toString()));
		}
		
		//TODO: call service to do work
		
		return new ResponseEntity<>(null, HttpStatus.OK);
	}
	
	/**
	 * Delete all shifts for the given date.
	 * @param courthouseId
	 * @param date
	 * @return
	 */
	@CrossOrigin
	@DeleteMapping(path = "/courthouses/{id}/deleteShifts")
	public ResponseEntity<Resources<Void>> deleteShiftsForDate(
		@PathVariable("id") UUID courthouseId,
		@NotNull @DateTimeFormat(iso = ISO.DATE) @RequestParam("date") LocalDate date) {
		
		if (log.isDebugEnabled()) {
			log.debug(String.format("delete shifts for courthouse=%s, date=%s", courthouseId, date.toString()));
		}
		
		//TODO: call service to do work
		
		return new ResponseEntity<>(null, HttpStatus.OK);
	}
	
}
