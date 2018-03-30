-- set schema
SET search_path TO ${POSTGRES_SCHEMA};

-- JAIL_ROLE_CODE
INSERT INTO jail_role_code (
	jail_role_code, description, effective_date, expiry_date, created_by, updated_by, created_dtm, updated_dtm, revision_count)
	VALUES ('SERGEANT', 'Sergeant', to_date('2018-01-01','yyyy-MM-dd'), null, 'test', 'test', now(), now(), 0);

INSERT INTO jail_role_code (
	jail_role_code, description, effective_date, expiry_date, created_by, updated_by, created_dtm, updated_dtm, revision_count)
	VALUES ('DEPUTYSERGEANT', 'Deputy Sergeant', to_date('2018-01-01','yyyy-MM-dd'), null, 'test', 'test', now(), now(), 0);

INSERT INTO jail_role_code (
	jail_role_code, description, effective_date, expiry_date, created_by, updated_by, created_dtm, updated_dtm, revision_count)
	VALUES ('CONTROL', 'Control', to_date('2018-01-01','yyyy-MM-dd'), null, 'test', 'test', now(), now(), 0);

INSERT INTO jail_role_code (
	jail_role_code, description, effective_date, expiry_date, created_by, updated_by, created_dtm, updated_dtm, revision_count)
	VALUES ('PRETRIAL', 'Pre Trial', to_date('2018-01-01','yyyy-MM-dd'), null, 'test', 'test', now(), now(), 0);
 