package ca.bc.gov.jag.shuber.rest.dto.post;

/**
 * This class is used to POST to the end point.
 * 
 * @author michael.gabelmann
 */
public class RegionResource {
	public String regionCd;
	public String regionName;
	public String location;

	public RegionResource(String regionCd, String regionName, String location) {
		this.regionCd = regionCd;
		this.regionName = regionName;
		this.location = location;
	}
}
