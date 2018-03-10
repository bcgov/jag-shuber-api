package ca.bc.gov.jag.shuber.rest.controller;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import ca.bc.gov.jag.shuber.persistence.model.Sheriff;
import ca.bc.gov.jag.shuber.service.SheriffSchedulerService;

/**
 * Endpoint for handling REST services for a Sheriff
 * @author michael.gabelmann
 * @see ca.bc.gov.jag.shuber.persistence.model.Sheriff
 */
@RestController
@RequestMapping("/api/custom")
public class SheriffController {
	
	@Autowired
	private SheriffSchedulerService sheriffSchedulerService;
	
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
	
	
	/**
	 * Get a Sheriff by the PK.
	 * @param id
	 * @return
	 */
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
	
	
	/**
	 * Get all Sheriffs.
	 * @return
	 */
	@GetMapping("/sheriffs")
	public ResponseEntity<List<Sheriff>> getSheriffs() {
		List<Sheriff> sheriffs = sheriffSchedulerService.getSheriffs();
		
		return ResponseEntity.ok(sheriffs);
	}
	
	/**
	 * Search for a Sheriff by their badge number.
	 * @param badgeNo
	 * @return
	 */
	@GetMapping("/sheriffs/search")
	public ResponseEntity<Sheriff> getSheriffByBadgeNo(@RequestParam(value="badgeNo") String badgeNo) {
		Optional<Sheriff> s = sheriffSchedulerService.getSheriffByBadgeNo(badgeNo);
		
		if (s.isPresent()) {
			return new ResponseEntity<>(s.get(), HttpStatus.OK);
			
		} else {
			return ResponseEntity.notFound().build();
		}
	}
	
}
