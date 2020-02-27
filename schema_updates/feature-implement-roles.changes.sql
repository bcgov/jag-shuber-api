-- changes to table: [app_user]
ALTER TABLE shersched.app_user ALTER COLUMN user_auth_id DROP NOT NULL;

-- changes to table: [api_scope]
ALTER TABLE shersched.api_scope DROP COLUMN api_scope_string;
ALTER TABLE shersched.api_scope DROP COLUMN read_only_ind;
ALTER TABLE shersched.api_scope ADD scope_name varchar(128) NOT NULL;
ALTER TABLE shersched.api_scope ADD scope_code varchar(128) NOT NULL;
ALTER TABLE shersched.api_scope ADD system_scope_ind boolean NOT NULL DEFAULT false;

-- changes to table: [app_role]
ALTER TABLE shersched.app_role ALTER COLUMN app_role_name varchar(128) NOT NULL;
ALTER TABLE shersched.app_role ADD app_role_code varchar(128) NOT NULL;

-- new table: [frontend_scope]
CREATE TABLE IF NOT EXISTS shersched.frontend_scope (
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

ALTER TABLE shersched.frontend_scope OWNER TO shersched;
GRANT ALL ON TABLE shersched.frontend_scope TO shersched;
GRANT ALL ON TABLE frontend_scope TO postgres;

-- new table: [frontend_scope_permission]
CREATE TABLE IF NOT EXISTS shersched.frontend_scope_permission (
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
    CONSTRAINT pk_frontend_scope_permission PRIMARY KEY (frontend_scope_permission_id),
    CONSTRAINT fk_frontend_scope FOREIGN KEY (frontend_scope_id) REFERENCES shersched.frontend_scope(frontend_scope_id)
);

ALTER TABLE shersched.frontend_scope_permission OWNER TO shersched;
GRANT ALL ON TABLE frontend_scope_permission TO shersched;
GRANT ALL ON TABLE frontend_scope_permission TO postgres;

-- drop and recreate constraints for table: [app_role_api_scope]
ALTER TABLE shersched.app_role_api_scope DROP CONSTRAINT pk_aprlapsc;
ALTER TABLE shersched.app_role_api_scope DROP CONSTRAINT fk_aprlapsc_aprl;
ALTER TABLE shersched.app_role_api_scope DROP CONSTRAINT fk_aprlapsc_apsc;

ALTER TABLE shersched.app_role_api_scope ADD CONSTRAINT pk_app_role_api_scope PRIMARY KEY (app_role_api_scope_id);
ALTER TABLE shersched.app_role_api_scope ADD CONSTRAINT fk_app_role FOREIGN KEY (app_role_id) REFERENCES shersched.app_role(app_role_id);
ALTER TABLE shersched.app_role_api_scope ADD CONSTRAINT fk_api_scope FOREIGN KEY (api_scope_id) REFERENCES shersched.api_scope(api_scope_id);

-- new table: [app_role_frontend_scope]
CREATE TABLE IF NOT EXISTS shersched.app_role_frontend_scope (
    app_role_frontend_scope_id uuid NOT NULL,
	app_role_id uuid NOT NULL,
	frontend_scope_id uuid NOT NULL,
	created_by varchar(32) NULL,
	updated_by varchar(32) NULL,
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

-- new table: [app_role_permission]
CREATE TABLE IF NOT EXISTS shersched.app_role_permission (
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
    CONSTRAINT pk_app_role_permission PRIMARY KEY (app_role_permission_id),
    CONSTRAINT fk_app_role FOREIGN KEY (app_role_id) REFERENCES shersched.app_role(app_role_id),
    CONSTRAINT fk_app_role_frontend_scope FOREIGN KEY (app_role_frontend_scope_id) REFERENCES shersched.app_role_frontend_scope(app_role_frontend_scope_id),
    CONSTRAINT fk_app_role_api_scope FOREIGN KEY (app_role_api_scope_id) REFERENCES shersched.app_role_api_scope(app_role_api_scope_id),
    CONSTRAINT fk_frontend_permission_id FOREIGN KEY (frontend_scope_permission_id) REFERENCES shersched.frontend_scope_permission(frontend_scope_permission_id)
);

ALTER TABLE shersched.app_role_permission OWNER TO shersched;
GRANT ALL ON TABLE app_role_permission TO shersched;
GRANT ALL ON TABLE app_role_permission TO postgres;