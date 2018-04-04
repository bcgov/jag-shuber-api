package ca.bc.gov.jag.shuber.persistence.model;

import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalTime;

/**
 * Helper class to populate Entity objects with required fields so we can 
 * easily persist them.
 * 
 * @author michael.gabelmann
 */
public final class ModelUtil {
	private static Instant now = Instant.now();
	private static LocalDate nowDate = LocalDate.now();
	private static String user = "test";
	private static int count = 0;
	
	/** Do not instantiate this class. */
	private ModelUtil() {}
	
	
	public static OtherAssignCode getOtherAssignCode(
		String otherAssignCode,
	    String description,
	    LocalDate effectiveDate) {
			
		return new OtherAssignCode(
            otherAssignCode,
            description, 
            effectiveDate,
            user, user, now, now, count);
	}
	
	public static JailRoleCode getJailRoleCode(
		String jailRoleCode,
	    String description,
	    LocalDate effectiveDate) {
			
		return new JailRoleCode(
            jailRoleCode,
            description,
            effectiveDate,
            user, user, now, now, count);
	}
	
	public static SheriffRankCode getSheriffRankCode(
		String sheriffRankCode,
        String description,
        LocalDate effectiveDate) {
		
		return new SheriffRankCode(
            sheriffRankCode,
            description,
            effectiveDate,
            user, user, now, now, count);
	}
	
	public static WorkSectionCode getWorkSectionCode(
		String workSectionCode,
	    String description,
	    LocalDate effectiveDate) {
			
		return new WorkSectionCode(
            workSectionCode,
            description,
            effectiveDate,
            user, user, now, now, count);
	}
	
	public static Region getRegion(
		String regionCd, 
		String regionName) {
		
		return new Region(
			null,
            regionCd,
            regionName,
            user, user, now, now, count);
	}
	
	public static Courthouse getCourthouse(
		Region region,
		String courthouseCd,
		String courthouseName) {
		
		return new Courthouse(
            null,
            region,
            courthouseCd,
            courthouseName,
            user, user, now, now, count);
	}
	
	public static Courtroom getCourtroom(
		Courthouse courthouse,
		String courtroomCd,
		String courtroomName) {
		return new Courtroom(
			null,
            courthouse,
            courtroomCd,
            courtroomName,
            user, user, now, now, count);
	}
	
	public static Sheriff getSheriff(
		SheriffRankCode sheriffRankCode,
		String badgeNo,
		String userid) {
		
		return new Sheriff(
            null,
            sheriffRankCode,
            badgeNo,
            userid,
            user, user, now, now, count);
	}
	
	public static Assignment getAssignment(
		Courthouse courthouse,
        WorkSectionCode workSectionCode,
        String title) {
		
		return new Assignment(
            null,
            courthouse,
            workSectionCode,
            title,
            user, user, now, now, count);
	}
	
	public static Duty getDuty(
		Assignment assignment,
        byte sheriffsRequired) {
		
		return new  Duty(
			null,
            assignment,
            sheriffsRequired,
            user, user, now, now, count);
	}
	
	public static DutyRecurrence getDutyRecurrence(
		Assignment assignment,
        LocalTime startTime,
        LocalTime endTime,
        long daysBitmap,
        byte sheriffsRequired) {
		
		return new DutyRecurrence(
			null,
            assignment,
            startTime,
            endTime,
            daysBitmap,
            sheriffsRequired,
            user, user, now, now, count);
	}
	
	public static Run getRun(
		Courthouse courthouse,
        String title) {
		
		return new Run(
			null,
            courthouse,
            title,
            user, user, now, now, count);
	}
	
	public static SheriffDuty getSheriffDuty(
		Duty duty,
        Sheriff sheriff) {
		
		return new SheriffDuty(
            null,
            duty,
            sheriff,
            user, user, now, now, count);
	}
	
}
