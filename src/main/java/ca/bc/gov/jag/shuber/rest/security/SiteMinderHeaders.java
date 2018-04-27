package ca.bc.gov.jag.shuber.rest.security;

/**
 * <p>Headers used by Siteminder and the BC Government.</p>
 * 
 * @see BuildingSiteminderEnabledApplications.doc
 * @author michael.gabelmann
 */
public final class SiteMinderHeaders {
	/** Do not instantiate this class. */
	private SiteMinderHeaders() {}
	
	
	//HEADERS
	//standard siteminder headers
	/** User. eg: abalpha (first initial, middle initial, last name) */
	public static final String SM_USER = "sm_user";
	
	/** User Domain Name.  eg: CN=XT:Alpha\, Albert B CSNR:IN,OU=Users,OU=Forests Lands and Natural Resource Operations,OU=BCGOV,DC=idir,DC=BCGOV */
	public static final String SM_USERDN = "sm_userdn";
	
	/** Number of seconds before session expires. eg: 12696 */
	public static final String SM_TIMETOEXPIRE = "sm_timetoexpire";
	
	
	//misc siteminder headers
	/** Transaction id. eg: 0000000000000000000000008e22dff2-18f1-5ae2427b-000b-3f9822b5 */
	public static final String SM_TRANSACTION_ID = "sm_transactionid";

	/** Domain. eg: .gov.bc.ca */
	public static final String SM_SDOMAIN = "sm_sdomain";
	
	/** Universal Id. eg: ABALPHA (first initial, middle initial, last name) */ 
	public static final String SM_UNIVERSALID = "sm_universalid";
	
	/** Authorization Directory Namespace. eg: LDAP: */
	public static final String SM_AUTHDIRNAMESPACE = "sm_authdirnamespace";
	
	/** Realm OID. eg: 06-0cb26016-7820-473e-a27f-b164bf15ec39 */
	public static final String SM_REALMOID = "sm_realmoid";
	
	/** Authorization Type. eg: Form */
	public static final String SM_AUTHTYPE = "sm_authtype";
	
	/** Authorization Reason. eg: 0 */
	public static final String SM_AUTHREASON = "sm_authreason";
	
	/** Authorization Directory OID. eg: 0e-f5ebb44c-1380-4f18-af75-9dd89770cfa8 */
	public static final String SM_AUTHDIROID = "sm_authdiroid";
	
	/** Authorization Directory Name. eg: IDIR */
	public static final String SM_AUTHDIRNAME = "sm_authdirname";
	
	/** Authorization Directory Server. eg: wagon.idir.bcgov wheel.idir.bcgov plywood.idir.bcgov veneer.idir.bcgov,wheel.idir.bcgov wagon.idir.bcgov veneer.idir.bcgov plywood.idir.bcgov,wagon.idir.bcgov wheel.idir.bcgov veneer.idir.bcgov plywood.idir.bcgov,wheel.idir.bcgov wagon.idir.bcgov plywood.idir.bcgov veneer.idir.bcgov */
	public static final String SM_AUTHDIRSERVER = "sm_authdirserver";
	
	/** Server session id. eg: 3Wx8NzbzqjWc7/fxmyPPQpNVCNw= */
	public static final String SM_SERVERSESSIONID = "sm_serversessionid";
	
	/** Server session spec. eg: IRic8+GWw1Y/jEOtrxMXFE1/nUUtogA28YKx766PKzsBROPvgxSt2BZJYA4OmB4KHwDmzCF8ixAdGGeHHdi928eLPB1zRZG4iXtcpRsJmILkS13147zbPS1BC7XYW0ZlJWZEqSruWj64YxXa33b++PG5YzGtpBeWPgSpwMO5jfuW95ZcQ7K1+9yaWeG6FGGr4i/qjE9ZNg0lUTCaRuQLeIqlm1goE/UNS1FHi6dLa41AhCItfCDBSfxoaCVloXHzA9G5yY896/QbjiGHs4top8oMOU3Yy82pNyc8Tr74i5mYfj17hjzd2jmhKp/xRMk0Ije6kLWjGE6Jp1fKYopkComH1G/bCLPvs6c4yJs24EZky1bjG/V5uvJBOGHxYjfZRjYMh2dfxCe3fsBGZuDW/0eTiDhQDAQ351a/P9Sgz8RB+xCnPkpp9e7PwHceUFoQa3/bFazds6Fex0DT4J2oMlqhKsQpStJQNUVTbU6KzNumPq/SyH+SGw== */
	public static final String SM_SERVERSESSIONSPEC = "sm_serversessionspec";
	
	/** Server identity spec. eg: (none) */
	public static final String SM_SERVERIDENTITYSPEC = "sm_serveridentityspec";

	
	//mandatory headers for BCGOV (IDIR, BCeID Basic, BCeID Personal, BCeID Business)
	/** User type. eg: Internal. */
	public static final String SMGOV_USERTYPE = "smgov_usertype";
	
	/** User identifier. 32 byte hex string. */
	public static final String SMGOV_USERIDENTIFIER = "smgov_useridentifier";
	
	/** 32 byte hex string that uniquely identifies the account. */
	public static final String SMGOV_USERGUID = "smgov_userguid";
	
	/** User display name. eg: XT:lastname, firstname C CSNR:IN. */
	public static final String SMGOV_USERDISPLAYNAME = "smgov_userdisplayname";
	
	
	//optional headers for BCGOV (IDIR, BCeID Basic, BCeID Personal, BCeID Business)
	/** User email. eg: firstname.lastname@cgi.com */
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

	
	//COOKIES
	/** 
	 * Siteminder session cookie. Will not exist prior to login, will be encrypted value if set, or LOGGEDOFF if 
	 * web service called to force logout. This value is UPPERCASE.
	 */
	public static final String SMSESSION = "SMSESSION";
	
}
