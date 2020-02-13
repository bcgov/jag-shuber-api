
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

-- New stuff

-- Table: shersched.court_role_code

-- DROP TABLE shersched.court_role_code;

CREATE TABLE shersched.court_role_code
(
    court_role_id uuid NOT NULL,
	court_role_code character varying(20) COLLATE pg_catalog."default" NOT NULL,
    description character varying(200) COLLATE pg_catalog."default" NOT NULL,
	location_id uuid,
    effective_date date NOT NULL,
    expiry_date date,
    created_by character varying(32) COLLATE pg_catalog."default" NOT NULL,
    updated_by character varying(32) COLLATE pg_catalog."default" NOT NULL,
    created_dtm timestamp with time zone NOT NULL,
    updated_dtm timestamp with time zone NOT NULL,
    revision_count numeric(10,0) NOT NULL,
    CONSTRAINT pk_court_role_id PRIMARY KEY (court_role_id)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE shersched.court_role_code
    OWNER to postgres;

GRANT ALL ON TABLE shersched.court_role_code TO postgres;

GRANT SELECT ON TABLE shersched.court_role_code TO shersched;

COMMENT ON TABLE shersched.court_role_code
    IS 'Court Role Code captures the roles a sheriff might fill in a court assignment. Initial roles are     Video     Rover     Coroner''s Inquest     Supervisor     Search Gate';

-- Trigger: trg_biu_crcd_stamp

-- DROP TRIGGER trg_biu_crcd_stamp ON shersched.court_role_code;

CREATE TRIGGER trg_biu_crcd_stamp
    BEFORE INSERT OR UPDATE 
    ON shersched.court_role_code
    FOR EACH ROW
    EXECUTE PROCEDURE shersched.tab_stamp();

-- Table: shersched.jail_role_code

-- DROP TABLE shersched.jail_role_code;

CREATE TABLE shersched.jail_role_code
(
    jail_role_id uuid NOT NULL,
	jail_role_code character varying(20) COLLATE pg_catalog."default" NOT NULL,
    description character varying(200) COLLATE pg_catalog."default" NOT NULL,
	location_id uuid,
    effective_date date NOT NULL,
    expiry_date date,
    created_by character varying(32) COLLATE pg_catalog."default" NOT NULL,
    updated_by character varying(32) COLLATE pg_catalog."default" NOT NULL,
    created_dtm timestamp with time zone NOT NULL,
    updated_dtm timestamp with time zone NOT NULL,
    revision_count numeric(10,0) NOT NULL,
    
    CONSTRAINT pk_jail_role_id PRIMARY KEY (jail_role_id)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE shersched.jail_role_code
    OWNER to postgres;

GRANT ALL ON TABLE shersched.jail_role_code TO postgres;

GRANT SELECT ON TABLE shersched.jail_role_code TO shersched;

-- Trigger: trg_biu_jlrlcd_stamp

-- DROP TRIGGER trg_biu_jlrlcd_stamp ON shersched.jail_role_code;

CREATE TRIGGER trg_biu_jlrlcd_stamp
    BEFORE INSERT OR UPDATE 
    ON shersched.jail_role_code
    FOR EACH ROW
    EXECUTE PROCEDURE shersched.tab_stamp();


-- Table: shersched.other_assign_code

-- DROP TABLE shersched.other_assign_code;

CREATE TABLE shersched.other_assign_code
(
    other_assign_id uuid NOT NULL,
	other_assign_code character varying(20) COLLATE pg_catalog."default" NOT NULL,
    description character varying(200) COLLATE pg_catalog."default" NOT NULL,
    effective_date date NOT NULL,
    expiry_date date,
    created_by character varying(32) COLLATE pg_catalog."default" NOT NULL,
    updated_by character varying(32) COLLATE pg_catalog."default" NOT NULL,
    created_dtm timestamp with time zone NOT NULL,
    updated_dtm timestamp with time zone NOT NULL,
    revision_count numeric(10,0) NOT NULL,
    location_id uuid,
    CONSTRAINT pk_other_assign_id PRIMARY KEY (other_assign_id)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE shersched.other_assign_code
    OWNER to postgres;

GRANT ALL ON TABLE shersched.other_assign_code TO postgres;

GRANT SELECT ON TABLE shersched.other_assign_code TO shersched;

-- Trigger: trg_biu_otascd_stamp

-- DROP TRIGGER trg_biu_otascd_stamp ON shersched.other_assign_code;

CREATE TRIGGER trg_biu_otascd_stamp
    BEFORE INSERT OR UPDATE 
    ON shersched.other_assign_code
    FOR EACH ROW
    EXECUTE PROCEDURE shersched.tab_stamp();
