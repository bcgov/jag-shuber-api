-- set schema
SET search_path TO ${POSTGRES_SCHEMA};

-- REGION
INSERT INTO region (region_id,region_cd,region_name,location,created_by,updated_by,created_dtm,updated_dtm,revision_count)	 VALUES 	(uuid_generate_v4(),'FRASER','Fraser',null,'test','test',now(),now(),0);
INSERT INTO region (region_id,region_cd,region_name,location,created_by,updated_by,created_dtm,updated_dtm,revision_count)	 VALUES 	(uuid_generate_v4(),'INTERIOR','Interior',null,'test','test',now(),now(),0);
INSERT INTO region (region_id,region_cd,region_name,location,created_by,updated_by,created_dtm,updated_dtm,revision_count)	 VALUES 	(uuid_generate_v4(),'NORTHERN','Northern',null,'test','test',now(),now(),0);
INSERT INTO region (region_id,region_cd,region_name,location,created_by,updated_by,created_dtm,updated_dtm,revision_count)	 VALUES 	(uuid_generate_v4(),'VANCOASTAL','Vancouver Coastal',null,'test','test',now(),now(),0);
INSERT INTO region (region_id,region_cd,region_name,location,created_by,updated_by,created_dtm,updated_dtm,revision_count)	 VALUES 	(uuid_generate_v4(),'VANISLAND','Vancouver Island',null,'test','test',now(),now(),0);
