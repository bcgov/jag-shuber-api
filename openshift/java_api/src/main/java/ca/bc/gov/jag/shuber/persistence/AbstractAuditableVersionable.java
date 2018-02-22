package ca.bc.gov.jag.shuber.persistence;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.EntityListeners;
import javax.persistence.MappedSuperclass;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.Version;

import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import com.fasterxml.jackson.annotation.JsonIgnore;

/**
 *
 * @author michael.gabelmann
 */
@MappedSuperclass
@EntityListeners(AuditingEntityListener.class)
public abstract class AbstractAuditableVersionable implements Auditable, Versionable {
	/** Who created the record. */
	@JsonIgnore
	@CreatedBy
	@Column(name = "CREATED_BY", nullable=false, insertable=true, updatable=false, length=32)
	protected String createdBy;
	
	/** Who updated the record. */
	@JsonIgnore
	@LastModifiedBy
	@Column(name = "UPDATED_BY", nullable=false, insertable=true, updatable=true, length=32)
	protected String updatedBy;
	
	/** Date/time record created. */
	@JsonIgnore
	@CreatedDate
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "CREATED_DTM", nullable=false, insertable=true, updatable=false)
	protected Date createdDtm;

	/** Date/time record updated. */
	@JsonIgnore
	@LastModifiedDate
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "UPDATED_DTM", nullable=false, insertable=true, updatable=true)
	protected Date updatedDtm;
	
	/** 
	 * Revsion count is the number of times a record has been persisted. It is used to determine if a record
	 * has been modified by another source. If this occurs the record is stale and needs to be reloaded.
	 */
	@Version
	@Column(name = "REVISION_COUNT", nullable=false, insertable=true, updatable=true, precision=10, scale=0)
	protected long revisionCount;
	
	
	@Override
	public String getCreatedBy() {
		return createdBy;
	}
	
	@Override
	public void setCreatedBy(String createdBy) {
		this.createdBy = createdBy;
	}
	
	@Override
	public String getUpdatedBy() {
		return updatedBy;
	}
	
	@Override
	public void setUpdatedBy(String updatedBy) {
		this.updatedBy = updatedBy;
	}
	
	public Date getCreatedDtm() {
		return createdDtm;
	}

	public void setCreatedDtm(Date createdDtm) {
		this.createdDtm = createdDtm;
	}

	public Date getUpdatedDtm() {
		return updatedDtm;
	}

	public void setUpdatedDtm(Date updatedDtm) {
		this.updatedDtm = updatedDtm;
	}
	
	@Override
	public long getRevisionCount() {
		return revisionCount;
	}
	
	@Override
	public void setRevisionCount(long revisionCount) {
		this.revisionCount = revisionCount;
	}
	
}
