package ca.bc.gov.jag.shuber.rest.controller;

import static org.springframework.hateoas.mvc.ControllerLinkBuilder.linkTo;
import static org.springframework.hateoas.mvc.ControllerLinkBuilder.methodOn;

import javax.validation.Valid;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import ca.bc.gov.jag.shuber.persistence.model.Assignment;
import ca.bc.gov.jag.shuber.service.AssignmentService;

@RestController
@RequestMapping(value = AssignmentController.PATH, produces = "application/hal+json")
public class AssignmentController {
	
	public static final String PATH = "/api/custom";
	public static final String PATH_ASSIGNMENTS = "/assignments";
	
	/** Logger. */
	private static final Logger log = LogManager.getLogger(AssignmentController.class);
	
	@Autowired
	private AssignmentService assignmentService;

	
	@RequestMapping(value = PATH_ASSIGNMENTS, method = RequestMethod.POST)
	public ResponseEntity<AssignmentResponse> createAssignment(@Valid @RequestBody Assignment assignment) {
		log.debug("processing create assignment");
		
		assignmentService.createAssignment(assignment);
		
		AssignmentResponse ar = new AssignmentResponse(assignment);
		ar.add(linkTo(methodOn(AssignmentController.class).createAssignment(assignment)).withSelfRel());
		
		return new ResponseEntity<>(ar, HttpStatus.CREATED);
	}
	
}
