package ca.bc.gov.jag.shuber.rest.request;

import java.time.LocalDate;

import javax.validation.constraints.NotNull;

import org.springframework.lang.Nullable;

import com.fasterxml.jackson.annotation.JsonProperty;

/**
 * 
 * <pre>
ShiftCopyOptions {
   shouldIncludeSheriffs: boolean;
   startOfWeekSource: DateType;
   startOfWeekDestination: DateType;
}
 * </pre>
 * @author michael.gabelmann
 */
public class ShiftCopyOptions {
	public static final int DEFAULT_NUMDAYS_COPY_SHIFT = 7;
	
	@JsonProperty("shouldIncludeSheriffs")
	@NotNull
	private boolean includeSheriffs;
	
	@JsonProperty("startOfWeekSource")
	@NotNull
	private LocalDate startDate;
	
	@JsonProperty("startOfWeekDestination")
	@NotNull
	private LocalDate fromDate;
	
	@Nullable
	private Integer numDays;

	
	public ShiftCopyOptions() {
		this.includeSheriffs = false;
		this.startDate = LocalDate.now();
		this.fromDate = LocalDate.now().plusDays(7);
		this.numDays = Integer.valueOf(DEFAULT_NUMDAYS_COPY_SHIFT);
	}
	
	public ShiftCopyOptions(@NotNull boolean includeSheriffs, @NotNull LocalDate startDate, @NotNull LocalDate fromDate, Integer numDays) {
		this.includeSheriffs = includeSheriffs;
		this.startDate = startDate;
		this.fromDate = fromDate;
		this.numDays = numDays;
	}

	public boolean isIncludeSheriffs() {
		return includeSheriffs;
	}

	public void setIncludeSheriffs(boolean includeSheriffs) {
		this.includeSheriffs = includeSheriffs;
	}

	public LocalDate getStartDate() {
		return startDate;
	}

	public void setStartDate(LocalDate startDate) {
		this.startDate = startDate;
	}

	public LocalDate getFromDate() {
		return fromDate;
	}

	public void setFromDate(LocalDate fromDate) {
		this.fromDate = fromDate;
	}

	public Integer getNumDays() {
		return numDays;
	}

	public void setNumDays(Integer numDays) {
		this.numDays = numDays;
	}
	
	@Override
	public String toString() {
		StringBuilder sb = new StringBuilder();
		sb.append(ShiftCopyOptions.class.getSimpleName());
		sb.append("[includeSheriffs=");
		sb.append(includeSheriffs);
		sb.append(", ");
		sb.append("startDate=");
		sb.append(startDate != null ? startDate.toString() : "");
		sb.append(", ");
		sb.append("fromDate=");
		sb.append(fromDate != null ? fromDate.toString() : "");
		sb.append(", ");
		sb.append("numDays=");
		sb.append(numDays != null ? numDays.toString() : "");
		sb.append("]");
		
		return sb.toString();
	}
	
}
