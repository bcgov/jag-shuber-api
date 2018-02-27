/*
Created: 05/01/2018
Modified: 16/02/2018
Model: PostgreSQL 9.5
Database: PostgreSQL 9.5
*/




-- Create roles section -------------------------------------------------

CREATE ROLE shersched
;

-- Create schemas section -------------------------------------------------

CREATE SCHEMA shersched
;

-- Create tables section -------------------------------------------------

-- Table shersched.sheriff

CREATE TABLE shersched.sheriff(
 sheriff_id UUID NOT NULL,
 badge_no Character varying(20) NOT NULL,
 name Character varying(100),
 default_location_id UUID,
 rank Character varying(50),
 org_unit_id UUID,
 created_by Character varying(32) NOT NULL,
 updated_by Character varying(32) NOT NULL,
 created_dtm Timestamp with time zone NOT NULL,
 updated_dtm Timestamp with time zone NOT NULL,
 revision_count Numeric(10,0) NOT NULL
)
;

COMMENT ON TABLE shersched.sheriff IS 'SHERIFF captures information related to a Sheriff and their profile.'
;

-- Create indexes for table shersched.sheriff

CREATE INDEX ix_relationship35 ON shersched.sheriff (default_location_id)
;

CREATE INDEX ix_relationship28 ON shersched.sheriff (org_unit_id)
;

-- Add keys for table shersched.sheriff

ALTER TABLE shersched.sheriff ADD CONSTRAINT shrf_pk PRIMARY KEY (sheriff_id)
;

ALTER TABLE shersched.sheriff ADD CONSTRAINT shrf_badge_uk UNIQUE (badge_no)
;

-- Table shersched.assignment

CREATE TABLE shersched.assignment(
 assignment_id UUID NOT NULL,
 assignment_type_code Character varying(20) NOT NULL,
 assigned_status_code Character varying(20),
 sheriffs_required_count Bigint,
 template_flag Character varying(1) DEFAULT 'N' NOT NULL,
 block_assignment_flag Character(1) DEFAULT 'Y' NOT NULL,
 assignment_date Date NOT NULL,
 estimated_duration_minutes Bigint NOT NULL,
 scheduled_start_time Time,
 scheduled_end_time Time,
 org_unit_id UUID,
 location_id UUID,
 created_by Character varying(32) NOT NULL,
 updated_by Character varying(32) NOT NULL,
 created_dtm Timestamp with time zone NOT NULL,
 updated_dtm Timestamp with time zone NOT NULL,
 revision_count Numeric(10,0) NOT NULL
)
;
COMMENT ON COLUMN shersched.assignment.block_assignment_flag IS 'Long term (specifically when further integration with the hub is in place and various specific assignments are being fed electronically), we are anticipating that a sheriff may be scheduled to do a block of a given type of work section (e.g. AM shift in courtroom 102, or 2.5 hours of document service) that covers more than one specific assignment, Until that time, the system may only track sheriff assignments at the block level.  If this flag is true, this assignment corresponds to a full block. '
;

-- Create indexes for table shersched.assignment

CREATE INDEX ix_relationship4 ON shersched.assignment (assignment_type_code)
;

CREATE INDEX ix_relationship25 ON shersched.assignment (org_unit_id)
;

CREATE INDEX ix_relationship29 ON shersched.assignment (location_id)
;

-- Add keys for table shersched.assignment

ALTER TABLE shersched.assignment ADD CONSTRAINT asnt_pk PRIMARY KEY (assignment_id)
;

-- Table shersched.assignment_type_code

CREATE TABLE shersched.assignment_type_code(
 assignment_type_code Character varying(20) NOT NULL,
 description Character varying NOT NULL,
 work_section_code Character varying(20),
 effective_date Date NOT NULL,
 expiry_date Date,
 created_by Character varying(32) NOT NULL,
 updated_by Character varying(32) NOT NULL,
 created_dtm Timestamp with time zone NOT NULL,
 updated_dtm Timestamp with time zone NOT NULL,
 revision_count Numeric(10,0) NOT NULL
)
;

-- Create indexes for table shersched.assignment_type_code

CREATE INDEX ix_relationship36 ON shersched.assignment_type_code (work_section_code)
;

-- Add keys for table shersched.assignment_type_code

ALTER TABLE shersched.assignment_type_code ADD CONSTRAINT asnttp_pk PRIMARY KEY (assignment_type_code)
;

-- Table shersched.qualification

CREATE TABLE shersched.qualification(
 qualification_id UUID NOT NULL,
 qualification_type_code Character varying(20) NOT NULL,
 required_for_all_flag Character(1) DEFAULT 'N' NOT NULL,
 created_by Character varying(32) NOT NULL,
 updated_by Character varying(32) NOT NULL,
 created_dtm Timestamp with time zone NOT NULL,
 updated_dtm Timestamp with time zone NOT NULL,
 revision_count Numeric(10,0) NOT NULL
)
;

-- Create indexes for table shersched.qualification

CREATE INDEX IX_Relationship1 ON shersched.qualification (qualification_type_code)
;

-- Add keys for table shersched.qualification

ALTER TABLE shersched.qualification ADD CONSTRAINT qlf_pk PRIMARY KEY (qualification_id)
;

-- Table shersched.assignment_block

CREATE TABLE shersched.assignment_block(
 assignment_block_id UUID NOT NULL,
 fixed_start_flag Character(1) DEFAULT 'Y' NOT NULL,
 start_hour Integer,
 length_hours Numeric,
 shift_id Integer,
 work_section_code Character varying(20),
 created_by Character varying(32) NOT NULL,
 updated_by Character varying(32) NOT NULL,
 created_dtm Timestamp with time zone NOT NULL,
 updated_dtm Timestamp with time zone NOT NULL,
 revision_count Numeric(10,0) NOT NULL
)
;

-- Create indexes for table shersched.assignment_block

CREATE INDEX ix_relationship22 ON shersched.assignment_block (shift_id)
;

CREATE INDEX ix_assgnblk_wksct_fk ON shersched.assignment_block (work_section_code)
;

-- Add keys for table shersched.assignment_block

ALTER TABLE shersched.assignment_block ADD CONSTRAINT asntblk_pk PRIMARY KEY (assignment_block_id)
;

-- Table shersched.sheriff_qualification_xref

CREATE TABLE shersched.sheriff_qualification_xref(
 sheriff_id UUID NOT NULL,
 qualification_id UUID NOT NULL,
 expiry_date Date,
 created_by Character varying(32) NOT NULL,
 updated_by Character varying(32) NOT NULL,
 created_dtm Timestamp with time zone NOT NULL,
 updated_dtm Timestamp with time zone NOT NULL,
 revision_count Numeric(10,0) NOT NULL
)
;

-- Add keys for table shersched.sheriff_qualification_xref

ALTER TABLE shersched.sheriff_qualification_xref ADD CONSTRAINT shrfqlfx_pk PRIMARY KEY (qualification_id,sheriff_id)
;

-- Table shersched.assignment_qualification_xref

CREATE TABLE shersched.assignment_qualification_xref(
 assignment_qualification_xref_id UUID NOT NULL,
 qualification_id UUID NOT NULL,
 assignment_id UUID NOT NULL,
 created_by Character varying(32) NOT NULL,
 updated_by Character varying(32) NOT NULL,
 created_dtm Timestamp with time zone NOT NULL,
 updated_dtm Timestamp with time zone NOT NULL,
 revision_count Numeric(10,0) NOT NULL
)
;

-- Create indexes for table shersched.assignment_qualification_xref

CREATE INDEX IX_asntqlfx_qlf_pk ON shersched.assignment_qualification_xref (qualification_id)
;

CREATE INDEX IX_asntqlfx_asnt_fk ON shersched.assignment_qualification_xref (assignment_id)
;

-- Add keys for table shersched.assignment_qualification_xref

ALTER TABLE shersched.assignment_qualification_xref ADD CONSTRAINT asntqlfx_pk PRIMARY KEY (assignment_qualification_xref_id)
;

ALTER TABLE shersched.assignment_qualification_xref ADD CONSTRAINT asntqlfx_uk UNIQUE (assignment_id,qualification_id)
;

-- Table shersched.courthouse

CREATE TABLE shersched.courthouse(
 location_id UUID NOT NULL,
 courthouse_type_code Character varying NOT NULL,
 org_unit_id UUID NOT NULL,
 geometry Point,
 region_location_id UUID,
 created_by Character varying(32) NOT NULL,
 updated_by Character varying(32) NOT NULL,
 created_dtm Timestamp with time zone NOT NULL,
 updated_dtm Timestamp with time zone NOT NULL,
 revision_count Numeric(10,0) NOT NULL
)
;

-- Create indexes for table shersched.courthouse

CREATE INDEX ix_relationship19 ON shersched.courthouse (org_unit_id)
;

CREATE INDEX IX_Relationship2 ON shersched.courthouse (region_location_id)
;

-- Add keys for table shersched.courthouse

ALTER TABLE shersched.courthouse ADD CONSTRAINT crths_pk PRIMARY KEY (location_id)
;

-- Table shersched.courtroom

CREATE TABLE shersched.courtroom(
 location_id UUID NOT NULL,
 room_number Character varying(20) NOT NULL,
 courthouse_location_id UUID,
 created_by Character varying(32) NOT NULL,
 updated_by Character varying(32) NOT NULL,
 created_dtm Timestamp with time zone NOT NULL,
 updated_dtm Timestamp with time zone NOT NULL,
 revision_count Numeric(10,0) NOT NULL
)
;

-- Create indexes for table shersched.courtroom

CREATE INDEX IX_Relationship3 ON shersched.courtroom (courthouse_location_id)
;

-- Add keys for table shersched.courtroom

ALTER TABLE shersched.courtroom ADD CONSTRAINT crtrm_pk PRIMARY KEY (location_id)
;

-- Table shersched.shift

CREATE TABLE shersched.shift(
 shift_id Serial NOT NULL,
 shift_status Character varying,
 shift_date Date,
 shift_start_time Time,
 rotation_template_flag Character(1) DEFAULT 'N' NOT NULL,
 org_unit_id UUID,
 sheriff_id UUID,
 created_by Character varying(32) NOT NULL,
 updated_by Character varying(32) NOT NULL,
 created_dtm Timestamp with time zone NOT NULL,
 updated_dtm Timestamp with time zone NOT NULL,
 revision_count Numeric(10,0) NOT NULL
)
;

-- Create indexes for table shersched.shift

CREATE INDEX ix_shft_shrf_fk ON shersched.shift (sheriff_id)
;

CREATE INDEX ix_relationship27 ON shersched.shift (org_unit_id)
;

-- Add keys for table shersched.shift

ALTER TABLE shersched.shift ADD CONSTRAINT shft_pk PRIMARY KEY (shift_id)
;

-- Table shersched.work_section_code

CREATE TABLE shersched.work_section_code(
 work_section_code Character varying(20) NOT NULL,
 work_section_description Character varying(100),
 effective_date Date NOT NULL,
 expiry_date Date,
 created_by Character varying(32) NOT NULL,
 updated_by Character varying(32) NOT NULL,
 created_dtm Timestamp with time zone NOT NULL,
 updated_dtm Timestamp with time zone NOT NULL,
 revision_count Numeric(10,0) NOT NULL
)
;

-- Add keys for table shersched.work_section_code

ALTER TABLE shersched.work_section_code ADD CONSTRAINT wksct_pk PRIMARY KEY (work_section_code)
;

-- Table shersched.region

CREATE TABLE shersched.region(
 location_id UUID NOT NULL,
 geometry Polygon,
 created_by Character varying(32) NOT NULL,
 updated_by Character varying(32) NOT NULL,
 created_dtm Timestamp with time zone NOT NULL,
 updated_dtm Timestamp with time zone NOT NULL,
 revision_count Numeric(10,0) NOT NULL
)
;

-- Add keys for table shersched.region

ALTER TABLE shersched.region ADD CONSTRAINT regn_pk PRIMARY KEY (location_id)
;
-- Create foreign keys (relationships) section ------------------------------------------------- 

ALTER TABLE shersched.assignment ADD CONSTRAINT asnt_asnttp_fk FOREIGN KEY (assignment_type_code) REFERENCES shersched.assignment_type_code (assignment_type_code) ON DELETE NO ACTION ON UPDATE NO ACTION
;

ALTER TABLE shersched.sheriff_qualification_xref ADD CONSTRAINT shrfqlfx_shrf_fk FOREIGN KEY (sheriff_id) REFERENCES shersched.sheriff (sheriff_id) ON DELETE NO ACTION ON UPDATE NO ACTION
;

ALTER TABLE shersched.sheriff_qualification_xref ADD CONSTRAINT shrfqlfx_qlf_fk FOREIGN KEY (qualification_id) REFERENCES shersched.qualification (qualification_id) ON DELETE NO ACTION ON UPDATE NO ACTION
;

ALTER TABLE shersched.assignment_qualification_xref ADD CONSTRAINT asntqlfx_qlf_fk FOREIGN KEY (qualification_id) REFERENCES shersched.qualification (qualification_id) ON DELETE NO ACTION ON UPDATE NO ACTION
;

ALTER TABLE shersched.assignment_qualification_xref ADD CONSTRAINT asntqlfx_asnt_fk FOREIGN KEY (assignment_id) REFERENCES shersched.assignment (assignment_id) ON DELETE NO ACTION ON UPDATE NO ACTION
;

ALTER TABLE shersched.shift ADD CONSTRAINT shft_shrf_fk FOREIGN KEY (sheriff_id) REFERENCES shersched.sheriff (sheriff_id) ON DELETE NO ACTION ON UPDATE NO ACTION
;

ALTER TABLE shersched.assignment_type_code ADD CONSTRAINT asnttp_wksct_fk FOREIGN KEY (work_section_code) REFERENCES shersched.work_section_code (work_section_code) ON DELETE NO ACTION ON UPDATE NO ACTION
;

ALTER TABLE shersched.assignment_block ADD CONSTRAINT asntblk_shft_fk FOREIGN KEY (shift_id) REFERENCES shersched.shift (shift_id) ON DELETE NO ACTION ON UPDATE NO ACTION
;

ALTER TABLE shersched.assignment_block ADD CONSTRAINT asntblk_wksct_fk FOREIGN KEY (work_section_code) REFERENCES shersched.work_section_code (work_section_code) ON DELETE NO ACTION ON UPDATE NO ACTION
;

ALTER TABLE shersched.courthouse ADD CONSTRAINT crths_regn_fk FOREIGN KEY (region_location_id) REFERENCES shersched.region (location_id) ON DELETE NO ACTION ON UPDATE NO ACTION
;

ALTER TABLE shersched.courtroom ADD CONSTRAINT crtrm_crths_fk FOREIGN KEY (courthouse_location_id) REFERENCES shersched.courthouse (location_id) ON DELETE NO ACTION ON UPDATE NO ACTION
;



-- Grant permissions section -------------------------------------------------


