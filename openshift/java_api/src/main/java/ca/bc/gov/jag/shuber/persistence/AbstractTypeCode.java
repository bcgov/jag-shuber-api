package ca.bc.gov.jag.shuber.persistence;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.MappedSuperclass;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
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
	@Temporal(TemporalType.DATE)
	@Column(name = "EFFECTIVE_DATE", nullable = false, length = 13, insertable = true, updatable = true)
	protected Date effectiveDate;
	
	/** Expiry Date. Last day in effect. If null there is no expiry date. */
	@Temporal(TemporalType.DATE)
	@Column(name = "EXPIRY_DATE", nullable = true, length= 13, insertable = true, updatable = true)
	protected Date expiryDate;

	/** Description and/or label. */
	@NotEmpty
	@Size(min = 1, max = 200)
	@Column(name = "DESCRIPTION", nullable = false, length = 200, insertable = true, updatable = true)
	protected String description;
	
	
	@Override
	public Date getEffectiveDate() {
		return effectiveDate;
	}

	@Override
	public void setEffectiveDate(Date effectiveDate) {
		this.effectiveDate = effectiveDate;
	}

	@Override
	public Date getExpiryDate() {
		return expiryDate;
	}

	@Override
	public void setExpiryDate(Date expiryDate) {
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
