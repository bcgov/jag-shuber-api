-- set schema
SET search_path TO shersched;

-- allow create of UUIDs
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";


-- WORK_SECTION_CODE
INSERT INTO work_section_code(
	work_section_code, description, effective_date, expiry_date, created_by, updated_by, created_dtm, updated_dtm, revision_count)
	VALUES ('COURTS', 'Courts', to_date('2018-01-01','yyyy-MM-dd'), null, 'test', 'test', now(), now(), 0);
   
INSERT INTO work_section_code(
	work_section_code, description, effective_date, expiry_date, created_by, updated_by, created_dtm, updated_dtm, revision_count)
	VALUES ('JAIL', 'Jail', to_date('2018-01-01','yyyy-MM-dd'), null, 'test', 'test', now(), now(), 0);
 
INSERT INTO work_section_code(
	work_section_code, description, effective_date, expiry_date, created_by, updated_by, created_dtm, updated_dtm, revision_count)
	VALUES ('ESCORTS', 'Escorts', to_date('2018-01-01','yyyy-MM-dd'), null, 'test', 'test', now(), now(), 0);
 
INSERT INTO work_section_code(
	work_section_code, description, effective_date, expiry_date, created_by, updated_by, created_dtm, updated_dtm, revision_count)
	VALUES ('OTHER', 'Other', to_date('2018-01-01','yyyy-MM-dd'), null, 'test', 'test', now(), now(), 0);
    

-- select all work section codes
SELECT w.* FROM work_section_code w;
 