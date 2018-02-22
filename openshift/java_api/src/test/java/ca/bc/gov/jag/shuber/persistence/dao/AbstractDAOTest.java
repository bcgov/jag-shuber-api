package ca.bc.gov.jag.shuber.persistence.dao;

import java.util.Date;

import javax.annotation.PostConstruct;

import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.context.junit4.SpringRunner;

/**
 * 
 * @author michael.gabelmann
 */
@RunWith(SpringRunner.class)
@DataJpaTest
@ExtendWith(SpringExtension.class)
@ComponentScan({"ca.bc.gov.jag.shuber.persistence"})
@EnableJpaAuditing(auditorAwareRef = "mockAuditorAware")
public abstract class AbstractDAOTest {
	
	/** Entity manager. */
	@Autowired
    protected TestEntityManager entityManager;
	
	/** Current date. */
	protected Date now;
	
	
	@PostConstruct
	public void setup() {
		now = new Date();
	}
}
