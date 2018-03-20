-- set schema
SET search_path TO ${POSTGRES_SCHEMA};

-- allow create of UUIDs
-- CREATE EXTENSION IF NOT EXISTS "uuid-ossp";


-- LOCATION_CODE
INSERT INTO location_code(
	location_code, description, effective_date, expiry_date, created_by, updated_by, created_dtm, updated_dtm, revision_count)
	VALUES ('COURTHOUSE', 'Courthouse', to_date('2018-01-01','yyyy-MM-dd'), null, 'test', 'test', now(), now(), 0);

INSERT INTO location_code(
	location_code, description, effective_date, expiry_date, created_by, updated_by, created_dtm, updated_dtm, revision_count)
	VALUES ('REGION', 'Region', to_date('2018-01-01','yyyy-MM-dd'), null, 'test', 'test', now(), now(), 0);

INSERT INTO location_code(
	location_code, description, effective_date, expiry_date, created_by, updated_by, created_dtm, updated_dtm, revision_count)
	VALUES ('COURTROOM', 'Courtroom', to_date('2018-01-01','yyyy-MM-dd'), null, 'test', 'test', now(), now(), 0);


-- select all location codes
-- SELECT lc.* FROM location_code lc;
