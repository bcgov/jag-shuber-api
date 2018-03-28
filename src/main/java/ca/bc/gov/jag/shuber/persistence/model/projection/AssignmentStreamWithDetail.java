package ca.bc.gov.jag.shuber.persistence.model.projection;

import java.util.List;
import java.util.UUID;

import org.springframework.data.rest.core.config.Projection;

import ca.bc.gov.jag.shuber.persistence.model.AssignmentStream;
import ca.bc.gov.jag.shuber.persistence.model.Duty;
import ca.bc.gov.jag.shuber.persistence.model.DutyTemplate;
import ca.bc.gov.jag.shuber.persistence.model.WorkSectionCode;

/**
 * 
 * @author michael.gabelmann
 */
@Projection(name = "assignmentStreamWithDetail", types = { AssignmentStream.class })
public interface AssignmentStreamWithDetail {
    
    UUID getAssignmentStreamId();
    
    //Courthouse getCourthouse();
    
    WorkSectionCode getWorkSectionCode();
    
    UUID getOrgUnitId();
    
    List<Duty> getDuties();
    
    List<DutyTemplate> getDutyTemplates();
    
}
