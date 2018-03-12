package ca.bc.gov.jag.shuber.persistence.model;

import java.util.Date;
import java.util.UUID;

/**
 * Helper class to populate Entity objects with required fields so we can 
 * easily persist them.
 * 
 * @author michael.gabelmann
 */
public final class ModelUtil {
	private static Date now = new Date();
	private static String user = "test";
	private static int count = 0;
	
	/** Do not instantiate this class. */
	private ModelUtil() {}
	
	
	public static Sheriff getSheriff(
        String badgeNo,
        String userid) {
		
		return new Sheriff(null, badgeNo, userid, user, user, now, now, count);
	}
	
	public static Location getLocation(String locationName) {
		return new Location(null, locationName, user, user, now, now, count);
	}
	
	public static Courthouse getCourthouse(
		Location location, 
		String courthouseTypeCode,
		UUID orgUnitId) {
		
		return new Courthouse(location, courthouseTypeCode, orgUnitId, user, user, now, now, count);
	}
	
	public static Shift getShift(Courthouse courthouse) {
		return new Shift(null, courthouse, user, user, now, now, count);
	}
	
}
