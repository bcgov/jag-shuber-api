CREATE TABLE IF NOT EXISTS shersched.app_user (
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
	CONSTRAINT pk_usr PRIMARY KEY (app_user_id),
	CONSTRAINT fk_usr_dflocn FOREIGN KEY (default_location_id) REFERENCES shersched.location(location_id),
	CONSTRAINT fk_usr_shr FOREIGN KEY (sheriff_id) REFERENCES shersched.sheriff(sheriff_id)
);

ALTER TABLE shersched.app_user OWNER TO shersched;
GRANT ALL ON TABLE shersched.app_user TO shersched;
GRANT ALL ON TABLE shersched.app_user TO postgres;

CREATE INDEX ix_usr_dflocn ON shersched.app_user USING btree (default_location_id);

CREATE TABLE IF NOT EXISTS shersched.app_role (
	app_role_id uuid NOT NULL,
	app_role_name varchar(64) NOT NULL,
	app_role_code varchar(64) NOT NULL,
	description varchar(200) NOT NULL,
	created_by varchar(32) NOT NULL,
	updated_by varchar(32) NOT NULL,
	created_dtm timestamptz NOT NULL,
	updated_dtm timestamptz NOT NULL,
	revision_count numeric(10) NOT NULL,
	CONSTRAINT pk_aprl PRIMARY KEY (app_role_id)
);

ALTER TABLE shersched.app_role OWNER TO shersched;
GRANT ALL ON TABLE shersched.app_role TO shersched;
GRANT ALL ON TABLE shersched.app_role TO postgres;

CREATE TABLE IF NOT EXISTS shersched.api_scope (
    api_scope_id uuid NOT NULL,
    scope_name varchar(128) NOT NULL,
    scope_code varchar(128) NOT NULL,
    system_scope_ind boolean DEFAULT false NOT NULL,
    description varchar(255),
    created_by varchar(32),
    updated_by varchar(32),
    created_dtm timestamptz NOT NULL,
    updated_dtm timestamptz NOT NULL,
    revision_count numeric NOT NULL,
    CONSTRAINT pk_api_scope PRIMARY KEY (api_scope_id)
);

ALTER TABLE shersched.api_scope OWNER TO shersched;
GRANT ALL ON TABLE shersched.api_scope TO shersched;
GRANT ALL ON TABLE shersched.api_scope TO postgres;

CREATE TABLE IF NOT EXISTS shersched.frontend_scope (
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

ALTER TABLE shersched.frontend_scope OWNER TO shersched;
GRANT ALL ON TABLE shersched.frontend_scope TO shersched;
GRANT ALL ON TABLE frontend_scope TO postgres;

CREATE TABLE IF NOT EXISTS shersched.frontend_scope_permission (
    frontend_scope_permission_id uuid NOT NULL,
	frontend_scope_id uuid NOT NULL,
	display_name varchar(128) NOT NULL,
	permission_code varchar(128) NOT NULL,
	description varchar(255) NULL,
	created_by varchar(32) NULL,
	updated_by varchar(32) NULL,
	created_dtm timestamptz NOT NULL,
	updated_dtm timestamptz NOT NULL,
	revision_count numeric NOT NULL,
    CONSTRAINT pk_frontend_scope_permission PRIMARY KEY (frontend_scope_permission_id),
    CONSTRAINT fk_frontend_scope FOREIGN KEY (frontend_scope_id) REFERENCES shersched.frontend_scope(frontend_scope_id)
);

ALTER TABLE shersched.frontend_scope_permission OWNER TO shersched;
GRANT ALL ON TABLE frontend_scope_permission TO shersched;
GRANT ALL ON TABLE frontend_scope_permission TO postgres;

CREATE TABLE IF NOT EXISTS shersched.app_user_role (
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
	CONSTRAINT pk_apusrl PRIMARY KEY (app_user_role_id),
	CONSTRAINT fk_apusrl_aprl FOREIGN KEY (app_role_id) REFERENCES shersched.app_role(app_role_id),
	CONSTRAINT fk_apusrl_locn FOREIGN KEY (location_id) REFERENCES shersched.location(location_id),
	CONSTRAINT fk_apusrl_usr FOREIGN KEY (app_user_id) REFERENCES shersched.app_user(app_user_id)
);

ALTER TABLE shersched.app_user_role OWNER TO shersched;
GRANT ALL ON TABLE shersched.app_user_role TO shersched;
GRANT ALL ON TABLE shersched.app_user_role TO postgres;

CREATE INDEX ix_usrl_aprl ON shersched.app_user_role USING btree (app_role_id);
CREATE INDEX ix_usrl_locn ON shersched.app_user_role USING btree (location_id);
CREATE INDEX ix_usrl_usr ON shersched.app_user_role USING btree (app_user_id);

CREATE TABLE IF NOT EXISTS shersched.app_role_api_scope (
    app_role_api_scope_id uuid NOT NULL,
    app_role_id uuid NOT NULL,
    api_scope_id uuid NOT NULL,
    created_by varchar(32),
    updated_by varchar(32),
    created_dtm timestamptz NOT NULL,
    updated_dtm timestamptz NOT NULL,
    revision_count numeric NOT NULL,
    CONSTRAINT pk_app_role_api_scope PRIMARY KEY (app_role_api_scope_id),
    CONSTRAINT fk_app_role FOREIGN KEY (app_role_id) REFERENCES shersched.app_role(app_role_id),
    CONSTRAINT fk_api_scope FOREIGN KEY (api_scope_id) REFERENCES shersched.api_scope(api_scope_id)
);

ALTER TABLE shersched.app_role_api_scope OWNER TO shersched;
GRANT ALL ON TABLE shersched.app_role_api_scope TO shersched;
GRANT ALL ON TABLE shersched.app_role_api_scope TO postgres;

CREATE TABLE IF NOT EXISTS shersched.app_role_frontend_scope (
    app_role_frontend_scope_id uuid NOT NULL,
    app_role_id uuid NOT NULL,
    frontend_scope_id uuid NOT NULL,
    created_by varchar(32),
    updated_by varchar(32),
    created_dtm timestamptz NOT NULL,
    updated_dtm timestamptz NOT NULL,
    revision_count numeric NOT NULL,
    CONSTRAINT pk_app_role_frontend_scope PRIMARY KEY (app_role_frontend_scope_id),
    CONSTRAINT fk_app_role FOREIGN KEY (app_role_id) REFERENCES shersched.app_role(app_role_id),
    CONSTRAINT fk_frontend_scope FOREIGN KEY (frontend_scope_id) REFERENCES shersched.frontend_scope(frontend_scope_id)
);

ALTER TABLE shersched.app_role_frontend_scope OWNER TO shersched;
GRANT ALL ON TABLE app_role_frontend_scope TO shersched;
GRANT ALL ON TABLE app_role_frontend_scope TO postgres;

CREATE TABLE IF NOT EXISTS shersched.app_role_permission (
    app_role_permission_id uuid NOT NULL,
	app_role_id uuid NOT NULL,
	app_role_frontend_scope_id uuid NULL,
	app_role_api_scope_id uuid NULL,
	frontend_scope_permission_id uuid NULL;
	api_scope_permission_id uuid NULL;
	display_name varchar(128) NOT NULL,
	description varchar(255) NULL,
	created_by varchar(32) NULL,
	updated_by varchar(32) NULL,
	created_dtm timestamptz NOT NULL,
	updated_dtm timestamptz NOT NULL,
	revision_count numeric NOT NULL,
    CONSTRAINT pk_app_role_permission PRIMARY KEY (app_role_permission_id),
    CONSTRAINT fk_app_role FOREIGN KEY (app_role_id) REFERENCES shersched.app_role(app_role_id),
    CONSTRAINT fk_app_role_frontend_scope FOREIGN KEY (app_role_frontend_scope_id) REFERENCES shersched.app_role_frontend_scope(app_role_frontend_scope_id),
    CONSTRAINT fk_app_role_api_scope FOREIGN KEY (app_role_api_scope_id) REFERENCES shersched.app_role_api_scope(app_role_api_scope_id),
    CONSTRAINT fk_frontend_permission_id FOREIGN KEY (frontend_scope_permission_id) REFERENCES shersched.frontend_scope_permission(frontend_scope_permission_id)
);

ALTER TABLE shersched.app_role_permission OWNER TO shersched;
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

-- Seed application role scopes
INSERT INTO shersched.frontend_scope (frontend_scope_id,scope_name,scope_code,system_scope_ind,description,created_by,updated_by,created_dtm,updated_dtm,revision_count) VALUES
('cf35acb6-f21c-4a8b-9261-c48df69056a6','Sheriff Profile Roles Plugin','SHERIFF_PROFILE_PLUGIN_ROLES',false,'Sheriff Profile Roles Plugin','','','2019-12-02 00:04:40.000','2019-12-02 00:04:40.000',0)
,('e96a6dd8-4bd0-4bd2-ae45-33840477be3e','Admin Roles','ADMIN_ROLES',false,'Roles Administration Page','','','2019-12-02 00:04:40.000','2019-12-02 00:04:40.000',0)
,('18e73e5a-ffbf-4797-b478-0f02ac236e78','Admin Users','ADMIN_USERS',false,'Users Administration Page','','','2019-12-02 00:04:40.000','2019-12-02 00:04:40.000',0)
;

-- Seed initial users and roles data
INSERT INTO shersched.app_user (app_user_id,siteminder_id,user_auth_id,display_name,system_account_ind,default_location_id,created_by,sheriff_id,updated_by,created_dtm,updated_dtm,revision_count) VALUES
('d9772aab-6e5e-4b41-87b2-3294009e6d28',NULL,NULL,'Test User',0,'65b2e8fb-0d64-4f63-853c-76d8d359760e','anon$shersched','67eb2070-d359-40cf-a309-0a3ba0049b72','anon$shersched','2019-12-02 00:04:40.757','2019-12-02 00:04:40.757',0)
;

INSERT INTO shersched.app_role (app_role_id,app_role_name,app_role_code,description,created_by,updated_by,created_dtm,updated_dtm,revision_count) VALUES
('80294c81-cad7-4e58-ace1-76587d36530e','Administrator','ADMIN','Administrator','anon$shersched','anon$shersched','2019-12-02 09:51:28.701','2019-12-02 09:51:28.701',0)
,('2b0e8dd8-fd2f-4b28-bdea-0f9c20cf5bc0','Sheriff','SHERIFF','Sheriff','anon$shersched','anon$shersched','2019-12-02 09:52:15.936','2019-12-02 09:52:15.936',0)
,('3bbdae43-0ba5-4430-babb-b4875e637e24','System','SYSTEM','System User','anon$shersched','anon$shersched','2019-12-02 09:52:35.244','2019-12-02 09:52:35.244',0)
;

INSERT INTO shersched.app_user_role (app_user_role_id,app_user_id,app_role_id,effective_date,expiry_date,location_id,created_by,updated_by,created_dtm,updated_dtm,revision_count) VALUES
('65121c5d-8940-4afb-ac4e-b69444345b6a','d9772aab-6e5e-4b41-87b2-3294009e6d28','80294c81-cad7-4e58-ace1-76587d36530e','2019-12-02',NULL,'d7bdbd23-1215-4088-958a-b00c78bf147c','anon$shersched','anon$shersched','2019-12-02 10:24:15.420','2019-12-02 10:24:15.420',0)
,('4e4927ce-466c-4dee-acd8-75cfc0618ec6','d9772aab-6e5e-4b41-87b2-3294009e6d28','2b0e8dd8-fd2f-4b28-bdea-0f9c20cf5bc0','2019-12-02',NULL,'d7bdbd23-1215-4088-958a-b00c78bf147c','anon$shersched','anon$shersched','2019-12-02 10:24:32.329','2019-12-02 10:24:32.329',0)
;

INSERT INTO shersched.app_role_frontend_scope (app_role_frontend_scope_id,app_role_id,frontend_scope_id,created_by,updated_by,created_dtm,updated_dtm,revision_count) VALUES
('b8daf3ae-c3e1-4ca2-81b0-6d62d68b06f6','80294c81-cad7-4e58-ace1-76587d36530e','cf35acb6-f21c-4a8b-9261-c48df69056a6','Name, Your','Name, Your','2019-12-02 18:26:47.778','2019-12-02 18:26:47.778',0)
,('68856336-a28e-4afe-bfeb-a4a09f049a89','80294c81-cad7-4e58-ace1-76587d36530e','e96a6dd8-4bd0-4bd2-ae45-33840477be3e','Name, Your','Name, Your','2019-12-02 18:26:58.502','2019-12-02 18:26:58.502',0)
,('5aa7b20c-95e5-498b-aa8e-f2719f3c14f1','80294c81-cad7-4e58-ace1-76587d36530e','18e73e5a-ffbf-4797-b478-0f02ac236e78','Name, Your','Name, Your','2019-12-02 18:27:09.022','2019-12-02 18:27:09.022',0)
;

INSERT INTO shersched.app_role_permission (app_role_permission_id,app_role_id,app_role_frontend_scope_id,app_role_api_scope_id,display_name,description,created_by,updated_by,created_dtm,updated_dtm,revision_count) VALUES
('0b357832-69da-4bd8-b2f2-3b860f8708e2','80294c81-cad7-4e58-ace1-76587d36530e','68856336-a28e-4afe-bfeb-a4a09f049a89',NULL,'Edit Role','Edit Role','','','2019-12-02 00:04:40.000','2019-12-02 00:04:40.000',0)
,('26bb2c96-43a1-4ffa-bdb9-88089979fdad','80294c81-cad7-4e58-ace1-76587d36530e','68856336-a28e-4afe-bfeb-a4a09f049a89',NULL,'View Role','View Role','','','2019-12-02 00:04:40.000','2019-12-02 00:04:40.000',0)
,('d4c11f1a-822d-4c36-84f0-3638cab19c0a','80294c81-cad7-4e58-ace1-76587d36530e','68856336-a28e-4afe-bfeb-a4a09f049a89',NULL,'Create Role','Create Role','','','2019-12-02 00:04:40.000','2019-12-02 00:04:40.000',0)
;

-- Test structure and data --
-- Just a couple queries to make sure things look right

-- Test user, roles, scopes & permissions:
/*
select au.display_name, ar.app_role_name,
ar.description, aur.effective_date, l.location_name,
"fs".scope_name, "fs".scope_code, arp.display_name
from app_user au
left join app_user_role aur on (aur.app_user_id = au.app_user_id)
left join app_role ar on (aur.app_role_id = ar.app_role_id)
left join "location" l on (aur.location_id = l.location_id)
left join app_role_frontend_scope arfs on (arfs.app_role_id = ar.app_role_id)
left join frontend_scope "fs" on ("fs".frontend_scope_id = arfs.frontend_scope_id)
left join app_role_permission arp on (arfs.app_role_frontend_scope_id = arp.app_role_frontend_scope_id)
*/
-- Test permissions only
/*
select au.display_name, ar.app_role_name,
ar.description, aur.effective_date, l.location_name,
"fs".scope_name, "fs".scope_code, arp.display_name
from app_user au
left join app_user_role aur on (aur.app_user_id = au.app_user_id)
left join app_role ar on (aur.app_role_id = ar.app_role_id)
left join "location" l on (aur.location_id = l.location_id)
left join app_role_frontend_scope arfs on (arfs.app_role_id = ar.app_role_id)
left join frontend_scope "fs" on ("fs".frontend_scope_id = arfs.frontend_scope_id)
right join app_role_permission arp on (arfs.app_role_frontend_scope_id = arp.app_role_frontend_scope_id)
*/

