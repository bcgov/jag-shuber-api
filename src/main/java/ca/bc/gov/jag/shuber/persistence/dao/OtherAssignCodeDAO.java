package ca.bc.gov.jag.shuber.persistence.dao;

import ca.bc.gov.jag.shuber.persistence.model.OtherAssignCode;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * OtherAssignCodeDAO generated by Hibernate Tools hbm2dao.
 *
 * <p>Domain data access object for database table other_assign_code.
 *
 * @author hbm2dao
 * @version 391
 * @see ca.bc.gov.jag.shuber.persistence.model.OtherAssignCode
 */
@Repository
public interface OtherAssignCodeDAO extends JpaRepository<OtherAssignCode, String> {
    // NOTE: add custom methods here

}