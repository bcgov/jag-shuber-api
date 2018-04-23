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
	private LocalDate sourceStartDate;
	
	@JsonProperty("startOfWeekDestination")
	@NotNull
	private LocalDate destinationStartDate;
	
	@Nullable
	private Integer numDays;

	
	public ShiftCopyOptions() {
		this(false, LocalDate.now(), LocalDate.now().plusDays(DEFAULT_NUMDAYS_COPY_SHIFT), Integer.valueOf(DEFAULT_NUMDAYS_COPY_SHIFT));
	}
	
	public ShiftCopyOptions(@NotNull boolean includeSheriffs, @NotNull LocalDate sourceStartDate, @NotNull LocalDate destinationStartDate, Integer numDays) {
		this.includeSheriffs = includeSheriffs;
		this.sourceStartDate = sourceStartDate;
		this.destinationStartDate = destinationStartDate;
		this.numDays = numDays;
	}

	public boolean isIncludeSheriffs() {
		return includeSheriffs;
	}

	public void setIncludeSheriffs(boolean includeSheriffs) {
		this.includeSheriffs = includeSheriffs;
	}

	public LocalDate getSourceStartDate() {
		return sourceStartDate;
	}

	public void setSourceStartDate(LocalDate sourceStartDate) {
		this.sourceStartDate = sourceStartDate;
	}

	public LocalDate getDestinationStartDate() {
		return destinationStartDate;
	}

	public void setDestinationStartDate(LocalDate destinationStartDate) {
		this.destinationStartDate = destinationStartDate;
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
		sb.append("sourceStartDate=");
		sb.append(sourceStartDate != null ? sourceStartDate.toString() : "");
		sb.append(", ");
		sb.append("destinationStartDate=");
		sb.append(destinationStartDate != null ? destinationStartDate.toString() : "");
		sb.append(", ");
		sb.append("numDays=");
		sb.append(numDays != null ? numDays.toString() : "");
		sb.append("]");
		
		return sb.toString();
	}
	
	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((destinationStartDate == null) ? 0 : destinationStartDate.hashCode());
		result = prime * result + (includeSheriffs ? 1231 : 1237);
		result = prime * result + ((numDays == null) ? 0 : numDays.hashCode());
		result = prime * result + ((sourceStartDate == null) ? 0 : sourceStartDate.hashCode());
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
		ShiftCopyOptions other = (ShiftCopyOptions) obj;
		if (destinationStartDate == null) {
			if (other.destinationStartDate != null)
				return false;
		} else if (!destinationStartDate.equals(other.destinationStartDate))
			return false;
		if (includeSheriffs != other.includeSheriffs)
			return false;
		if (numDays == null) {
			if (other.numDays != null)
				return false;
		} else if (!numDays.equals(other.numDays))
			return false;
		if (sourceStartDate == null) {
			if (other.sourceStartDate != null)
				return false;
		} else if (!sourceStartDate.equals(other.sourceStartDate))
			return false;
		return true;
	}
}
