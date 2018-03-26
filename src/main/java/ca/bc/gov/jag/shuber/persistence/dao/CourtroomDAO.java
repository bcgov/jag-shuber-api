package ca.bc.gov.jag.shuber.persistence.dao;

import ca.bc.gov.jag.shuber.persistence.model.Courtroom;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * CourtroomDAO generated by Hibernate Tools hbm2dao.
 *
 * <p>Domain data access object for database table courtroom.
 *
 * @author hbm2dao
 * @version 352
 * @see ca.bc.gov.jag.shuber.persistence.model.Courtroom
 */
@Repository
public interface CourtroomDAO extends JpaRepository<Courtroom, UUID> {
    // NOTE: add custom methods here

}