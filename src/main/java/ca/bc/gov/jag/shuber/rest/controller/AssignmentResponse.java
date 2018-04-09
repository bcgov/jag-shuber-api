package ca.bc.gov.jag.shuber.rest.controller;

import org.springframework.hateoas.ResourceSupport;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

import ca.bc.gov.jag.shuber.persistence.model.Assignment;

public class AssignmentResponse extends ResourceSupport {
	private final Assignment assignment;

    @JsonCreator
    public AssignmentResponse(@JsonProperty("assignment") Assignment assignment) {
        this.assignment = assignment;
    }

    public Assignment getAssignment() {
    		return assignment;
    }
}
