-- set schema
SET search_path TO ${POSTGRES_SCHEMA};

-- allow create of UUIDs
-- CREATE EXTENSION IF NOT EXISTS "uuid-ossp";


-- SHERIFF
INSERT INTO sheriff (sheriff_id,badge_no,location_id,userid,first_name,last_name,rank,image_url,created_by,updated_by,created_dtm,updated_dtm,revision_count)	 VALUES 	(uuid_generate_v4(),'BN10000',(SELECT location_id FROM location WHERE location_type_code = 'COURTHOUSE' AND location_name = 'VANCOUVER'),'userId10000','Fred','Flintstone','Sergeant','','test','test',now(),now(),0);
INSERT INTO sheriff (sheriff_id,badge_no,location_id,userid,first_name,last_name,rank,image_url,created_by,updated_by,created_dtm,updated_dtm,revision_count)	 VALUES 	(uuid_generate_v4(),'BN10001',(SELECT location_id FROM location WHERE location_type_code = 'COURTHOUSE' AND location_name = 'VANCOUVER'),'userId10001','Wilma','Flintstone','Sergeant','','test','test',now(),now(),0);
INSERT INTO sheriff (sheriff_id,badge_no,location_id,userid,first_name,last_name,rank,image_url,created_by,updated_by,created_dtm,updated_dtm,revision_count)	 VALUES 	(uuid_generate_v4(),'BN10002',(SELECT location_id FROM location WHERE location_type_code = 'COURTHOUSE' AND location_name = 'VICTORIA'),'userId10002','Barney','Rubble','Sergeant','','test','test',now(),now(),0);
INSERT INTO sheriff (sheriff_id,badge_no,location_id,userid,first_name,last_name,rank,image_url,created_by,updated_by,created_dtm,updated_dtm,revision_count)	 VALUES 	(uuid_generate_v4(),'BN10003',(SELECT location_id FROM location WHERE location_type_code = 'COURTHOUSE' AND location_name = 'VICTORIA'),'userId10003','Mr.','Slate','Control','','test','test',now(),now(),0);
INSERT INTO sheriff (sheriff_id,badge_no,location_id,userid,first_name,last_name,rank,image_url,created_by,updated_by,created_dtm,updated_dtm,revision_count)	 VALUES 	(uuid_generate_v4(),'BN10004',(SELECT location_id FROM location WHERE location_type_code = 'COURTHOUSE' AND location_name = 'VANCOUVER'),'userId10004','Pebbles','Flintstone','Pre-Trial','','test','test',now(),now(),0);
INSERT INTO sheriff (sheriff_id,badge_no,location_id,userid,first_name,last_name,rank,image_url,created_by,updated_by,created_dtm,updated_dtm,revision_count)	 VALUES 	(uuid_generate_v4(),'BN10005',(SELECT location_id FROM location WHERE location_type_code = 'COURTHOUSE' AND location_name = 'VICTORIA'),'userId10005','Betty','Rubble','Deputy Sergeant','','test','test',now(),now(),0);


-- select all sheriffs
-- SELECT s.* FROM shersched.sheriff s;
