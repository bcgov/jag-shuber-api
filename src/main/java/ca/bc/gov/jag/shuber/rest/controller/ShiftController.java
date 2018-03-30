package ca.bc.gov.jag.shuber.rest.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ca.bc.gov.jag.shuber.service.ShiftService;

/**
 * End point for handling REST services for a Shift.
 * 
 * @author michael.gabelmann
 * @see ca.bc.gov.jag.shuber.persistence.model.Shift
 */
@RestController
@RequestMapping(ShiftController.PATH)
public class ShiftController {
	
	public static final String PATH = "/api/custom";
	public static final String GET_SHIFTSBYDATERANGEANDCOURTHOUSE = "/shifts/search/getByDateRangeAndCourthouse";
	
	@Autowired
	private ShiftService shiftService;
	
	/* NOTE: this class will need to return DTOs since JSON serialization calls get()
	 * which causes an infinte loop in some cases. Adding JSON annotations to stop this
	 * breaks the Spring Data calls in the DAO. Maybe another solution exists...
	 */
	
	/**
	 * Get a set of shifts for the given date range and courthouse.
	 * @param startDate start date
	 * @param endDate end date
	 * @param courthouseId courthouse
	 * @return
	 */
//	@GetMapping(GET_SHIFTSBYDATERANGEANDCOURTHOUSE)
//	public ResponseEntity<List<Shift>> getShiftsByDateRangeAndCourthouse(
//		@DateTimeFormat(iso=ISO.DATE) @RequestParam("startDate") String startDate, 
//		@DateTimeFormat(iso=ISO.DATE) @RequestParam("endDate") String endDate, 
//		@RequestParam("locationId") UUID courthouseId) {
//		
//		List<Shift> records = shiftService.getShiftsByDateRangeAndCourthouse(startDate, endDate, courthouseId);
//		return new ResponseEntity<>(records, HttpStatus.OK);
//	}
	
}
