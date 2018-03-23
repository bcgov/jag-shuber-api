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
	
	
	public static AssignmentStream getAssignmentStream(
		Courthouse courthouse, 
		UUID orgUnitId) {
		
		return new AssignmentStream(null, courthouse, orgUnitId, user, user, now, now, count);
	}
	
	public static Courthouse getCourthouse(
		Location location, 
		String courthouseTypeCode,
		UUID orgUnitId) {
		
		return new Courthouse(location, courthouseTypeCode, orgUnitId, user, user, now, now, count);
	}
	
	public static Courtroom getCourtroom(
		Location location, 
		String roomNumber) {
		
		return new Courtroom(location, roomNumber, user, user, now, now, count);
	}
	
	public static DaysBitmapCode getDaysBitmapCode(
		String bitmapSet, 
		int daySequence,
		String dayLabel, 
		long bitmapValue, 
		String description, 
		Date effectiveDate) {
		
		DaysBitmapCodeId id = new DaysBitmapCodeId(bitmapSet, daySequence);
		return new DaysBitmapCode(id, dayLabel, bitmapValue, description, effectiveDate, user, user, now, now, count);
	}
	
	public static Duty getDuty() {
		return new Duty(null, user, user, now, now, count);
	}
	
	public static DutyTemplate getDutyTemplate() {
		return new DutyTemplate(null, user, user, now, now, count);
	}
	
	public static Location getLocation(String locationName) {
		return new Location(null, locationName, user, user, now, now, count);
	}
	
	public static LocationCode getLocationCode(
		String locationCode, 
		String description, 
		Date effectiveDate) {
		
		return new LocationCode(locationCode, description, effectiveDate, user, user, now, now, count);
	}
	
	public static Recurrence getRecurrence(long recurrenceDaysBitmap) {
		return new Recurrence(null, recurrenceDaysBitmap, user, user, now, now, count);
	}
	
	public static Region getRegion(Location location) {
		return new Region(location, user, user, now, now, count);
	}
	
	public static Sheriff getSheriff(
        String badgeNo,
        String userid) {
		
		return new Sheriff(null, badgeNo, userid, user, user, now, now, count);
	}
	
	public static Shift getShift(Courthouse courthouse) {
		return new Shift(null, courthouse, user, user, now, now, count);
	}	
	
	public static ShiftTemplate getShiftTemplate(
		UUID locationId, 
		int rotationSequence) {
		
		return new ShiftTemplate(null, locationId, rotationSequence, user, user, now, now, count);
	}
	
	public static WorkSectionCode getWorkSectionCode(
		String workSectionCode, 
		Date effectiveDate) {
		
		return new WorkSectionCode(workSectionCode, effectiveDate, user, user, now, now, count);
	}
	
}
