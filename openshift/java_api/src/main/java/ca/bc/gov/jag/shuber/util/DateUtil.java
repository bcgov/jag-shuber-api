package ca.bc.gov.jag.shuber.util;

import java.text.SimpleDateFormat;
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
	
	
	/**
	 * Get a date.
	 * @param year
	 * @param month
	 * @param dayOfMonth
	 * @return
	 */
	public static Date getDate(int year, int month, int dayOfMonth) {
		return DateUtil.getDate(year, month, dayOfMonth, 0, 0, 0);
	}
	
	/**
	 * Get a date.
	 * @param year
	 * @param month
	 * @param dayOfMonth
	 * @param hour
	 * @param minute
	 * @param second
	 * @return
	 */
	public static Date getDate(int year, int month, int dayOfMonth, int hour, int minute, int second) {
		Calendar c = Calendar.getInstance();
		c.setLenient(true);
		c.set(year, month, dayOfMonth, hour, minute, second);
		c.set(Calendar.MILLISECOND, 0);
		
		return c.getTime();
	}
	
	/**
	 * Get date and time.
	 * @param year
	 * @param month
	 * @param dayOfMonth
	 * @param hour
	 * @param minute
	 * @param second
	 * @return
	 */
	public static LocalDateTime getLocalDateTime(int year, int month, int dayOfMonth, int hour, int minute, int second) {
		return LocalDateTime.of(year, month, dayOfMonth, hour, minute, second, 0);
	}
	
	/**
	 * Convert JODA date and time to date.
	 * @param localDateTime
	 * @return
	 */
	public static Date getDate(LocalDateTime localDateTime) {
		assert localDateTime != null : "localDateTime cannot be null";
		
		return Date.from(localDateTime.atZone(ZoneId.systemDefault()).toInstant());
	}
	
	/**
	 * Convert date to JODA date and time.
	 * @param date
	 * @return
	 */
	public static LocalDateTime getLocalDateTime(Date date) {
		assert date != null : "date cannot be null";
		
		return LocalDateTime.ofInstant(date.toInstant(), ZoneId.systemDefault());
	}
	
	/**
	 * Convert a date into a string.
	 * @param date
	 * @return
	 */
	public static String getDateString(Date date) {
		return DateUtil.getDateString(date, Constants.DATE_FORMAT);
	}
	
	/**
	 * Convert a date into a string.
	 * @param date
	 * @param dateformat
	 * @return
	 */
	public static String getDateString(Date date, String dateformat) {
		assert date != null : "date cannot be null";
		assert dateformat != null : "dateformat cannot be null";
		
		SimpleDateFormat sdf = new SimpleDateFormat(dateformat);
		return sdf.format(date);
	}
	
}
