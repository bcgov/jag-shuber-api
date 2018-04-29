package ca.bc.gov.jag.shuber.util;

import java.time.LocalDate;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

/**
 * 
 * @author michael.gabelmann
 */
public class DateUtilTest {

	@Test
	@DisplayName("Create resource for Monday")
	public void test1_createForDate() {
		long daysBitmap = 1; 
		LocalDate date = LocalDate.of(2018, 4, 2); //is a monday
		Assertions.assertTrue(DateUtil.createForDate(date, daysBitmap));
	}
	
	@Test
	@DisplayName("Create resource for days of week, but not weekend")
	public void test2_createForDate() { 
		long daysBitmap = 31; 
		LocalDate date = LocalDate.of(2018, 4, 2); //is a monday

		Assertions.assertTrue(DateUtil.createForDate(date, daysBitmap));
		Assertions.assertTrue(DateUtil.createForDate(date.plusDays(1), daysBitmap));
		Assertions.assertTrue(DateUtil.createForDate(date.plusDays(2), daysBitmap));
		Assertions.assertTrue(DateUtil.createForDate(date.plusDays(3), daysBitmap));
		Assertions.assertTrue(DateUtil.createForDate(date.plusDays(4), daysBitmap));
		Assertions.assertFalse(DateUtil.createForDate(date.plusDays(5), daysBitmap));
		Assertions.assertFalse(DateUtil.createForDate(date.plusDays(6), daysBitmap));
	}
	
	@Test
	@DisplayName("Create resource for weekend only")
	public void test3_createForDate() {
		long daysBitmap = 96; 
		LocalDate date = LocalDate.of(2018, 4, 2); //is a monday

		Assertions.assertFalse(DateUtil.createForDate(date, daysBitmap));
		Assertions.assertFalse(DateUtil.createForDate(date.plusDays(1), daysBitmap));
		Assertions.assertFalse(DateUtil.createForDate(date.plusDays(2), daysBitmap));
		Assertions.assertFalse(DateUtil.createForDate(date.plusDays(3), daysBitmap));
		Assertions.assertFalse(DateUtil.createForDate(date.plusDays(4), daysBitmap));
		Assertions.assertTrue(DateUtil.createForDate(date.plusDays(5), daysBitmap));
		Assertions.assertTrue(DateUtil.createForDate(date.plusDays(6), daysBitmap));
	}

}
