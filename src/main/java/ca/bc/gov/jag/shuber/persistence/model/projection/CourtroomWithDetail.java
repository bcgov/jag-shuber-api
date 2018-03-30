package ca.bc.gov.jag.shuber.persistence.model.projection;

import java.util.List;
import java.util.UUID;

import org.springframework.data.rest.core.config.Projection;

import ca.bc.gov.jag.shuber.persistence.model.Assignment;
import ca.bc.gov.jag.shuber.persistence.model.Courthouse;
import ca.bc.gov.jag.shuber.persistence.model.Courtroom;

/**
 * 
 * @author michael.gabelmann
 */
@Projection(name = "courtroomWithDetail", types = { Courtroom.class })
public interface CourtroomWithDetail {
	
	UUID getCourtroomId();
	
	Courthouse getCourthouse();
	
	String getCourtroomCd();
	
	String getCourtroomName();
	
	List<Assignment> getAssignments();
	
}
