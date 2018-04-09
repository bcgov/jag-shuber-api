package ca.bc.gov.jag.shuber.rest.model;

/**
 * This class is used to POST to the end point.
 * 
 * @author michael.gabelmann
 */
public class SheriffResource {
	public String badgeNo;
	public String userid;
	public String sheriffRankCode;
	public String firstName;
	public String lastName;
	
	public SheriffResource(String badgeNo, String userid, String sheriffRankCode, String firstName, String lastName) {
		this.badgeNo = badgeNo;
		this.userid = userid;
		this.sheriffRankCode = sheriffRankCode;
		this.firstName = firstName;
		this.lastName = lastName;
	}

}
