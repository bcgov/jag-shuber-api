package ca.bc.gov.jag.shuber.rest.security;

/**
 * Headers used by Siteminder and the BC Government.
 * 
 * @see BuildingSiteminderEnabledApplications.doc
 * @author michael.gabelmann
 */
public final class SiteMinderHeaders {
	/** Do not instantiate this class. */
	private SiteMinderHeaders() {}
	
	//standard siteminder headers
	public static final String SM_USER = "sm_user";
	public static final String SM_USERDN = "sm_userdn";
	public static final String SM_TIMETOEXPIRE = "sm_timetoexpire";
	
	//mandatory headers for BCGOV (IDIR, BCeID Basic, BCeID Personal, BCeID Business)
	public static final String SMGOV_USERTYPE = "smgov_usertype";
	public static final String SMGOV_USERIDENTIFIER = "smgov_useridentifier";
	public static final String SMGOV_USERGUID = "smgov_userguid";
	public static final String SMGOV_USERDISPLAYNAME = "smgov_userdisplayname";
	
	//optional headers for BCGOV (IDIR, BCeID Basic, BCeID Personal, BCeID Business)
	public static final String SMGOV_USEREMAIL = "smgov_useremail";
	
	//additional mandatory headers for BCGOV (BCeID Business)
	public static final String SMGOV_BUSINESS_GUID = "smgov_business_guid";
	public static final String SMGOV_BUSINESSLEGALNAME = "smgov_businesslegalname";
	
	//additional optional headers for BCGOV (BCeID Business)
	public static final String SMGOV_BUSINESSNUMBER = "smgov_businessnumber";
	
	//mandatory headers for BC Services Card
	//incldues SMGOV_USERTYPE, SMGOV_USERIDENTIFIER
	
	//optional headers for BC Services Card
	//includes SMGOV_USERGUID, SMGOV_USERDISPLAYNAME, SMGOV_USEREMAIL
	public static final String SMGOV_SURNAME = "smgov_surname";
	public static final String SMGOV_GIVENNAME = "smgov_givenname";
	public static final String SMGOV_GIVENNAMES = "smgov_givennames";
	public static final String SMGOV_BIRTHDATE = "smgov_birthdate";
	public static final String SMGOV_AGE = "smgov_age";
	public static final String SMGOV_AGE19OROVER = "smgov_age19orover";
	public static final String SMGOV_SEX = "smgov_sex";
	public static final String SMGOV_STREETADDRESS = "smgov_streetaddress";
	public static final String SMGOV_CITY = "smgov_city";
	public static final String SMGOV_PROVINCE = "smgov_province";
	public static final String SMGOV_POSTALCODE = "smgov_postalcode";
	public static final String SMGOV_COUNTRY = "smgov_country";
	public static final String SMGOV_ADDRESSBLOCK = "smgov_addressblock";
	public static final String SMGOV_TRANSACTIONIDENTIFIER = "smgov_transactionidentifier";
	public static final String SMGOV_IDENTITYASSURANCELEVEL1 = "smgov_identityassurancelevel1";
	public static final String SMGOV_IDENTITYASSURANCELEVEL2 = "smgov_identityassurancelevel2";
	public static final String SMGOV_IDENTITYASSURANCELEVEL3 = "smgov_identityassurancelevel3";
	
}
