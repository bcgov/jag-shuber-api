package ca.bc.gov.jag.shuber.rest.service;

import static org.springframework.hateoas.mvc.ControllerLinkBuilder.linkTo;
import static org.springframework.hateoas.mvc.ControllerLinkBuilder.methodOn;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.ResourceSupport;
import org.springframework.http.HttpEntity;
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

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

import ca.bc.gov.jag.shuber.persistence.model.Sheriff;
import ca.bc.gov.jag.shuber.persistence.service.SheriffSchedulerService;
import ca.bc.gov.jag.shuber.rest.dto.HateoasList;

/**
 * 
 * @author michael.gabelmann
 */
@RestController
@RequestMapping("/api/hateoas")
public class SheriffHateoasController {
	
	@Autowired
	private SheriffSchedulerService sheriffSchedulerService;
	
	@PostMapping("/sheriffs")
	public ResponseEntity<JsonSheriff> createSheriff(@Valid @RequestBody JsonSheriff record) {
		
		Sheriff sheriff = new Sheriff();
		sheriff.setBadgeNo(record.getBadgeNo());
		sheriff.setName(record.getName());
		sheriff.setRank(record.getRank());
		
		sheriffSchedulerService.createSheriff(sheriff);
		return ResponseEntity.ok(this.getJsonSheriff(sheriff));
	}
	
	
	/**
	 * Get a Sheriff by the PK.
	 * @param id
	 * @return
	 */
	@GetMapping("/sheriffs/{id}")
	public ResponseEntity<JsonSheriff> getSheriffById(@PathVariable(value="id") String id) {
		Optional<Sheriff> record = sheriffSchedulerService.getSheriffById(UUID.fromString(id));
		
		if (record.isPresent()) {
			return new ResponseEntity<>(this.getJsonSheriff(record.get()), HttpStatus.OK);
			
		} else {
			return ResponseEntity.notFound().build();
		}
	}
	
	
	@PutMapping("/sheriffs/{id}")
	public ResponseEntity<JsonSheriff> updateSheriff(
		@PathVariable(value="id") String id,
		@Valid @RequestBody JsonSheriff record) {
		
		Optional<Sheriff> op = sheriffSchedulerService.getSheriffById(UUID.fromString(id));
		
		if (!op.isPresent()) {
			return ResponseEntity.notFound().build();
		}
		
		Sheriff tmp = op.get();
		tmp.setBadgeNo(record.getBadgeNo());
		tmp.setName(record.getName());
		tmp.setRank(record.getRank());
		
		Sheriff s = sheriffSchedulerService.createSheriff(tmp);
		
		return ResponseEntity.ok(this.getJsonSheriff(s));
	}
	
	@DeleteMapping("/sheriffs/{id}")
	public ResponseEntity<JsonSheriff> deleteSheriff(@PathVariable(value="id") String id) {
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
	public HttpEntity<HateoasList<JsonSheriff>> getSheriffs() {
		List<Sheriff> s = sheriffSchedulerService.getSheriffs();
		
		HateoasList<JsonSheriff> sheriffs = this.getJsonSheriffs(s);
		return ResponseEntity.ok(sheriffs);
	}
	
	/**
	 * Search for a Sheriff by their badge number.
	 * @param badgeNo
	 * @return
	 */
	@GetMapping("/sheriffs/search")
	public HttpEntity<JsonSheriff> findSheriffByBadgeNo(@RequestParam(value="badgeNo") String badgeNo) {
		Sheriff s = sheriffSchedulerService.getSheriffByBadgeNo(badgeNo);
		
		if (s == null) {
			return ResponseEntity.notFound().build();
			
		} else {
			JsonSheriff js = getJsonSheriff(s);
			return new ResponseEntity<>(js, HttpStatus.OK);
		}
	}
	
	
	
	//========================================================================>
	
	//TODO: create some kind of mapper utility?
	private HateoasList<JsonSheriff> getJsonSheriffs(List<Sheriff> sheriffs) {
		List<JsonSheriff> records = new ArrayList<>();
	
		for (Sheriff sheriff : sheriffs) {
			records.add(this.getJsonSheriff(sheriff));
		}
		
		HateoasList<JsonSheriff> records2 = new HateoasList<>(records);
		records2.add(linkTo(methodOn(SheriffHateoasController.class).getSheriffs()).withSelfRel());
		
		return records2;
	}
	
	private JsonSheriff getJsonSheriff(Sheriff s) {
		JsonSheriff js = null;
		
		if (s != null) {
			js = new JsonSheriff();
			js.sheriffId = s.getSheriffId().toString();
			js.badgeNo = s.getBadgeNo();
			js.name = s.getName();
			js.rank = s.getRank();
			
			js.add(linkTo(methodOn(SheriffHateoasController.class).getSheriffById(js.sheriffId)).withSelfRel());
		}
		
		return js;
	}
	
	
	/**
	 * 
	 * @author mike.gabelmann
	 */
	class JsonSheriff extends ResourceSupport {
		private String sheriffId;
		private String badgeNo;
		private String name;
		private String rank;
		
		public JsonSheriff() {}
		
		@JsonCreator
		public JsonSheriff(
			@JsonProperty("sheriffId") String sheriffId,
			@JsonProperty("badgeNo") String badgeNo,
			@JsonProperty("name") String name,
			@JsonProperty("rank") String rank) {
			
			this.sheriffId = sheriffId;
			this.badgeNo = badgeNo;
			this.name = name;
			this.rank = rank;
		}
		
		public String getSheriffId() {
			return sheriffId;
		}
		public void setSheriffId(String sheriffId) {
			this.sheriffId = sheriffId;
		}
		public String getBadgeNo() {
			return badgeNo;
		}
		public void setBadgeNo(String badgeNo) {
			this.badgeNo = badgeNo;
		}
		public String getName() {
			return name;
		}
		public void setName(String name) {
			this.name = name;
		}
		public String getRank() {
			return rank;
		}
		public void setRank(String rank) {
			this.rank = rank;
		}
	}
	
}
