/*
TODO: RUN THESE FIRST AND ONLY ON INITIAL MIGRATION
-- fk_dty_asn
-- fk_dtyrc_asn
-- fk_shft_asn

ALTER TABLE shersched.duty DROP CONSTRAINT fk_dty_asn;
ALTER TABLE shersched.duty DROP CONSTRAINT fk_dty_dtyrc;
ALTER TABLE shersched.duty_recurrence DROP CONSTRAINT fk_dtyrc_asn;
ALTER TABLE shersched.shift DROP CONSTRAINT fk_shft_asn;
*/

/*
TODO: ONLY TRUNCATE IF WE NEED TO

TRUNCATE TABLE shersched."assignment" CONTINUE IDENTITY CASCADE;
-- TRUNCATE TABLE shersched.courtroom CONTINUE IDENTITY CASCADE;
TRUNCATE TABLE shersched.court_role_code CONTINUE IDENTITY CASCADE;
TRUNCATE TABLE shersched.jail_role_code CONTINUE IDENTITY CASCADE;
TRUNCATE TABLE shersched.other_assign_code CONTINUE IDENTITY CASCADE;
TRUNCATE TABLE shersched.duty_recurrence CONTINUE IDENTITY CASCADE;
TRUNCATE TABLE shersched.duty CONTINUE IDENTITY CASCADE;
TRUNCATE TABLE shersched.shift CONTINUE IDENTITY CASCADE;
*/

/* 
Just here for reference, these are the changes to assignment...
ALTER TABLE shersched."assignment" ALTER COLUMN created_by TYPE varchar(64) USING created_by::varchar;
ALTER TABLE shersched."assignment" ALTER COLUMN other_assign_code TYPE varchar(64) USING other_assign_code::varchar;
ALTER TABLE shersched."assignment" ALTER COLUMN jail_role_code TYPE varchar(64) USING jail_role_code::varchar;
ALTER TABLE shersched."assignment" ALTER COLUMN court_role_code TYPE varchar(64) USING court_role_code::varchar;
ALTER TABLE shersched."assignment" ALTER COLUMN work_section_code TYPE varchar(64) USING work_section_code::varchar;
*/

DROP TABLE IF EXISTS shersched."assignment";
-- DROP TABLE IF EXISTS shersched.courtroom;
DROP TABLE IF EXISTS shersched.court_role_code;
DROP TABLE IF EXISTS shersched.jail_role_code;
DROP TABLE IF EXISTS shersched.other_assign_code;
DROP TABLE IF EXISTS shersched.escort_run;

/*
CREATE TABLE IF NOT EXISTS shersched.courtroom (
	courtroom_id uuid NOT NULL,
	courtroom_cd varchar(32) NOT NULL,
	courtroom_name varchar(100) NOT NULL,
	location_id uuid NOT NULL,
	created_by varchar(32) NOT NULL,
	updated_by varchar(32) NOT NULL,
	created_dtm timestamptz NOT NULL,
	updated_dtm timestamptz NOT NULL,
	revision_count numeric(10) NOT NULL,
	CONSTRAINT pk_courtroom PRIMARY KEY (courtroom_id),
	CONSTRAINT uk_location_courtroom_code UNIQUE (location_id, courtroom_cd)	
);
CREATE INDEX ix_courtroom_name ON shersched.courtroom USING btree (courtroom_name);

ALTER TABLE shersched.courtroom ADD CONSTRAINT fk_courtroom_location FOREIGN KEY (location_id) REFERENCES location(location_id);

-- DROP TRIGGER trg_biu_crtr_stamp ON shersched.courtroom;

create trigger trg_biu_courtroom_stamp before
insert
    or
update
    on
    shersched.courtroom for each row execute procedure shersched.tab_stamp();
*/

CREATE TABLE IF NOT EXISTS shersched.court_role_code (
	court_role_id uuid NOT NULL,
	court_role_code varchar(32) NOT NULL,
	description varchar(200) NOT NULL,
	location_id uuid NULL,
	effective_date date NOT NULL,
	expiry_date date NULL,
	created_by varchar(32) NOT NULL,
	updated_by varchar(32) NOT NULL,
	created_dtm timestamptz NOT NULL,
	updated_dtm timestamptz NOT NULL,
	revision_count numeric(10) NOT NULL,
	CONSTRAINT pk_court_role_id PRIMARY KEY (court_role_id)
);

CREATE UNIQUE INDEX court_role_code_loc_notnull_idx ON court_role_code (court_role_code, location_id)
WHERE location_id IS NOT NULL;

CREATE UNIQUE INDEX court_role_code_loc_isnull_idx ON court_role_code (court_role_code)
WHERE location_id IS NULL;

-- DROP TRIGGER trg_biu_crcd_stamp ON shersched.court_role_code;

create trigger trg_biu_court_role_code_stamp before
insert
    or
update
    on
    shersched.court_role_code for each row execute procedure shersched.tab_stamp();

CREATE TABLE IF NOT EXISTS shersched.jail_role_code (
	jail_role_id uuid NOT NULL,
	jail_role_code varchar(32) NOT NULL,
	description varchar(200) NOT NULL,
	location_id uuid NULL,
	effective_date date NOT NULL,
	expiry_date date NULL,
	created_by varchar(32) NOT NULL,
	updated_by varchar(32) NOT NULL,
	created_dtm timestamptz NOT NULL,
	updated_dtm timestamptz NOT NULL,
	revision_count numeric(10) NOT NULL,
	CONSTRAINT pk_jail_role_id PRIMARY KEY (jail_role_id)
);

CREATE UNIQUE INDEX jail_role_code_loc_notnull_idx ON jail_role_code (jail_role_code, location_id)
WHERE location_id IS NOT NULL;

CREATE UNIQUE INDEX jail_role_code_loc_isnull_idx ON jail_role_code (jail_role_code)
WHERE location_id IS NULL;

-- DROP TRIGGER trg_biu_jlrlcd_stamp ON shersched.jail_role_code;

create trigger trg_biu_jail_role_code_stamp before
insert
    or
update
    on
    shersched.jail_role_code for each row execute procedure shersched.tab_stamp();

CREATE TABLE IF NOT EXISTS shersched.escort_run (
	escort_run_id uuid NOT NULL,
	title varchar(100) NOT NULL,
	location_id uuid NULL,
	created_by varchar(32) NOT NULL,
	updated_by varchar(32) NOT NULL,
	created_dtm timestamptz NOT NULL,
	updated_dtm timestamptz NOT NULL,
	revision_count numeric(10) NOT NULL,
	CONSTRAINT pk_esrn PRIMARY KEY (escort_run_id)
);
CREATE INDEX ix_escort_run_location ON shersched.escort_run USING btree (location_id);

ALTER TABLE shersched.escort_run ADD CONSTRAINT fk_escort_run_location FOREIGN KEY (location_id) REFERENCES location(location_id);

-- DROP TRIGGER trg_biu_esrn_stamp ON shersched.escort_run;

create trigger trg_biu_escort_run_stamp before
insert
    or
update
    on
    shersched.escort_run for each row execute procedure shersched.tab_stamp();

CREATE TABLE IF NOT EXISTS shersched.other_assign_code (
	other_assign_id uuid NOT NULL,
	other_assign_code varchar(32) NOT NULL,
	description varchar(200) NOT NULL,
	location_id uuid NULL,
	effective_date date NOT NULL,
	expiry_date date NULL,
	created_by varchar(32) NOT NULL,
	updated_by varchar(32) NOT NULL,
	created_dtm timestamptz NOT NULL,
	updated_dtm timestamptz NOT NULL,
	revision_count numeric(10) NOT NULL,
	
	CONSTRAINT pk_other_assign_id PRIMARY KEY (other_assign_id)
);

CREATE UNIQUE INDEX other_assign_code_loc_notnull_idx ON other_assign_code (other_assign_code, location_id)
WHERE location_id IS NOT NULL;

CREATE UNIQUE INDEX other_assign_code_loc_isnull_idx ON other_assign_code (other_assign_code)
WHERE location_id IS NULL;

-- DROP TRIGGER trg_biu_otascd_stamp ON shersched.other_assign_code;

create trigger trg_biu_other_assign_code_stamp before
insert
    or
update
    on
    shersched.other_assign_code for each row execute procedure shersched.tab_stamp();


-- Drop table

-- DROP TABLE shersched.leave_sub_code;

/* 
CREATE TABLE IF NOT EXISTS shersched.leave_sub_code (
	leave_code varchar(64) NOT NULL,
	leave_sub_code varchar(64) NOT NULL,
	description varchar(200) NOT NULL,
	effective_date date NOT NULL,
	expiry_date date NULL,
	created_by varchar(32) NOT NULL,
	updated_by varchar(32) NOT NULL,
	created_dtm timestamptz NOT NULL,
	updated_dtm timestamptz NOT NULL,
	revision_count numeric(10) NOT NULL,
	CONSTRAINT pk_lvsbcd PRIMARY KEY (leave_code, leave_sub_code)
);

ALTER TABLE shersched.leave_sub_code ADD CONSTRAINT fk_lvsbcd_lvcd FOREIGN KEY (leave_code) REFERENCES leave_code(leave_code); 

-- DROP TRIGGER trg_biu_lvsbcd_stamp ON shersched.leave_sub_code;

create trigger trg_biu_lvsbcd_stamp before
insert
    or
update
    on
    shersched.leave_sub_code for each row execute procedure shersched.tab_stamp();
*/

CREATE TABLE IF NOT EXISTS shersched."assignment" (
	assignment_id uuid NOT NULL,
	title varchar(100) NULL,
	work_section_code varchar(32) NOT NULL,
	location_id uuid NOT NULL,
	courtroom_id uuid NULL,
	court_role_code varchar(32) NULL,
	jail_role_code varchar(32) NULL,
	other_assign_code varchar(32) NULL,
	court_role_id uuid NULL,
	jail_role_id uuid NULL,
	other_assign_id uuid NULL,
	escort_run_id uuid NULL,
	effective_date date NOT NULL DEFAULT now(),
	expiry_date date NULL,
	created_by varchar(32) NOT NULL,
	updated_by varchar(32) NOT NULL,
	created_dtm timestamptz NOT NULL,
	updated_dtm timestamptz NOT NULL,
	revision_count numeric(10) NOT NULL,
	CONSTRAINT pk_assignment PRIMARY KEY (assignment_id)
);
CREATE INDEX ix_assignment_courtroom ON shersched.assignment USING btree (courtroom_id);
CREATE INDEX ix_assignment_court_role ON shersched.assignment USING btree (court_role_id);
CREATE INDEX ix_assignment_jail_role ON shersched.assignment USING btree (jail_role_id);
CREATE INDEX ix_assignment_other_assign_role ON shersched.assignment USING btree (other_assign_id);
CREATE INDEX ix_assignment_escort_run ON shersched.assignment USING btree (escort_run_id);
CREATE INDEX ix_assignment_location ON shersched.assignment USING btree (location_id);
CREATE INDEX ix_assignment_work_section_code ON shersched.assignment USING btree (work_section_code);

-- ALTER TABLE shersched."assignment" ADD CONSTRAINT fk_court_role_code FOREIGN KEY (location_id, court_role_code) REFERENCES court_role_code(location_id, court_role_code) NOT VALID;
ALTER TABLE shersched."assignment" ADD CONSTRAINT fk_court_role_id FOREIGN KEY (court_role_id) REFERENCES court_role_code(court_role_id) NOT VALID;
ALTER TABLE shersched."assignment" ADD CONSTRAINT fk_courtroom_id FOREIGN KEY (courtroom_id) REFERENCES courtroom(courtroom_id);
-- ALTER TABLE shersched."assignment" ADD CONSTRAINT fk_jail_role_code FOREIGN KEY (location_id, jail_role_code) REFERENCES jail_role_code(jail_role_code, location_id) NOT VALID;
ALTER TABLE shersched."assignment" ADD CONSTRAINT fk_jail_role_id FOREIGN KEY (jail_role_id) REFERENCES jail_role_code(jail_role_id) NOT VALID;
ALTER TABLE shersched."assignment" ADD CONSTRAINT fk_escort_run_id FOREIGN KEY (escort_run_id) REFERENCES escort_run(escort_run_id) NOT VALID;

-- ALTER TABLE shersched."assignment" ADD CONSTRAINT fk_other_assign_code FOREIGN KEY (location_id, other_assign_code) REFERENCES other_assign_code(other_assign_code, location_id) NOT VALID;
ALTER TABLE shersched."assignment" ADD CONSTRAINT fk_other_assign_id FOREIGN KEY (other_assign_id) REFERENCES other_assign_code(other_assign_id) NOT VALID;
ALTER TABLE shersched."assignment" ADD CONSTRAINT fk_location_id FOREIGN KEY (location_id) REFERENCES location(location_id);

-- DROP TRIGGER trg_biu_asn_stamp ON shersched."assignment";

create trigger trg_biu_assignment_stamp before
insert
    or
update
    on
    shersched.assignment for each row execute procedure shersched.tab_stamp();

ALTER TABLE shersched.duty ADD CONSTRAINT fk_dty_asn FOREIGN KEY (assignment_id) REFERENCES assignment(assignment_id);
ALTER TABLE shersched.duty ADD CONSTRAINT fk_dty_dtyrc FOREIGN KEY (duty_recurrence_id) REFERENCES shersched.duty_recurrence(duty_recurrence_id);
ALTER TABLE shersched.duty_recurrence ADD CONSTRAINT fk_dtyrc_asn FOREIGN KEY (assignment_id) REFERENCES assignment(assignment_id);
ALTER TABLE shersched.shift ADD CONSTRAINT fk_shft_asn FOREIGN KEY (assignment_id) REFERENCES assignment(assignment_id);

GRANT SELECT, INSERT, UPDATE, DELETE ON shersched."assignment" TO postgres;
GRANT SELECT, INSERT, UPDATE, DELETE ON shersched.courtroom TO postgres;
GRANT SELECT, INSERT, UPDATE, DELETE ON shersched.court_role_code TO postgres;
GRANT SELECT, INSERT, UPDATE, DELETE ON shersched.jail_role_code TO postgres;
GRANT SELECT, INSERT, UPDATE, DELETE ON shersched.other_assign_code TO postgres;
GRANT SELECT, INSERT, UPDATE, DELETE ON shersched.escort_run TO postgres;

GRANT SELECT, INSERT, UPDATE, DELETE ON shersched."assignment" TO shersched;
GRANT SELECT, INSERT, UPDATE, DELETE ON shersched.courtroom TO shersched;
GRANT SELECT, INSERT, UPDATE, DELETE ON shersched.court_role_code TO shersched;
GRANT SELECT, INSERT, UPDATE, DELETE ON shersched.jail_role_code TO shersched;
GRANT SELECT, INSERT, UPDATE, DELETE ON shersched.other_assign_code TO shersched;
GRANT SELECT, INSERT, UPDATE, DELETE ON shersched.escort_run TO shersched;