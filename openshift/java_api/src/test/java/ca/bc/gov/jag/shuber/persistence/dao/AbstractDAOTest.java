package ca.bc.gov.jag.shuber.persistence.dao;

import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.context.annotation.ComponentScan.Filter;
import org.springframework.context.annotation.FilterType;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.context.junit4.SpringRunner;

import ca.bc.gov.jag.shuber.AbstractTest;
import ca.bc.gov.jag.shuber.persistence.MockAuditorAware;

/**
 * 
 * @author michael.gabelmann
 */
@RunWith(SpringRunner.class)
@DataJpaTest(
	//excludeFilters = @Filter(Service.class), 
	includeFilters = @Filter(type = FilterType.ASSIGNABLE_TYPE, classes = MockAuditorAware.class)
)
@ExtendWith(SpringExtension.class)
@EnableJpaAuditing(auditorAwareRef = "mockAuditorAware")
abstract class AbstractDAOTest extends AbstractTest {
	@Autowired
    protected TestEntityManager entityManager;
	
}
