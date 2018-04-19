package ca.bc.gov.jag.shuber.rest.controller;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.projection.ProjectionFactory;
import org.springframework.data.projection.SpelAwareProxyProjectionFactory;
import org.springframework.hateoas.EntityLinks;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ca.bc.gov.jag.shuber.service.DutyRosterService;

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
	
	
}
