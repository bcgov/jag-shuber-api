-- set schema
SET search_path TO ${POSTGRES_SCHEMA};

-- RUN
INSERT INTO run (run_id,title,courthouse_id,created_by,updated_by,created_dtm,updated_dtm,revision_count)	 VALUES 	(uuid_generate_v4(),'Run 1',(SELECT c.courthouse_id FROM courthouse c WHERE c.courthouse_cd = '1201'),'test','test',now(),now(),0);
INSERT INTO run (run_id,title,courthouse_id,created_by,updated_by,created_dtm,updated_dtm,revision_count)	 VALUES 	(uuid_generate_v4(),'Run 2',(SELECT c.courthouse_id FROM courthouse c WHERE c.courthouse_cd = '1201'),'test','test',now(),now(),0);
INSERT INTO run (run_id,title,courthouse_id,created_by,updated_by,created_dtm,updated_dtm,revision_count)	 VALUES 	(uuid_generate_v4(),'Run 3',(SELECT c.courthouse_id FROM courthouse c WHERE c.courthouse_cd = '1201'),'test','test',now(),now(),0);
INSERT INTO run (run_id,title,courthouse_id,created_by,updated_by,created_dtm,updated_dtm,revision_count)	 VALUES 	(uuid_generate_v4(),'Run 4',(SELECT c.courthouse_id FROM courthouse c WHERE c.courthouse_cd = '1201'),'test','test',now(),now(),0);
INSERT INTO run (run_id,title,courthouse_id,created_by,updated_by,created_dtm,updated_dtm,revision_count)	 VALUES 	(uuid_generate_v4(),'Run 5',(SELECT c.courthouse_id FROM courthouse c WHERE c.courthouse_cd = '1201'),'test','test',now(),now(),0);
