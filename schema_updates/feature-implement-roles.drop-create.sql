-- TRUNCATE TABLE shersched.app_role_permission CONTINUE IDENTITY CASCADE;
-- TRUNCATE TABLE shersched.app_role_frontend_scope CONTINUE IDENTITY CASCADE;
-- TRUNCATE TABLE shersched.frontend_scope_permission CONTINUE IDENTITY CASCADE;
-- TRUNCATE TABLE shersched.frontend_scope CONTINUE IDENTITY CASCADE;
-- TRUNCATE TABLE shersched.app_role_api_scope CONTINUE IDENTITY CASCADE;
-- TRUNCATE TABLE shersched.api_scope CONTINUE IDENTITY CASCADE;
-- TRUNCATE TABLE shersched.app_user_role CONTINUE IDENTITY CASCADE;
-- TRUNCATE TABLE shersched.app_user CONTINUE IDENTITY CASCADE;
-- TRUNCATE TABLE shersched.app_role CONTINUE IDENTITY CASCADE;

DROP TABLE IF EXISTS shersched.app_role_permission;

DROP TABLE IF EXISTS shersched.app_role_api_scope;
DROP TABLE IF EXISTS shersched.api_scope;

DROP TABLE IF EXISTS shersched.app_role_frontend_scope;
DROP TABLE IF EXISTS shersched.frontend_scope_permission;
DROP TABLE IF EXISTS shersched.frontend_scope;

DROP TABLE IF EXISTS shersched.app_user_role;
DROP TABLE IF EXISTS shersched.app_user;
DROP TABLE IF EXISTS shersched.app_role;

CREATE TABLE shersched.auth_role (
	role_id uuid NOT NULL,
	role_name varchar(128) NOT NULL,
	description varchar(200) NULL,
	created_by varchar(32) NOT NULL,
	updated_by varchar(32) NOT NULL,
	created_dtm timestamptz NOT NULL,
	updated_dtm timestamptz NOT NULL,
	revision_count numeric(10) NOT NULL,
	role_code varchar(128) NOT NULL,
	CONSTRAINT pk_role PRIMARY KEY (role_id)
);

CREATE TRIGGER trg_biu_role_stamp before
INSERT OR UPDATE ON shersched.auth_role FOR each row EXECUTE PROCEDURE shersched.tab_stamp();

CREATE TABLE shersched.auth_user (
	user_id uuid NOT NULL,
	siteminder_id uuid NULL,
	user_auth_id varchar(32) NULL,
	display_name varchar(100) NULL,
	system_account_ind int4 NOT NULL DEFAULT 0,
	default_location_id uuid NULL,
	created_by varchar(32) NOT NULL,
	sheriff_id uuid NULL,
	updated_by varchar(32) NOT NULL,
	created_dtm timestamptz NOT NULL,
	updated_dtm timestamptz NOT NULL,
	revision_count numeric(10) NOT NULL,
	CONSTRAINT pk_usr PRIMARY KEY (user_id)
);
CREATE INDEX ix_default_location ON shersched.auth_user USING btree (default_location_id);

ALTER TABLE shersched.auth_user ADD CONSTRAINT fk_default_location FOREIGN KEY (default_location_id) REFERENCES location(location_id);
ALTER TABLE shersched.auth_user ADD CONSTRAINT fk_sheriff FOREIGN KEY (sheriff_id) REFERENCES sheriff(sheriff_id);

CREATE TRIGGER trg_biu_user_stamp before
INSERT OR UPDATE ON shersched.auth_user FOR each row EXECUTE PROCEDURE shersched.tab_stamp();

CREATE TABLE shersched.auth_user_role (
	user_role_id uuid NOT NULL,
	user_id uuid NOT NULL,
	role_id uuid NOT NULL,
	effective_date date NOT NULL DEFAULT now(),
	expiry_date date NULL,
	location_id uuid NULL,
	created_by varchar(32) NOT NULL,
	updated_by varchar(32) NOT NULL,
	created_dtm timestamptz NOT NULL,
	updated_dtm timestamptz NOT NULL,
	revision_count numeric(10) NOT NULL,
	CONSTRAINT pk_user_role PRIMARY KEY (user_role_id)
);
CREATE INDEX ix_role ON shersched.auth_user_role USING btree (role_id);
CREATE INDEX ix_location ON shersched.auth_user_role USING btree (location_id);
CREATE INDEX ix_user ON shersched.auth_user_role USING btree (user_id);

ALTER TABLE shersched.auth_user_role ADD CONSTRAINT fk_role FOREIGN KEY (role_id) REFERENCES auth_role(role_id);
ALTER TABLE shersched.auth_user_role ADD CONSTRAINT fk_location FOREIGN KEY (location_id) REFERENCES location(location_id);
ALTER TABLE shersched.auth_user_role ADD CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES auth_user(user_id);

CREATE TRIGGER trg_biu_user_role_stamp before
INSERT OR UPDATE ON shersched.auth_user_role FOR each row EXECUTE PROCEDURE shersched.tab_stamp();

CREATE TABLE shersched.auth_api_scope (
	api_scope_id uuid NOT NULL,
	description varchar(200) NULL,
	created_by varchar(32) NOT NULL,
	updated_by varchar(32) NOT NULL,
	created_dtm timestamptz NOT NULL,
	updated_dtm timestamptz NOT NULL,
	revision_count numeric(10) NOT NULL,
	scope_name varchar(128) NOT NULL,
	scope_code varchar(128) NOT NULL,
	system_scope_ind bool NOT NULL DEFAULT false,
	CONSTRAINT pk_api_scope PRIMARY KEY (api_scope_id)
);

CREATE TRIGGER trg_biu_api_scope_stamp before
INSERT OR UPDATE ON shersched.auth_api_scope FOR each row EXECUTE PROCEDURE shersched.tab_stamp();

CREATE TABLE shersched.auth_role_api_scope (
	role_api_scope_id uuid NOT NULL,
	role_id uuid NOT NULL,
	api_scope_id uuid NOT NULL,
	created_by varchar(32) NOT NULL,
	updated_by varchar(32) NOT NULL,
	created_dtm timestamptz NOT NULL,
	updated_dtm timestamptz NOT NULL,
	revision_count numeric(10) NOT NULL,
	CONSTRAINT pk_role_api_scope PRIMARY KEY (role_api_scope_id)
);

ALTER TABLE shersched.auth_role_api_scope ADD CONSTRAINT fk_api_scope FOREIGN KEY (api_scope_id) REFERENCES auth_api_scope(api_scope_id);
ALTER TABLE shersched.auth_role_api_scope ADD CONSTRAINT fk_role FOREIGN KEY (role_id) REFERENCES auth_role(role_id);

CREATE TRIGGER trg_biu_role_api_scope_stamp before
INSERT OR UPDATE ON shersched.auth_role_api_scope FOR each row EXECUTE PROCEDURE shersched.tab_stamp();

CREATE TABLE shersched.auth_frontend_scope (
	frontend_scope_id uuid NOT NULL,
	scope_name varchar(128) NOT NULL,
	scope_code varchar(128) NOT NULL,
	system_scope_ind bool NOT NULL DEFAULT false,
	description varchar(200) NULL,
	created_by varchar(32) NULL,
	updated_by varchar(32) NULL,
	created_dtm timestamptz NOT NULL,
	updated_dtm timestamptz NOT NULL,
	revision_count numeric NOT NULL,
	CONSTRAINT pk_frontend_scope PRIMARY KEY (frontend_scope_id)
);

CREATE TRIGGER trg_biu_frontend_scope_stamp before
INSERT OR UPDATE ON shersched.auth_frontend_scope FOR each row EXECUTE PROCEDURE shersched.tab_stamp();

CREATE TABLE shersched.auth_frontend_scope_api (
	frontend_scope_api_id uuid NOT NULL,
	frontend_scope_id uuid NOT NULL,
	api_scope_id uuid NOT NULL,
	created_by varchar(32) NOT NULL,
	updated_by varchar(32) NOT NULL,
	created_dtm timestamptz NOT NULL,
	updated_dtm timestamptz NOT NULL,
	revision_count numeric(10) NOT NULL,
	CONSTRAINT pk_frontend_scope_api PRIMARY KEY (frontend_scope_api_id)
);

ALTER TABLE shersched.auth_frontend_scope_api ADD CONSTRAINT fk_frontend_scope FOREIGN KEY (frontend_scope_id) REFERENCES auth_frontend_scope(frontend_scope_id);
ALTER TABLE shersched.auth_frontend_scope_api ADD CONSTRAINT fk_api_scope FOREIGN KEY (api_scope_id) REFERENCES auth_api_scope(api_scope_id);

CREATE TRIGGER trg_biu_frontend_scope_api_stamp before
INSERT OR UPDATE ON shersched.auth_frontend_scope_api FOR each row EXECUTE PROCEDURE shersched.tab_stamp();

CREATE TABLE shersched.auth_frontend_scope_permission (
	frontend_scope_permission_id uuid NOT NULL,
	frontend_scope_id uuid NOT NULL,
	display_name varchar(128) NOT NULL,
	permission_code varchar(128) NOT NULL,
	description varchar(200) NULL,
	created_by varchar(32) NULL,
	updated_by varchar(32) NULL,
	created_dtm timestamptz NOT NULL,
	updated_dtm timestamptz NOT NULL,
	revision_count numeric NOT NULL,
	CONSTRAINT pk_frontend_scope_permission PRIMARY KEY (frontend_scope_permission_id)
);

ALTER TABLE shersched.auth_frontend_scope_permission ADD CONSTRAINT fk_frontend_scope FOREIGN KEY (frontend_scope_id) REFERENCES auth_frontend_scope(frontend_scope_id);

CREATE TRIGGER trg_biu_frontend_scope_permission_stamp before
INSERT OR UPDATE ON shersched.auth_frontend_scope_permission FOR each row EXECUTE PROCEDURE shersched.tab_stamp();

CREATE TABLE shersched.auth_role_frontend_scope (
	role_frontend_scope_id uuid NOT NULL,
	role_id uuid NOT NULL,
	frontend_scope_id uuid NOT NULL,
	created_by varchar(32) NULL,
	updated_by varchar(32) NULL,
	created_dtm timestamptz NOT NULL,
	updated_dtm timestamptz NOT NULL,
	revision_count numeric NOT NULL,
	CONSTRAINT pk_role_frontend_scope PRIMARY KEY (role_frontend_scope_id)
);

ALTER TABLE shersched.auth_role_frontend_scope ADD CONSTRAINT fk_role FOREIGN KEY (role_id) REFERENCES auth_role(role_id);
ALTER TABLE shersched.auth_role_frontend_scope ADD CONSTRAINT fk_frontend_scope FOREIGN KEY (frontend_scope_id) REFERENCES auth_frontend_scope(frontend_scope_id);

CREATE TRIGGER trg_biu_role_frontend_scope_stamp before
INSERT OR UPDATE ON shersched.auth_role_frontend_scope FOR each row EXECUTE PROCEDURE shersched.tab_stamp();

CREATE TABLE shersched.auth_role_permission (
	role_permission_id uuid NOT NULL,
	role_id uuid NOT NULL,
	role_frontend_scope_id uuid NULL,
	role_api_scope_id uuid NULL,
	frontend_scope_permission_id uuid NULL,
	api_scope_permission_id uuid NULL,
	created_by varchar(32) NULL,
	updated_by varchar(32) NULL,
	created_dtm timestamptz NOT NULL,
	updated_dtm timestamptz NOT NULL,
	revision_count numeric NOT NULL,
	CONSTRAINT pk_role_permission PRIMARY KEY (role_permission_id)
);

ALTER TABLE shersched.auth_role_permission ADD CONSTRAINT fk_role FOREIGN KEY (role_id) REFERENCES auth_role(role_id);
ALTER TABLE shersched.auth_role_permission ADD CONSTRAINT fk_role_api_scope FOREIGN KEY (role_api_scope_id) REFERENCES auth_role_api_scope(role_api_scope_id);
ALTER TABLE shersched.auth_role_permission ADD CONSTRAINT fk_role_frontend_scope FOREIGN KEY (role_frontend_scope_id) REFERENCES auth_role_frontend_scope(role_frontend_scope_id);
ALTER TABLE shersched.auth_role_permission ADD CONSTRAINT fk_frontend_permission_id FOREIGN KEY (frontend_scope_permission_id) REFERENCES auth_frontend_scope_permission(frontend_scope_permission_id);

CREATE TRIGGER trg_biu_role_permission_stamp before
INSERT OR UPDATE ON shersched.auth_role_permission FOR each row EXECUTE PROCEDURE shersched.tab_stamp();
