package ca.bc.gov.jag.shuber.persistence;

/**
 * Interface to help the UI manage resources better.
 * 
 * @author michael.gabelmann
 */
public interface RestPath {
	/** 
	 * Returns the path and id to a REST resource. Used in place of Spring Data REST
	 * self links.
	 * 
	 * @return path and id. eg: /courtrooms/39389d74-1e2f-41fa-9585-3aae57c8fd6a
	 */
	String getIdPath();
	
}
