package ca.bc.gov.jag.shuber.persistence;

import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.MappedSuperclass;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

/**
 * All code tables extend this class.
 * @author michael.gabelmann
 */
@MappedSuperclass
public abstract class AbstractTypeCode extends AbstractAuditableVersionable implements TypeCode, Effective {
	/** Effective date. First day in effect. */
	@NotNull
	@Column(name = "effective_date", nullable = false, length = 13, insertable = true, updatable = true)
	protected LocalDate effectiveDate;
	
	/** Expiry Date. Last day in effect. If null there is no expiry date. */
	@Column(name = "expiry_date", nullable = true, length= 13, insertable = true, updatable = true)
	protected LocalDate expiryDate;

	/** Description and/or label. */
	@NotEmpty
	@Size(min = 1, max = 200)
	@Column(name = "description", nullable = false, length = 200, insertable = true, updatable = true)
	protected String description;
	
	
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

	@Override
	public String getDescription() {
		return description;
	}

	@Override
	public void setDescription(String description) {
		this.description = description;
	}
	
}
