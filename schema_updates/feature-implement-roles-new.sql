
-- Drop table

-- DROP TABLE shersched.api_scope;

CREATE TABLE shersched.api_scope (
	api_scope_id uuid NOT NULL,
	scope_name varchar(128) NOT NULL,
	scope_code varchar(128) NOT NULL,
	system_scope_ind bool NOT NULL DEFAULT false,
	description varchar(255) NULL,
	created_by varchar(32) NULL,
	updated_by varchar(32) NULL,
	created_dtm timestamptz NOT NULL,
	updated_dtm timestamptz NOT NULL,
	revision_count numeric NOT NULL,
	CONSTRAINT pk_api_scope PRIMARY KEY (api_scope_id)
);

-- Drop table

-- DROP TABLE shersched.app_role;

CREATE TABLE shersched.app_role (
	app_role_id uuid NOT NULL,
	app_role_name varchar(32) NOT NULL,
	description varchar(200) NOT NULL,
	created_by varchar(32) NOT NULL,
	updated_by varchar(32) NOT NULL,
	created_dtm timestamptz NOT NULL,
	updated_dtm timestamptz NOT NULL,
	revision_count numeric(10) NOT NULL,
	app_role_code varchar(64) NULL,
	CONSTRAINT pk_aprl PRIMARY KEY (app_role_id)
);

-- Drop table

-- DROP TABLE shersched.app_role_permission;

CREATE TABLE shersched.app_role_permission (
	app_role_permission_id uuid NOT NULL,
	app_role_id uuid NOT NULL,
	app_role_frontend_scope_id uuid NULL,
	app_role_api_scope_id uuid NULL,
	frontend_scope_permission_id uuid NULL,
	api_scope_permission_id uuid NULL,
	created_by varchar(32) NULL,
	updated_by varchar(32) NULL,
	created_dtm timestamptz NOT NULL,
	updated_dtm timestamptz NOT NULL,
	revision_count numeric NOT NULL,
	CONSTRAINT pk_app_role_permission PRIMARY KEY (app_role_permission_id)
);

-- Drop table

-- DROP TABLE shersched.frontend_scope;

CREATE TABLE shersched.frontend_scope (
	frontend_scope_id uuid NOT NULL,
	scope_name varchar(128) NOT NULL,
	scope_code varchar(128) NOT NULL,
	system_scope_ind bool NOT NULL DEFAULT false,
	description varchar(255) NULL,
	created_by varchar(32) NULL,
	updated_by varchar(32) NULL,
	created_dtm timestamptz NOT NULL,
	updated_dtm timestamptz NOT NULL,
	revision_count numeric NOT NULL,
	CONSTRAINT pk_frontend_scope PRIMARY KEY (frontend_scope_id)
);

-- Drop table

-- DROP TABLE shersched.app_role_api_scope;

CREATE TABLE shersched.app_role_api_scope (
	app_role_api_scope_id uuid NOT NULL,
	app_role_id uuid NOT NULL,
	api_scope_id uuid NOT NULL,
	created_by varchar(32) NULL,
	updated_by varchar(32) NULL,
	created_dtm timestamptz NOT NULL,
	updated_dtm timestamptz NOT NULL,
	revision_count numeric NOT NULL,
	CONSTRAINT pk_app_role_api_scope PRIMARY KEY (app_role_api_scope_id),
	CONSTRAINT fk_api_scope FOREIGN KEY (api_scope_id) REFERENCES api_scope(api_scope_id),
	CONSTRAINT fk_app_role FOREIGN KEY (app_role_id) REFERENCES app_role(app_role_id)
);

-- Drop table

-- DROP TABLE shersched.app_role_frontend_scope;

CREATE TABLE shersched.app_role_frontend_scope (
	app_role_frontend_scope_id uuid NOT NULL,
	app_role_id uuid NOT NULL,
	frontend_scope_id uuid NOT NULL,
	created_by varchar(32) NULL,
	updated_by varchar(32) NULL,
	created_dtm timestamptz NOT NULL,
	updated_dtm timestamptz NOT NULL,
	revision_count numeric NOT NULL,
	CONSTRAINT pk_app_role_frontend_scope PRIMARY KEY (app_role_frontend_scope_id),
	CONSTRAINT fk_app_role FOREIGN KEY (app_role_id) REFERENCES app_role(app_role_id),
	CONSTRAINT fk_frontend_scope FOREIGN KEY (frontend_scope_id) REFERENCES frontend_scope(frontend_scope_id)
);

-- Drop table

-- DROP TABLE shersched.frontend_scope_permission;

CREATE TABLE shersched.frontend_scope_permission (
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
	CONSTRAINT fk_frontend_scope FOREIGN KEY (frontend_scope_id) REFERENCES frontend_scope(frontend_scope_id)
);

-- Drop table

-- DROP TABLE shersched.app_user;

CREATE TABLE shersched.app_user (
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

-- Drop table

-- DROP TABLE shersched.app_user_role;

CREATE TABLE shersched.app_user_role (
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

ALTER TABLE shersched.app_user ADD CONSTRAINT fk_usr_dflocn FOREIGN KEY (default_location_id) REFERENCES location(location_id);
ALTER TABLE shersched.app_user ADD CONSTRAINT fk_usr_shr FOREIGN KEY (sheriff_id) REFERENCES sheriff(sheriff_id);

ALTER TABLE shersched.app_user_role ADD CONSTRAINT fk_apusrl_aprl FOREIGN KEY (app_role_id) REFERENCES app_role(app_role_id);
ALTER TABLE shersched.app_user_role ADD CONSTRAINT fk_apusrl_locn FOREIGN KEY (location_id) REFERENCES location(location_id);
ALTER TABLE shersched.app_user_role ADD CONSTRAINT fk_apusrl_usr FOREIGN KEY (app_user_id) REFERENCES app_user(app_user_id);
