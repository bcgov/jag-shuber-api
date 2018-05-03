package ca.bc.gov.jag.shuber.rest.dto.post;

/**
 * This class is used to POST to the end point.
 * 
 * @author michael.gabelmann
 */
public class CourtroomResource {
	public String courthouse;
	public String courtroomCd;
	public String courtroomName;
	
	public CourtroomResource(String courthouse, String courtroomCd, String courtroomName) {
		this.courthouse = courthouse;
		this.courtroomCd = courtroomCd;
		this.courtroomName = courtroomName;
	}
	
}
