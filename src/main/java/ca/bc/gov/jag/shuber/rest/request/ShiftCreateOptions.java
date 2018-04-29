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
		this(LocalDate.now(), WORK_SECTION_CODE.COURTS.name(), LocalTime.of(9, 0), LocalTime.of(17, 0), 31L, (byte) 1);
	}
	
	public ShiftCreateOptions(@NotNull LocalDate startDate, @NotNull String workSectionCode,
			@NotNull LocalTime startTime, @NotNull LocalTime endTime, @NotNull long daysBitmap,
			@NotNull byte numShifts) {
		
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
	
	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + (int) (daysBitmap ^ (daysBitmap >>> 32));
		result = prime * result + ((endTime == null) ? 0 : endTime.hashCode());
		result = prime * result + numShifts;
		result = prime * result + ((startDate == null) ? 0 : startDate.hashCode());
		result = prime * result + ((startTime == null) ? 0 : startTime.hashCode());
		result = prime * result + ((workSectionCode == null) ? 0 : workSectionCode.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		ShiftCreateOptions other = (ShiftCreateOptions) obj;
		if (daysBitmap != other.daysBitmap)
			return false;
		if (endTime == null) {
			if (other.endTime != null)
				return false;
		} else if (!endTime.equals(other.endTime))
			return false;
		if (numShifts != other.numShifts)
			return false;
		if (startDate == null) {
			if (other.startDate != null)
				return false;
		} else if (!startDate.equals(other.startDate))
			return false;
		if (startTime == null) {
			if (other.startTime != null)
				return false;
		} else if (!startTime.equals(other.startTime))
			return false;
		if (workSectionCode == null) {
			if (other.workSectionCode != null)
				return false;
		} else if (!workSectionCode.equals(other.workSectionCode))
			return false;
		return true;
	}
	
}
