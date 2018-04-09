package ca.bc.gov.jag.shuber.rest.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ca.bc.gov.jag.shuber.service.SheriffService;

/**
 * End point for handling REST services for a Sheriff.
 * 
 * @author michael.gabelmann
 * @see ca.bc.gov.jag.shuber.persistence.model.Sheriff
 */
@RestController
@RequestMapping(SheriffController.PATH)
public class SheriffController {
	
	public static final String PATH = "/api/custom";
	public static final String GET_SHERIFFBYBADGENO = "/sheriffs/search/getByBadgeNo";
	public static final String GET_SHERIFFBYCOURTHOUSE = "/sheriffs/search/getByCourthouse";
	
	@Autowired
	private SheriffService sheriffService;
	
	/* NOTE: this class will need to return DTOs since JSON serialization calls get()
	 * which causes an infinte loop in some cases. Adding JSON annotations to stop this
	 * breaks the Spring Data calls in the DAO. Maybe another solution exists...
	 */
	
//	/**
//	 * Search for a Sheriff by their badge number.
//	 * @param badgeNo badge number
//	 * @return record
//	 */
//	@GetMapping(GET_SHERIFFBYBADGENO)
//	public ResponseEntity<Sheriff> getSheriffByBadgeNo(@RequestParam(value="badgeNo") String badgeNo) {
//		Optional<Sheriff> s = sheriffService.getSheriffByBadgeNo(badgeNo);
//		
//		if (s.isPresent()) {
//			return new ResponseEntity<>(s.get(), HttpStatus.OK);
//			
//		} else {
//			return ResponseEntity.notFound().build();
//		}
//	}
//	
//	/**
//	 * Get sheriffs at a given courthouse.
//	 * @param courthouseId
//	 * @return records
//	 */
//	@GetMapping(GET_SHERIFFBYCOURTHOUSE)
//	public ResponseEntity<List<Sheriff>> getSheriffByCourthouse(@RequestParam(value="locationId") UUID locationId) {
//		List<Sheriff> records = sheriffService.getSheriffsByCourthouse(locationId);
//		return new ResponseEntity<>(records, HttpStatus.OK);
//	}
	
	/*
	@PostMapping("/sheriffs")
    public ResponseEntity<Sheriff> createSheriff(@Valid @RequestBody Sheriff record) {
        
        Sheriff sheriff = new Sheriff();
        sheriff.setBadgeNo(record.getBadgeNo());
        sheriff.setUserid(record.getUserid());
        sheriff.setLastName(record.getLastName());
        sheriff.setFirstName(record.getFirstName());
        sheriff.setRank(record.getRank());
        
        sheriff = sheriffSchedulerService.createSheriff(sheriff);
        return ResponseEntity.ok(sheriff);
    }

    @GetMapping("/sheriffs/{id}")
    public ResponseEntity<Sheriff> getSheriff(@PathVariable(value="id") String id) {
        Optional<Sheriff> record = sheriffSchedulerService.getSheriffById(UUID.fromString(id));
        
        if (record.isPresent()) {
            return new ResponseEntity<>(record.get(), HttpStatus.OK);
            
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    
    @PutMapping("/sheriffs/{id}")
    public ResponseEntity<Sheriff> updateSheriff(
        @PathVariable(value="id") String id,
        @Valid @RequestBody Sheriff record) {
        
        Optional<Sheriff> op = sheriffSchedulerService.getSheriffById(UUID.fromString(id));
        
        if (!op.isPresent()) {
            return ResponseEntity.notFound().build();
        }
        
        Sheriff sheriff = op.get();
        sheriff.setBadgeNo(record.getBadgeNo());
        sheriff.setUserid(record.getUserid());
        sheriff.setLastName(record.getLastName());
        sheriff.setFirstName(record.getFirstName());
        sheriff.setRank(record.getRank());
        
        sheriff = sheriffSchedulerService.createSheriff(sheriff);
        
        return ResponseEntity.ok(sheriff);
    }
    
    @DeleteMapping("/sheriffs/{id}")
    public ResponseEntity<Sheriff> deleteSheriff(@PathVariable(value="id") String id) {
        Optional<Sheriff> op = sheriffSchedulerService.getSheriffById(UUID.fromString(id));
        
        if (!op.isPresent()) {
            return ResponseEntity.notFound().build();
        }
        
        sheriffSchedulerService.deleteSheriff(op.get());
        
        return ResponseEntity.ok().build();
    }
    

    @GetMapping("/sheriffs")
    public ResponseEntity<List<Sheriff>> getSheriffs() {
        List<Sheriff> sheriffs = sheriffSchedulerService.getSheriffs();
        
        return ResponseEntity.ok(sheriffs);
    }
*/
	
   
}
