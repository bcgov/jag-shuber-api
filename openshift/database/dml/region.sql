-- set schema
SET search_path TO shersched;

-- allow create of UUIDs
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";


-- LOCATION
INSERT INTO location (location_id,location_type_code,parent_location_id,location_name,description,address,created_by,updated_by,created_dtm,updated_dtm,revision_count)	 VALUES 	(uuid_generate_v4(),'REGION',null,'FRASER','Fraser Valley','address','test','test',now(),now(),0);
INSERT INTO location (location_id,location_type_code,parent_location_id,location_name,description,address,created_by,updated_by,created_dtm,updated_dtm,revision_count)	 VALUES 	(uuid_generate_v4(),'REGION',null,'INTERIOR','Interior','address','test','test',now(),now(),0);
INSERT INTO location (location_id,location_type_code,parent_location_id,location_name,description,address,created_by,updated_by,created_dtm,updated_dtm,revision_count)	 VALUES 	(uuid_generate_v4(),'REGION',null,'NORTHERN','Northern','address','test','test',now(),now(),0);
INSERT INTO location (location_id,location_type_code,parent_location_id,location_name,description,address,created_by,updated_by,created_dtm,updated_dtm,revision_count)	 VALUES 	(uuid_generate_v4(),'REGION',null,'VANCENTRE','Vancouver Centre','address','test','test',now(),now(),0);
INSERT INTO location (location_id,location_type_code,parent_location_id,location_name,description,address,created_by,updated_by,created_dtm,updated_dtm,revision_count)	 VALUES 	(uuid_generate_v4(),'REGION',null,'VANISLAND','Vancouver Island','address','test','test',now(),now(),0);


-- REGION
INSERT INTO region (location_id,geometry,created_by,updated_by,created_dtm,updated_dtm,revision_count)	 VALUES 	((SELECT location_id FROM location WHERE location_type_code = 'REGION' AND location_name = 'FRASER'),null,'test','test',now(),now(),0);
INSERT INTO region (location_id,geometry,created_by,updated_by,created_dtm,updated_dtm,revision_count)	 VALUES 	((SELECT location_id FROM location WHERE location_type_code = 'REGION' AND location_name = 'INTERIOR'),null,'test','test',now(),now(),0);
INSERT INTO region (location_id,geometry,created_by,updated_by,created_dtm,updated_dtm,revision_count)	 VALUES 	((SELECT location_id FROM location WHERE location_type_code = 'REGION' AND location_name = 'NORTHERN'),null,'test','test',now(),now(),0);
INSERT INTO region (location_id,geometry,created_by,updated_by,created_dtm,updated_dtm,revision_count)	 VALUES 	((SELECT location_id FROM location WHERE location_type_code = 'REGION' AND location_name = 'VANCENTRE'),null,'test','test',now(),now(),0);
INSERT INTO region (location_id,geometry,created_by,updated_by,created_dtm,updated_dtm,revision_count)	 VALUES 	((SELECT location_id FROM location WHERE location_type_code = 'REGION' AND location_name = 'VANISLAND'),null,'test','test',now(),now(),0);


-- select all regions
SELECT r.* FROM region r;
