-- set schema
SET search_path TO ${POSTGRES_SCHEMA};

-- OTHER_ASSIGN_CODE
INSERT INTO other_assign_code (
	other_assign_code, description, effective_date, expiry_date, created_by, updated_by, created_dtm, updated_dtm, revision_count)
	VALUES ('GATE1', 'Gate 1', to_date('2018-01-01','yyyy-MM-dd'), null, 'test', 'test', now(), now(), 0);

INSERT INTO other_assign_code (
	other_assign_code, description, effective_date, expiry_date, created_by, updated_by, created_dtm, updated_dtm, revision_count)
	VALUES ('GATE2', 'Gate 2', to_date('2018-01-01','yyyy-MM-dd'), null, 'test', 'test', now(), now(), 0);
    
INSERT INTO other_assign_code (
	other_assign_code, description, effective_date, expiry_date, created_by, updated_by, created_dtm, updated_dtm, revision_count)
	VALUES ('JURYSELECT', 'Jury Selection', to_date('2018-01-01','yyyy-MM-dd'), null, 'test', 'test', now(), now(), 0);
    
INSERT INTO other_assign_code (
	other_assign_code, description, effective_date, expiry_date, created_by, updated_by, created_dtm, updated_dtm, revision_count)
	VALUES ('JURYDELIB', 'Jury Deliberation', to_date('2018-01-01','yyyy-MM-dd'), null, 'test', 'test', now(), now(), 0);
    
INSERT INTO other_assign_code (
	other_assign_code, description, effective_date, expiry_date, created_by, updated_by, created_dtm, updated_dtm, revision_count)
	VALUES ('DOCUMENTS', 'Documents', to_date('2018-01-01','yyyy-MM-dd'), null, 'test', 'test', now(), now(), 0);
