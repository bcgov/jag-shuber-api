package ca.bc.gov.jag.shuber.rest.dto;

import java.util.List;

import org.springframework.hateoas.ResourceSupport;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

/**
 * 
 * @author michael.gabelmann
 */
public class HateoasList<T> extends ResourceSupport {
	/** List of records. */
	private List<T> records;

	/** Constructor . */
	public HateoasList() {}
	
	/**
	 * Constructor.
	 * @param records records
	 */
	@JsonCreator
	public HateoasList(@JsonProperty("records") List<T> records) {
		this.records = records;
	}
	
	public List<T> getRecords() {
		return records;
	}

	public void setRecords(List<T> records) {
		this.records = records;
	}

}
