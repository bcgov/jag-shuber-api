-- set schema
SET search_path TO ${POSTGRES_SCHEMA};

-- SHERIFF_RANK_CODE
INSERT INTO sheriff_rank_code (
	sheriff_rank_code, description, effective_date, expiry_date, created_by, updated_by, created_dtm, updated_dtm, revision_count)
	VALUES ('CHIEFSHERIFF', 'Chief Sheriff', to_date('2018-01-01','yyyy-MM-dd'), null, 'test', 'test', now(), now(), 0);

INSERT INTO sheriff_rank_code (
	sheriff_rank_code, description, effective_date, expiry_date, created_by, updated_by, created_dtm, updated_dtm, revision_count)
	VALUES ('SUPERINTENDENT', 'Superintendent', to_date('2018-01-01','yyyy-MM-dd'), null, 'test', 'test', now(), now(), 0);
    
INSERT INTO sheriff_rank_code (
	sheriff_rank_code, description, effective_date, expiry_date, created_by, updated_by, created_dtm, updated_dtm, revision_count)
	VALUES ('STAFFINSPECTOR', 'Staff Inspector', to_date('2018-01-01','yyyy-MM-dd'), null, 'test', 'test', now(), now(), 0);

INSERT INTO sheriff_rank_code (
	sheriff_rank_code, description, effective_date, expiry_date, created_by, updated_by, created_dtm, updated_dtm, revision_count)
	VALUES ('INSPECTOR', 'Inspector', to_date('2018-01-01','yyyy-MM-dd'), null, 'test', 'test', now(), now(), 0);
    
INSERT INTO sheriff_rank_code (
	sheriff_rank_code, description, effective_date, expiry_date, created_by, updated_by, created_dtm, updated_dtm, revision_count)
	VALUES ('STAFFSERGEANT', 'Staff Sergeant', to_date('2018-01-01','yyyy-MM-dd'), null, 'test', 'test', now(), now(), 0);
    
INSERT INTO sheriff_rank_code (
	sheriff_rank_code, description, effective_date, expiry_date, created_by, updated_by, created_dtm, updated_dtm, revision_count)
	VALUES ('SERGEANT', 'Sergeant', to_date('2018-01-01','yyyy-MM-dd'), null, 'test', 'test', now(), now(), 0);
    
INSERT INTO sheriff_rank_code (
	sheriff_rank_code, description, effective_date, expiry_date, created_by, updated_by, created_dtm, updated_dtm, revision_count)
	VALUES ('DEPUTYSHERIFF', 'Deputy Sheriff', to_date('2018-01-01','yyyy-MM-dd'), null, 'test', 'test', now(), now(), 0);
