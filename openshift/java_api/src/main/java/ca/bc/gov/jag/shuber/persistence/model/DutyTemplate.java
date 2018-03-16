package ca.bc.gov.jag.shuber.persistence.model;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.hibernate.annotations.GenericGenerator;

import ca.bc.gov.jag.shuber.persistence.AbstractAuditableVersionable;

/**
 * DutyTemplate generated by Hibernate Tools hbm2java.
 *
 * <p>Domain model for database table duty_template.
 *
 * @author hbm2java
 * @version 352
 */
@Entity
@Table(name = "duty_template"
    // ,schema="shersched"
)
public class DutyTemplate extends AbstractAuditableVersionable implements Serializable {

    /** UID. */
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(generator = "uuid2")
    @GenericGenerator(name = "uuid2", strategy = "uuid2")
    @Column(name = "duty_template_id", nullable = false, updatable = false)
    private UUID dutyTemplateId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "recurrence_id")
    private Recurrence recurrence;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "shift_template_id")
    private ShiftTemplate shiftTemplate;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "work_section_code")
    private WorkSectionCode workSectionCode;

    @Temporal(TemporalType.TIME)
    @Column(name = "start_time", length = 21)
    private Date startTime;

    @Temporal(TemporalType.TIME)
    @Column(name = "end_time", length = 21)
    private Date endTime;

    @Column(name = "assignment_stream_id")
    private UUID assignmentStreamId;

    //@JsonIgnore
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "dutyTemplate")
    private List<Duty> duties = new ArrayList<Duty>(0);
    
    /** No args constructor. */
    public DutyTemplate() {}

    /** Required args constructor. */
    public DutyTemplate(
            UUID dutyTemplateId,
            String createdBy,
            String updatedBy,
            Date createdDtm,
            Date updatedDtm,
            long revisionCount) {
        this.dutyTemplateId = dutyTemplateId;
        this.createdBy = createdBy;
        this.updatedBy = updatedBy;
        this.createdDtm = createdDtm;
        this.updatedDtm = updatedDtm;
        this.revisionCount = revisionCount;
    }

    /** All args constructor. */
    public DutyTemplate(
            UUID dutyTemplateId,
            Recurrence recurrence,
            ShiftTemplate shiftTemplate,
            WorkSectionCode workSectionCode,
            Date startTime,
            Date endTime,
            UUID assignmentStreamId,
            String createdBy,
            String updatedBy,
            Date createdDtm,
            Date updatedDtm,
            long revisionCount,
            List<Duty> duties) {
        this.dutyTemplateId = dutyTemplateId;
        this.recurrence = recurrence;
        this.shiftTemplate = shiftTemplate;
        this.workSectionCode = workSectionCode;
        this.startTime = startTime;
        this.endTime = endTime;
        this.assignmentStreamId = assignmentStreamId;
        this.createdBy = createdBy;
        this.updatedBy = updatedBy;
        this.createdDtm = createdDtm;
        this.updatedDtm = updatedDtm;
        this.revisionCount = revisionCount;
        this.duties = duties;
    }

    public UUID getDutyTemplateId() {
        return this.dutyTemplateId;
    }

    public void setDutyTemplateId(UUID dutyTemplateId) {
        this.dutyTemplateId = dutyTemplateId;
    }

    public Recurrence getRecurrence() {
        return this.recurrence;
    }

    public void setRecurrence(Recurrence recurrence) {
        this.recurrence = recurrence;
    }

    public ShiftTemplate getShiftTemplate() {
        return this.shiftTemplate;
    }

    public void setShiftTemplate(ShiftTemplate shiftTemplate) {
        this.shiftTemplate = shiftTemplate;
    }

    public WorkSectionCode getWorkSectionCode() {
        return this.workSectionCode;
    }

    public void setWorkSectionCode(WorkSectionCode workSectionCode) {
        this.workSectionCode = workSectionCode;
    }

    public Date getStartTime() {
        return this.startTime;
    }

    public void setStartTime(Date startTime) {
        this.startTime = startTime;
    }

    public Date getEndTime() {
        return this.endTime;
    }

    public void setEndTime(Date endTime) {
        this.endTime = endTime;
    }

    public UUID getAssignmentStreamId() {
        return this.assignmentStreamId;
    }

    public void setAssignmentStreamId(UUID assignmentStreamId) {
        this.assignmentStreamId = assignmentStreamId;
    }

    public List<Duty> getDuties() {
        return this.duties;
    }

    public void setDuties(List<Duty> duties) {
        this.duties = duties;
    }
}
