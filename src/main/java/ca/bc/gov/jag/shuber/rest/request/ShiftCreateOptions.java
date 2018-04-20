package ca.bc.gov.jag.shuber.rest.request;

import java.time.LocalDate;
import java.time.LocalTime;

import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonProperty;

import ca.bc.gov.jag.shuber.persistence.model.WorkSectionCode.WORK_SECTION_CODE;

/**
 * Used to create a number of shifts for a week.
 * 
 * <pre>
export type ShiftCreationPayload = {
    weekStart: DateType;
    workSectionId?: WorkSectionCode;
    startTime: DateType;
    endTime: DateType;
    days: DaysOfWeek;
    repeatNumber: number;
};
</pre>
 *
 * @author michael.gabelmann
 */
public class ShiftCreateOptions {
	@JsonProperty("weekStart")
	@NotNull
	private LocalDate startDate;
	
	@NotNull
	private String workSectionCode;
	
	@NotNull
	private LocalTime startTime;
	
	@NotNull
	private LocalTime endTime;
	
	@JsonProperty("days")
	@NotNull
	private long daysBitmap;
	
	@JsonProperty("repeatNumber")
	@NotNull
	private byte numShifts;

	
	public ShiftCreateOptions() {
		this.startDate = LocalDate.now();
		this.workSectionCode = WORK_SECTION_CODE.COURTS.name();
		this.startTime = LocalTime.of(9, 0);
		this.endTime = LocalTime.of(17, 0);
		this.daysBitmap = 31;
		this.numShifts = (byte) 1;
	}
	
	public ShiftCreateOptions(@NotNull LocalDate startDate, @NotNull String workSectionCode,
			@NotNull LocalTime startTime, @NotNull LocalTime endTime, @NotNull long daysBitmap,
			@NotNull byte numShifts) {
		super();
		this.startDate = startDate;
		this.workSectionCode = workSectionCode;
		this.startTime = startTime;
		this.endTime = endTime;
		this.daysBitmap = daysBitmap;
		this.numShifts = numShifts;
	}

	public LocalDate getStartDate() {
		return startDate;
	}

	public void setStartDate(LocalDate startDate) {
		this.startDate = startDate;
	}

	public String getWorkSectionCode() {
		return workSectionCode;
	}

	public void setWorkSectionCode(String workSectionCode) {
		this.workSectionCode = workSectionCode;
	}

	public LocalTime getStartTime() {
		return startTime;
	}

	public void setStartTime(LocalTime startTime) {
		this.startTime = startTime;
	}

	public LocalTime getEndTime() {
		return endTime;
	}

	public void setEndTime(LocalTime endTime) {
		this.endTime = endTime;
	}

	public long getDaysBitmap() {
		return daysBitmap;
	}

	public void setDaysBitmap(long daysBitmap) {
		this.daysBitmap = daysBitmap;
	}

	public byte getNumShifts() {
		return numShifts;
	}

	public void setNumShifts(byte numShifts) {
		this.numShifts = numShifts;
	}
	
	@Override
	public String toString() {
		StringBuilder sb = new StringBuilder();
		sb.append(ShiftCreateOptions.class.getSimpleName());
		sb.append("[startDate=");
		sb.append(startDate != null ? startDate.toString() : "");
		sb.append(", ");
		sb.append("workSectionCode=");
		sb.append(workSectionCode != null ? workSectionCode : "");
		sb.append(", ");
		sb.append("startTime=");
		sb.append(startTime != null ? startTime.toString() : "");
		sb.append(", ");
		sb.append("endTime=");
		sb.append(endTime != null ? endTime.toString() : "");
		sb.append(", ");
		sb.append("daysBitMap=");
		sb.append(daysBitmap);
		sb.append(", ");
		sb.append("numShifts=");
		sb.append(numShifts);
		sb.append("]");
		
		return sb.toString();
	}
	
}
