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
import org.springframework.hateoas.Resource;
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

import ca.bc.gov.jag.shuber.persistence.model.Shift;
import ca.bc.gov.jag.shuber.persistence.model.projection.SimpleShift;
import ca.bc.gov.jag.shuber.rest.request.ShiftCopyOptions;
import ca.bc.gov.jag.shuber.rest.request.ShiftCreateOptions;
import ca.bc.gov.jag.shuber.service.ScheduleService;

/**
 * 
 * @author michael.gabelmann
 */
@RestController
@RequestMapping(value = SheduleController.PATH, produces = "application/hal+json")
public class SheduleController {
	public static final String PATH = "/api";
	public static final String PATH_COPY_SHIFTS   = "/courthouses/{id}/copyShifts";
	public static final String PATH_CREATE_SHIFTS = "/courthouses/{id}/createShifts";
	public static final String PATH_DELETE_SHIFTS = "/courthouses/{id}/deleteShifts";
	
	/** Logger. */
	private static final Logger log = LogManager.getLogger(SheduleController.class);
	
	@Autowired
	private ScheduleService scheduleService;
	
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
	@PostMapping(path = PATH_COPY_SHIFTS)
	public ResponseEntity<Resources<SimpleShift>> copyShifts(
		@PathVariable("id") UUID courthouseId,
		@RequestBody ShiftCopyOptions copyOptions) {
		
		if (log.isDebugEnabled()) {
			log.debug(String.format("copying shifts for courthouse=%s, copyOptions=%s", courthouseId, copyOptions.toString()));
		}
		
		List<Shift> records = scheduleService.copyShifts(courthouseId, copyOptions);
		
		List<SimpleShift> respRecords = new ArrayList<>();
		for (Shift record : records) {
			respRecords.add(projectionFactory.createProjection(SimpleShift.class, record));
		}
		
		Link self =  new Link(PATH_COPY_SHIFTS.replace("{id}", courthouseId.toString()));
		Resources<SimpleShift> r = new Resources<>(respRecords, self);
		
		return new ResponseEntity<>(r, HttpStatus.OK);
	}
	
	/**
	 * Create shifts for a period of time.
	 * @param courthouseId
	 * @param createOptions
	 * @return
	 */
	@CrossOrigin
	@PostMapping(path = PATH_CREATE_SHIFTS)
	public ResponseEntity<Resources<SimpleShift>> createShifts(
		@PathVariable("id") UUID courthouseId,
		@RequestBody ShiftCreateOptions createOptions) {
		
		if (log.isDebugEnabled()) {
			log.debug(String.format("creating shifts for courthouse=%s, createOptions=%s", courthouseId, createOptions.toString()));
		}
		
		List<Shift> records = scheduleService.createShifts(courthouseId, createOptions);
		
		List<SimpleShift> respRecords = new ArrayList<>();
		for (Shift record : records) {
			respRecords.add(projectionFactory.createProjection(SimpleShift.class, record));
		}
		
		Link self =  new Link(PATH_CREATE_SHIFTS.replace("{id}", courthouseId.toString()));
		Resources<SimpleShift> r = new Resources<>(respRecords, self);
		
		return new ResponseEntity<>(r, HttpStatus.OK);
	}
	
	/**
	 * Delete all shifts for the given date.
	 * @param courthouseId
	 * @param date
	 * @return
	 */
	@CrossOrigin
	@DeleteMapping(path = PATH_DELETE_SHIFTS)
	public ResponseEntity<Resource<Void>> deleteShiftsForDate(
		@PathVariable("id") UUID courthouseId,
		@NotNull @DateTimeFormat(iso = ISO.DATE) @RequestParam("date") LocalDate date) {
		
		if (log.isDebugEnabled()) {
			log.debug(String.format("delete shifts for courthouse=%s, date=%s", courthouseId, date.toString()));
		}
		
		HttpStatus status;
		if (date.isBefore(LocalDate.now())) {
			status = HttpStatus.BAD_REQUEST;
			
		} else {
			status = HttpStatus.OK;
			scheduleService.deleteShiftsForDate(courthouseId, date);
		}
		
		Link self =  new Link(PATH_DELETE_SHIFTS.replace("{id}", courthouseId.toString()));
		Resource<Void> r = new Resource<>(null, self);
		
		return new ResponseEntity<>(r, status);
	}
	
}
