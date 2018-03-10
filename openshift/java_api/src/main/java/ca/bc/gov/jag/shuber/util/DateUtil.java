package ca.bc.gov.jag.shuber.util;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Calendar;
import java.util.Date;

/**
 * 
 * @author michael.gabelmann
 */
public final class DateUtil {
	/** Do not instantiate this class. */
	private DateUtil() {}
	
	
	public static Date getDate(int year, int month, int dayOfMonth) {
		return DateUtil.getDate(year, month, dayOfMonth, 0, 0, 0);
	}
	
	public static Date getDate(int year, int month, int dayOfMonth, int hour, int minute, int second) {
		Calendar c = Calendar.getInstance();
		c.setLenient(true);
		c.set(year, month, dayOfMonth, hour, minute, second);
		c.set(Calendar.MILLISECOND, 0);
		
		return c.getTime();
	}
	
	public static LocalDateTime getLocalDateTime(int year, int month, int dayOfMonth, int hour, int minute, int second) {
		return LocalDateTime.of(year, month, dayOfMonth, hour, minute, second, 0);
	}
	
	public static Date getDate(LocalDateTime localDateTime) {
		return Date.from(localDateTime.atZone(ZoneId.systemDefault()).toInstant());
	}
	
	public static LocalDateTime getLocalDateTime(Date date) {
		return LocalDateTime.ofInstant(date.toInstant(), ZoneId.systemDefault());
	}
	
}
