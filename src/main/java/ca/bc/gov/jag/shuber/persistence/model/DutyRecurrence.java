package ca.bc.gov.jag.shuber.persistence.model;

import java.io.Serializable;
import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
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
import javax.persistence.Transient;
import javax.validation.constraints.NotNull;

import org.hibernate.annotations.GenericGenerator;

import ca.bc.gov.jag.shuber.persistence.AbstractAuditableVersionable;
import ca.bc.gov.jag.shuber.persistence.Effective;

/**
 * DutyRecurrence generated by Hibernate Tools hbm2java.
 *
 * <p>Domain model for database table duty_recurrence.
 *
 * @author hbm2java
 * @version 391
 */
@Entity
@Table(name = "duty_recurrence"
    // ,schema="shersched"
)
public class DutyRecurrence extends AbstractAuditableVersionable implements Effective, Serializable {

    /** UID. */
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(generator = "uuid2")
    @GenericGenerator(name = "uuid2", strategy = "uuid2")
    @Column(name = "duty_recurrence_id", nullable = false, updatable = false)
    private UUID dutyRecurrenceId;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "assignment_id", nullable = false)
    private Assignment assignment;
    
    @NotNull
    @Column(name = "start_time", nullable = false, length = 15)
    private LocalTime startTime;

    @NotNull
    @Column(name = "end_time", nullable = false, length = 15)
    private LocalTime endTime;

    @NotNull
    @Column(name = "days_bitmap", nullable = false, precision = 10, scale = 0)
    private long daysBitmap;

    @NotNull
    @Column(name = "sheriffs_required", nullable = false, precision = 2, scale = 0)
    private byte sheriffsRequired;
    
    /** Effective date. First day in effect. */
	@NotNull
	@Column(name = "effective_date", nullable = false, length = 13, insertable = true, updatable = true)
	protected LocalDate effectiveDate;
	
	/** Expiry Date. Last day in effect. If null there is no expiry date. */
	@Column(name = "expiry_date", nullable = true, length= 13, insertable = true, updatable = true)
	protected LocalDate expiryDate;
	
	@OneToMany(fetch = FetchType.LAZY, mappedBy = "dutyRecurrence")
    private List<Duty> duties = new ArrayList<Duty>(0);
    
	/** No args constructor. */
    public DutyRecurrence() {}
	
    /** Required args constructor. */
    public DutyRecurrence(
            UUID dutyRecurrenceId,
            Assignment assignment,
            LocalTime startTime,
            LocalTime endTime,
            long daysBitmap,
            byte sheriffsRequired,
            LocalDate effectiveDate,
            String createdBy,
            String updatedBy,
            Instant createdDtm,
            Instant updatedDtm,
            long revisionCount) {
        this.dutyRecurrenceId = dutyRecurrenceId;
        this.assignment = assignment;
        this.startTime = startTime;
        this.endTime = endTime;
        this.daysBitmap = daysBitmap;
        this.sheriffsRequired = sheriffsRequired;
        this.effectiveDate = effectiveDate;
        this.createdBy = createdBy;
        this.updatedBy = updatedBy;
        this.createdDtm = createdDtm;
        this.updatedDtm = updatedDtm;
        this.revisionCount = revisionCount;
    }

    /** All args constructor. */
    public DutyRecurrence(
            UUID dutyRecurrenceId,
            Assignment assignment,
            LocalTime startTime,
            LocalTime endTime,
            long daysBitmap,
            byte sheriffsRequired,
            LocalDate effectiveDate,
            LocalDate expiryDate,
            String createdBy,
            String updatedBy,
            Instant createdDtm,
            Instant updatedDtm,
            long revisionCount,
            List<Duty> duties) {
        this.dutyRecurrenceId = dutyRecurrenceId;
        this.assignment = assignment;
        this.startTime = startTime;
        this.endTime = endTime;
        this.daysBitmap = daysBitmap;
        this.sheriffsRequired = sheriffsRequired;
        this.effectiveDate = effectiveDate;
        this.expiryDate = expiryDate;
        this.createdBy = createdBy;
        this.updatedBy = updatedBy;
        this.createdDtm = createdDtm;
        this.updatedDtm = updatedDtm;
        this.revisionCount = revisionCount;
        this.duties = duties;
    }
    public UUID getDutyRecurrenceId() {
        return this.dutyRecurrenceId;
    }

    public void setDutyRecurrenceId(UUID dutyRecurrenceId) {
        this.dutyRecurrenceId = dutyRecurrenceId;
    }

    public Assignment getAssignment() {
        return this.assignment;
    }

    public void setAssignment(Assignment assignment) {
        this.assignment = assignment;
    }
    
	public LocalTime getStartTime() {
		return this.startTime;
	}

	public void setStartTime(LocalTime startTime) {
		this.startTime = startTime;
	}

	public LocalTime getEndTime() {
		return this.endTime;
	}

	public void setEndTime(LocalTime endTime) {
		this.endTime = endTime;
	}

    public long getDaysBitmap() {
        return this.daysBitmap;
    }

    public void setDaysBitmap(long daysBitmap) {
        this.daysBitmap = daysBitmap;
    }

    public byte getSheriffsRequired() {
        return this.sheriffsRequired;
    }

    public void setSheriffsRequired(byte sheriffsRequired) {
        this.sheriffsRequired = sheriffsRequired;
    }
    
    @Override
	public LocalDate getEffectiveDate() {
		return effectiveDate;
	}

	@Override
	public void setEffectiveDate(LocalDate effectiveDate) {
		this.effectiveDate = effectiveDate;
	}

	@Override
	public LocalDate getExpiryDate() {
		return expiryDate;
	}

	@Override
	public void setExpiryDate(LocalDate expiryDate) {
		this.expiryDate = expiryDate;
	}
	
	public List<Duty> getDuties() {
        return this.duties;
    }

    public void setDuties(List<Duty> duties) {
        this.duties = duties;
    }
    
    @Transient
	@Override
	public String getIdPath() {
		return "/dutyRecurrences/" + dutyRecurrenceId;
	}
}
