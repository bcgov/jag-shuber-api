package ca.bc.gov.jag.shuber.persistence.dao;

/**
 * 
 * @author michael.gabelmann
 */
public class ShiftDAOTest extends AbstractDAOTest {

	@Override
	protected void beforeTest() {
		// TODO Auto-generated method stub
		
	}

	@Override
	protected void afterTest() {
		// TODO Auto-generated method stub
		
	}
	
//	@Autowired
//	private ShiftDAO shiftDAO;
//	
//	private Location location;
//	private Courthouse courthouse;
//	private Shift shift;
//	
//	@BeforeEach
//	@Override
//	protected void beforeTest() {
//		location = ModelUtil.getLocation("Victoria");
//		courthouse = ModelUtil.getCourthouse(location, "COURTHOUSE", UUID.randomUUID());
//		shift = ModelUtil.getShift(courthouse);
//		
//		entityManager.persistAndFlush(location);
//		entityManager.persistAndFlush(courthouse);
//		entityManager.persistAndFlush(shift);
//	}
	
//	@Test
//	@DisplayName("Search dates same day as shift")
//	void test1_getShifts() {
//		Date start = DateUtil.getDate(2018, Calendar.JANUARY, 1, 9, 30, 0);
//		Date end = DateUtil.getDate(2018, Calendar.JANUARY, 1, 17, 30, 0);
//		shift.setStartTime(start);
//		shift.setEndTime(end);
//		entityManager.persistAndFlush(shift);
//		
//		String searchStartDate = "2018-01-01";
//		String searchEndDate = "2018-01-02";
//		List<Shift> records = shiftDAO.getShifts(searchStartDate, searchEndDate, location.getLocationId());
//		
//		Assertions.assertNotNull(records);
//		Assertions.assertTrue(records.size() == 1);
//	}
//
//	@Test
//	@DisplayName("Search dates outside shift")
//	void test2_getShifts() {
//		Date start = DateUtil.getDate(2018, Calendar.JANUARY, 1, 0, 0, 0);
//		Date end = DateUtil.getDate(2018, Calendar.JANUARY, 1, 23, 59, 59);
//		shift.setStartTime(start);
//		shift.setEndTime(end);
//		entityManager.persistAndFlush(shift);
//		
//		String searchStartDate = "2018-01-02";
//		String searchEndDate = "2018-01-03";
//		List<Shift> records = shiftDAO.getShifts(searchStartDate, searchEndDate, location.getLocationId());
//		
//		Assertions.assertNotNull(records);
//		Assertions.assertTrue(records.size() == 0);
//	}
//	
//	@Test
//	@DisplayName("Shift inside start and end date search")
//	void test3_getShifts() {
//		Date start = DateUtil.getDate(2018, Calendar.JANUARY, 2, 9, 0, 0);
//		Date end = DateUtil.getDate(2018, Calendar.JANUARY, 2, 17, 30, 0);
//		shift.setStartTime(start);
//		shift.setEndTime(end);
//		entityManager.persistAndFlush(shift);
//		
//		String searchStartDate = "2018-01-01";
//		String searchEndDate = "2018-01-03";
//		List<Shift> records = shiftDAO.getShifts(searchStartDate, searchEndDate, location.getLocationId());
//		
//		Assertions.assertNotNull(records);
//		Assertions.assertTrue(records.size() == 1);
//	}
}
