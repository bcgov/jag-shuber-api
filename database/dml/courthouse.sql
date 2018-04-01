-- set schema
SET search_path TO ${POSTGRES_SCHEMA};

-- COURTHOUSE
INSERT INTO courthouse (courthouse_id,address_id,region_id,parent_courthouse_id,courthouse_cd,courthouse_name,location,created_by,updated_by,created_dtm,updated_dtm,revision_count)	 VALUES 	(uuid_generate_v4(),null,(SELECT r.region_id FROM REGION r WHERE r.region_cd = 'FRASER'),null,'3521','Chilliwack',null,'test','test',now(),now(),0);
INSERT INTO courthouse (courthouse_id,address_id,region_id,parent_courthouse_id,courthouse_cd,courthouse_name,location,created_by,updated_by,created_dtm,updated_dtm,revision_count)	 VALUES 	(uuid_generate_v4(),null,(SELECT r.region_id FROM REGION r WHERE r.region_cd = 'FRASER'),null,'3585','Surrey',null,'test','test',now(),now(),0);
INSERT INTO courthouse (courthouse_id,address_id,region_id,parent_courthouse_id,courthouse_cd,courthouse_name,location,created_by,updated_by,created_dtm,updated_dtm,revision_count)	 VALUES 	(uuid_generate_v4(),null,(SELECT r.region_id FROM REGION r WHERE r.region_cd = 'VANCOASTAL'),null,'2045','Vancouver - Robson Square',null,'test','test',now(),now(),0);
INSERT INTO courthouse (courthouse_id,address_id,region_id,parent_courthouse_id,courthouse_cd,courthouse_name,location,created_by,updated_by,created_dtm,updated_dtm,revision_count)	 VALUES 	(uuid_generate_v4(),null,(SELECT r.region_id FROM REGION r WHERE r.region_cd = 'VANISLAND'),null,'1201','Victoria',null,'test','test',now(),now(),0);
