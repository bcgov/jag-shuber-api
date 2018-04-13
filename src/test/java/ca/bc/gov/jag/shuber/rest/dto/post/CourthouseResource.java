package ca.bc.gov.jag.shuber.rest.dto.post;

/**
 * This class is used to POST to the end point.
 * 
 * @author michael.gabelmann
 */
public class CourthouseResource {
    public String region;
    public String courthouseCd;
    public String courthouseName;
    
	public CourthouseResource(String region, String courthouseCd, String courthouseName) {
		this.region = region;
		this.courthouseCd = courthouseCd;
		this.courthouseName = courthouseName;
	}
    
}
