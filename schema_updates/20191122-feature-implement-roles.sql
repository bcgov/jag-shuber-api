CREATE TABLE IF NOT EXISTS app_user (
	app_user_id uuid NOT NULL,
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
	CONSTRAINT pk_usr PRIMARY KEY (app_user_id)
);
CREATE INDEX ix_usr_dflocn ON shersched.app_user USING btree (default_location_id);

ALTER TABLE shersched.app_user ADD CONSTRAINT fk_usr_dflocn FOREIGN KEY (default_location_id) REFERENCES location(location_id);
ALTER TABLE shersched.app_user ADD CONSTRAINT fk_usr_shr FOREIGN KEY (sheriff_id) REFERENCES sheriff(sheriff_id);

CREATE TABLE IF NOT EXISTS app_role (
	app_role_id uuid NOT NULL,
	app_role_name varchar(32) NOT NULL,
	description varchar(200) NOT NULL,
	created_by varchar(32) NOT NULL,
	updated_by varchar(32) NOT NULL,
	created_dtm timestamptz NOT NULL,
	updated_dtm timestamptz NOT NULL,
	revision_count numeric(10) NOT NULL,
	CONSTRAINT pk_aprl PRIMARY KEY (app_role_id)
);

CREATE TABLE IF NOT EXISTS app_user_role (
	app_user_role_id uuid NOT NULL,
	app_user_id uuid NOT NULL,
	app_role_id uuid NOT NULL,
	effective_date date NOT NULL DEFAULT now(),
	expiry_date date NULL,
	location_id uuid NULL,
	created_by varchar(32) NOT NULL,
	updated_by varchar(32) NOT NULL,
	created_dtm timestamptz NOT NULL,
	updated_dtm timestamptz NOT NULL,
	revision_count numeric(10) NOT NULL,
	CONSTRAINT pk_apusrl PRIMARY KEY (app_user_role_id)
);
CREATE INDEX ix_usrl_aprl ON shersched.app_user_role USING btree (app_role_id);
CREATE INDEX ix_usrl_locn ON shersched.app_user_role USING btree (location_id);
CREATE INDEX ix_usrl_usr ON shersched.app_user_role USING btree (app_user_id);

ALTER TABLE shersched.app_user_role ADD CONSTRAINT fk_apusrl_aprl FOREIGN KEY (app_role_id) REFERENCES app_role(app_role_id);
ALTER TABLE shersched.app_user_role ADD CONSTRAINT fk_apusrl_locn FOREIGN KEY (location_id) REFERENCES location(location_id);
ALTER TABLE shersched.app_user_role ADD CONSTRAINT fk_apusrl_usr FOREIGN KEY (app_user_id) REFERENCES app_user(app_user_id);

CREATE TABLE IF NOT EXISTS frontend_scope (
    frontend_scope_id uuid NOT NULL,
    scope_name varchar(128) NOT NULL,
    scope_code varchar(128) NOT NULL,
    system_scope_ind boolean DEFAULT false NOT NULL,
    description varchar(255),
    created_by varchar(32),
    updated_by varchar(32),
    created_dtm timestamptz NOT NULL,
    updated_dtm timestamptz NOT NULL,
    revision_count numeric NOT NULL,
    CONSTRAINT pk_frontend_scope PRIMARY KEY (frontend_scope_id)
);

CREATE TABLE IF NOT EXISTS app_role_frontend_scope (
    app_role_frontend_scope_id uuid NOT NULL,
    app_role_id uuid NOT NULL,
    frontend_scope_id uuid NOT NULL,
    created_by varchar(32),
    updated_by varchar(32),
    created_dtm timestamptz NOT NULL,
    updated_dtm timestamptz NOT NULL,
    revision_count numeric NOT NULL,
    CONSTRAINT pk_app_role_frontend_scope PRIMARY KEY (app_role_frontend_scope_id),
    CONSTRAINT fk_app_role FOREIGN KEY (app_role_id) REFERENCES app_role(app_role_id)
    CONSTRAINT fk_frontend_scope FOREIGN KEY (frontend_scope_id) REFERENCES frontend_scope(frontend_scope_id)
);

CREATE TABLE IF NOT EXISTS app_role_permission (
    app_role_permission_id uuid NOT NULL,
    app_role_id uuid NOT NULL,
    app_role_frontend_scope_id uuid NULL,
    app_role_api_scope_id uuid NULL,
    display_name varchar(128) NOT NULL,
    description varchar(255),
    created_by varchar(32),
    updated_by varchar(32),
    created_dtm timestamptz NOT NULL,
    updated_dtm timestamptz NOT NULL,
    revision_count numeric NOT NULL,
    CONSTRAINT pk_app_role_permission PRIMARY KEY (app_role_permission_id),
    CONSTRAINT fk_app_role FOREIGN KEY (app_role_id) REFERENCES app_role(app_role_id),
    CONSTRAINT fk_app_role_frontend_scope FOREIGN KEY (app_role_frontend_scope_id) REFERENCES app_role_frontend_scope(app_role_frontend_scope_id),
    CONSTRAINT fk_app_role_api_scope FOREIGN KEY (app_role_api_scope_id) REFERENCES app_role_api_scope(app_role_api_scope_id)
);

ALTER TABLE frontend_scope OWNER TO shersched;
GRANT ALL ON TABLE frontend_scope TO shersched;
GRANT ALL ON TABLE frontend_scope TO postgres;

ALTER TABLE app_role_frontend_scope OWNER TO shersched;
GRANT ALL ON TABLE app_role_frontend_scope TO shersched;
GRANT ALL ON TABLE app_role_frontend_scope TO postgres;

ALTER TABLE app_role_permission OWNER TO shersched;
GRANT ALL ON TABLE app_role_permission TO shersched;
GRANT ALL ON TABLE app_role_permission TO postgres;

--insert into api_scope () values()
--insert into frontend_scope () values ()
--insert into app_role () values()
--insert into app_role_permissions() values ()
--insert into app_role_frontend_scope () values ()
--insert into app_role_api_scope () values ()
--insert into app_user_role () values()


-- New stuff
--ALTER TABLE shersched.app_user ALTER COLUMN system_account_ind TYPE bool USING system_account_ind::bool;
--ALTER TABLE shersched.app_user ALTER COLUMN user_auth_id DROP NOT NULL;
-- RUN as superuser
--CREATE EXTENSION IF NOT EXISTS "uuid-ossp";


-- Seed initial users and roles data
INSERT INTO shersched.app_user (app_user_id,siteminder_id,user_auth_id,display_name,system_account_ind,default_location_id,created_by,sheriff_id,updated_by,created_dtm,updated_dtm,revision_count) VALUES
('d9772aab-6e5e-4b41-87b2-3294009e6d28',NULL,NULL,'Test User',0,'65b2e8fb-0d64-4f63-853c-76d8d359760e','anon$shersched','67eb2070-d359-40cf-a309-0a3ba0049b72','anon$shersched','2019-12-02 00:04:40.757','2019-12-02 00:04:40.757',0)
;

INSERT INTO shersched.app_role (app_role_id,app_role_name,description,created_by,updated_by,created_dtm,updated_dtm,revision_count) VALUES
('80294c81-cad7-4e58-ace1-76587d36530e','Administrator','Administrator','anon$shersched','anon$shersched','2019-12-02 09:51:28.701','2019-12-02 09:51:28.701',0)
,('2b0e8dd8-fd2f-4b28-bdea-0f9c20cf5bc0','Sheriff','Sheriff','anon$shersched','anon$shersched','2019-12-02 09:52:15.936','2019-12-02 09:52:15.936',0)
,('3bbdae43-0ba5-4430-babb-b4875e637e24','System','System User','anon$shersched','anon$shersched','2019-12-02 09:52:35.244','2019-12-02 09:52:35.244',0)
;

INSERT INTO shersched.app_user_role (app_user_role_id,app_user_id,app_role_id,effective_date,expiry_date,location_id,created_by,updated_by,created_dtm,updated_dtm,revision_count) VALUES
('65121c5d-8940-4afb-ac4e-b69444345b6a','d9772aab-6e5e-4b41-87b2-3294009e6d28','80294c81-cad7-4e58-ace1-76587d36530e','2019-12-02',NULL,'d7bdbd23-1215-4088-958a-b00c78bf147c','anon$shersched','anon$shersched','2019-12-02 10:24:15.420','2019-12-02 10:24:15.420',0)
,('4e4927ce-466c-4dee-acd8-75cfc0618ec6','d9772aab-6e5e-4b41-87b2-3294009e6d28','2b0e8dd8-fd2f-4b28-bdea-0f9c20cf5bc0','2019-12-02',NULL,'d7bdbd23-1215-4088-958a-b00c78bf147c','anon$shersched','anon$shersched','2019-12-02 10:24:32.329','2019-12-02 10:24:32.329',0)
;
