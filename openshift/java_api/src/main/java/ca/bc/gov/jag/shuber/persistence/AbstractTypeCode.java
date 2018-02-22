package ca.bc.gov.jag.shuber.persistence;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.MappedSuperclass;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

/**
 *
 * @author michael.gabelmann
 */
@MappedSuperclass
public abstract class AbstractTypeCode<T> extends AbstractAuditableVersionable implements TypeCode<T>, Effective {
	/** Effective date. First day in effect. */
	@Temporal(TemporalType.DATE)
	@Column(name = "EFFECTIVE_DATE", nullable=false, insertable=true, updatable=true)
	protected Date effectiveDate;
	
	/** Expiry Date. Last day in effect. If null there is no expiry date. */
	@Temporal(TemporalType.DATE)
	@Column(name = "EXPIRY_DATE", nullable=true, insertable=true, updatable=true)
	protected Date expiryDate;

	/** Description and/or label. */
	@Column(name = "DESCRIPTION", nullable=false, insertable=true, updatable=true, length=100)
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
	
}
