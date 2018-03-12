/*
Created: 05/01/2018
Modified: 08/03/2018
Model: PostgreSQL 9.5
Database: PostgreSQL 9.5
*/


-- Create roles section -------------------------------------------------

CREATE ROLE tdm_shersched
;

-- Create schemas section -------------------------------------------------

CREATE SCHEMA tdm_shersched AUTHORIZATION tdm_shersched
;

-- Create tables section -------------------------------------------------

-- Table shersched.sheriff

CREATE TABLE sheriff(
 sheriff_id UUID NOT NULL,
 badge_no Character varying(20) NOT NULL,
 location_id UUID,
 userid Character varying(20) NOT NULL,
 first_name Character varying(100),
 last_name Character varying(100),
 rank Character varying(50),
 image_url Character varying(200),
 created_by Character varying(32) NOT NULL,
 updated_by Character varying(32) NOT NULL,
 created_dtm Timestamp with time zone NOT NULL,
 updated_dtm Timestamp with time zone NOT NULL,
 revision_count Numeric(10,0) NOT NULL
)
;

COMMENT ON TABLE sheriff IS 'SHERIFF captures information related to a Sheriff and their profile.'
;
COMMENT ON COLUMN sheriff.image_url IS 'TBD how to store a Sheriff photo'
;

-- Create indexes for table shersched.sheriff

CREATE INDEX ix_shrf_cths_fk ON sheriff (location_id)
;

-- Add keys for table shersched.sheriff

ALTER TABLE sheriff ADD CONSTRAINT shrf_pk PRIMARY KEY (sheriff_id)
;

ALTER TABLE sheriff ADD CONSTRAINT shrf_bdgn_uk UNIQUE (badge_no)
;

ALTER TABLE sheriff ADD CONSTRAINT shrf_usrd_uk UNIQUE (userid)
;

-- Table shersched.duty

CREATE TABLE duty(
 duty_id UUID NOT NULL,
 start_time Timestamp with time zone,
 end_time Timestamp with time zone,
 shift_id UUID,
 work_section_code Character varying(20),
 assignment_stream_id UUID,
 assignment_template_id UUID
 created_by Character varying(32) NOT NULL,
 updated_by Character varying(32) NOT NULL,
 created_dtm Timestamp with time zone NOT NULL,
 updated_dtm Timestamp with time zone NOT NULL,
 revision_count Numeric(10,0) NOT NULL,
)
;

-- Create indexes for table shersched.duty

CREATE INDEX ix_duty_shft_pk ON duty (shift_id)
;

CREATE INDEX ix_duty_wksc_fk ON duty (work_section_code)
;

CREATE INDEX ix_duty_astr_fk ON duty (assignment_stream_id)
;

CREATE INDEX ix_duty_dttm_fk ON duty (assignment_template_id)
;

-- Add keys for table shersched.duty

ALTER TABLE duty ADD CONSTRAINT duty_pk PRIMARY KEY (duty_id)
;

-- Table shersched.duty_template

CREATE TABLE duty_template(
 duty_template_id UUID NOT NULL,
 start_time Time with time zone,
 end_time Time with time zone,
 shift_template_id UUID,
 work_section_code Character varying(20),
 recurrence_id UUID,
 assignment_stream_id UUID,
 created_by Character varying(32) NOT NULL,
 updated_by Character varying(32) NOT NULL,
 created_dtm Timestamp with time zone NOT NULL,
 updated_dtm Timestamp with time zone NOT NULL,
 revision_count Numeric(10,0) NOT NULL
)
;

-- Create indexes for table shersched.duty_template

CREATE INDEX ix_dttm_pk ON duty_template (duty_template_id)
;

CREATE INDEX ix_dttm_wksc_fk ON duty_template (work_section_code)
;

CREATE INDEX ix_dttm_astr_fk ON duty_template (assignment_stream_id)
;

CREATE INDEX ix_dttm_sftm_fk ON duty_template (shift_template_id)
;

CREATE INDEX ix_dttm_rcur_fk ON duty_template (recurrence_id)
;

-- Add keys for table shersched.duty_template

ALTER TABLE duty_template ADD CONSTRAINT dttm_pk PRIMARY KEY (duty_template_id)
;

-- Table shersched.courthouse

CREATE TABLE courthouse(
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

CREATE INDEX ix_cths_orgu_fk ON courthouse (org_unit_id)
;

CREATE INDEX ix_cths_rloc_fk ON courthouse (region_location_id)
;

CREATE INDEX ix_cths_loc_fk ON courthouse (location_id)
;

-- Add keys for table shersched.courthouse

ALTER TABLE courthouse ADD CONSTRAINT cths_pk PRIMARY KEY (location_id)
;

-- Table shersched.courtroom

CREATE TABLE courtroom(
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

CREATE INDEX ix_ctrm_cloc_fk ON courtroom (courthouse_location_id)
;

-- Add keys for table shersched.courtroom

ALTER TABLE courtroom ADD CONSTRAINT ctrm_pk PRIMARY KEY (location_id)
;

-- Table shersched.shift

CREATE TABLE shift(
 shift_id UUID NOT NULL,
 location_id UUID NOT NULL,
 shift_template_id UUID,
 sheriff_id UUID,
 work_section_code Character varying(20),
 start_time Timestamp with time zone,
 end_time Timestamp with time zone,
 shift_status Character varying,
 created_by Character varying(32) NOT NULL,
 updated_by Character varying(32) NOT NULL,
 created_dtm Timestamp with time zone NOT NULL,
 updated_dtm Timestamp with time zone NOT NULL,
 revision_count Numeric(10,0) NOT NULL
)
;

-- Create indexes for table shersched.shift

CREATE INDEX ix_shft_shrf_fk ON shift (sheriff_id)
;

CREATE INDEX ix_shft_cths_fk ON shift (location_id)
;

CREATE INDEX ix_shft_sftm_fk ON shift (shift_template_id)
;

CREATE INDEX ix_shft_wksc_fk ON shift (work_section_code)
;

-- Add keys for table shersched.shift

ALTER TABLE shift ADD CONSTRAINT shft_pk PRIMARY KEY (shift_id)
;

-- Table shersched.shift_template

CREATE TABLE shift_template(
 shift_template_id UUID NOT NULL,
 location_id UUID NOT NULL,
 rotation_sequence Integer NOT NULL,
 work_section_code Character varying(20),
 start_time Time with time zone,
 end_time Time with time zone,
 recurrence_id UUID,
 created_by Character varying(32) NOT NULL,
 updated_by Character varying(32) NOT NULL,
 created_dtm Timestamp with time zone NOT NULL,
 updated_dtm Timestamp with time zone NOT NULL,
 revision_count Numeric(10,0) NOT NULL
)
;

-- Create indexes for table shersched.shift_template

CREATE INDEX ix_sftm_cths_fk ON shift_template (location_id)
;

CREATE INDEX ix_sftm_wksc_fk ON shift_template (work_section_code)
;

CREATE INDEX ix_sftm_rcur_fk ON shift_template (recurrence_id)
;

-- Add keys for table shersched.shift_template

ALTER TABLE shift_template ADD CONSTRAINT sftm_pk PRIMARY KEY (shift_template_id)
;

ALTER TABLE shift_template ADD CONSTRAINT sftm_uk UNIQUE (location_id,rotation_sequence)
;

-- Table shersched.work_section_code

CREATE TABLE work_section_code(
 work_section_code Character varying(20) NOT NULL,
 work_section_description Character varying(200),
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

ALTER TABLE work_section_code ADD CONSTRAINT wksc_pk PRIMARY KEY (work_section_code)
;

-- Table location

CREATE TABLE location(
 location_id UUID NOT NULL,
 location_type_code Character varying(20),
 parent_location_id UUID,
 location_name Character varying(200) NOT NULL,
 description Character varying(200),
 address Character varying(200),
 created_by Character varying(32) NOT NULL,
 updated_by Character varying(32) NOT NULL,
 created_dtm Timestamp with time zone NOT NULL,
 updated_dtm Timestamp with time zone NOT NULL,
 revision_count Numeric(10,0) NOT NULL
)
;

COMMENT ON TABLE location IS 'LOCATION is a generalization of physical locations that are needed for scheduling.  Subtypes include Region, Courthouse and Courtroom. Generally, locations refer to where a Sheriff is executing their duties.'
;

-- Create indexes for table location

CREATE INDEX ix_loc_ploc_fk ON location (parent_location_id)
;

CREATE INDEX ix_loc_lccd_fk ON location (location_type_code)
;

-- Add keys for table location

ALTER TABLE location ADD CONSTRAINT loc_pk PRIMARY KEY (location_id)
;

-- Table shersched.region

CREATE TABLE region(
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

ALTER TABLE region ADD CONSTRAINT regn_pk PRIMARY KEY (location_id)
;

-- Table location_code

CREATE TABLE location_code(
 location_code Character varying(20) NOT NULL,
 description Character varying(200) NOT NULL,
 effective_date Date NOT NULL,
 expiry_date Date,
 created_by Character varying(32) NOT NULL,
 updated_by Character varying(32) NOT NULL,
 created_dtm Timestamp with time zone NOT NULL,
 updated_dtm Timestamp with time zone NOT NULL,
 revision_count Numeric(10,0) NOT NULL
)
;

-- Add keys for table location_code

ALTER TABLE location_code ADD CONSTRAINT lccd_pk PRIMARY KEY (location_code)
;

-- Table assignment_stream

CREATE TABLE assignment_stream(
 assignment_stream_id UUID NOT NULL,
 org_unit_id UUID NOT NULL,
 location_id UUID NOT NULL,
 work_section_code Character varying(20),
 created_by Character varying(32) NOT NULL,
 updated_by Character varying(32) NOT NULL,
 created_dtm Timestamp with time zone NOT NULL,
 updated_dtm Timestamp with time zone NOT NULL,
 revision_count Numeric(10,0) NOT NULL
)
;

-- Create indexes for table assignment_stream

CREATE INDEX ix_astr_cths_fk ON assignment_stream (location_id)
;

CREATE INDEX ix_astr_wksc_fk ON assignment_stream (work_section_code)
;

-- Add keys for table assignment_stream

ALTER TABLE assignment_stream ADD CONSTRAINT astr_pk PRIMARY KEY (assignment_stream_id)
;

-- Table recurrence

CREATE TABLE recurrence(
 recurrence_id UUID NOT NULL,
 start_time Time,
 end_time Time,
 recurrence_days_bitmap Numeric(10,0) NOT NULL,
 created_by Character varying(32) NOT NULL,
 updated_by Character varying(32) NOT NULL,
 created_dtm Timestamp with time zone NOT NULL,
 updated_dtm Timestamp with time zone NOT NULL,
 revision_count Numeric(10,0) NOT NULL
)
;

-- Add keys for table recurrence

ALTER TABLE recurrence ADD CONSTRAINT recr_pk PRIMARY KEY (recurrence_id)
;

-- Table days_bitmap_code

CREATE TABLE days_bitmap_code(
 bitmap_set Character varying(50) NOT NULL,
 day_sequence Integer NOT NULL,
 day_label Character varying(50) NOT NULL,
 bitmap_value Bigint NOT NULL,
 description Character varying(200) NOT NULL,
 effective_date Date NOT NULL,
 expiry_date Date,
 created_by Character varying(32) NOT NULL,
 updated_by Character varying(32) NOT NULL,
 created_dtm Timestamp with time zone NOT NULL,
 updated_dtm Timestamp with time zone NOT NULL,
 revision_count Numeric(10,0) NOT NULL
)
;

-- Add keys for table days_bitmap_code

ALTER TABLE days_bitmap_code ADD CONSTRAINT dbmp_pk PRIMARY KEY (bitmap_set,day_sequence)
;
-- Create foreign keys (relationships) section ------------------------------------------------- 

ALTER TABLE shift ADD CONSTRAINT shft_shrf_fk FOREIGN KEY (sheriff_id) REFERENCES sheriff (sheriff_id) ON DELETE NO ACTION ON UPDATE NO ACTION
;

ALTER TABLE location ADD CONSTRAINT loc_ploc_fk FOREIGN KEY (parent_location_id) REFERENCES location (location_id) ON DELETE NO ACTION ON UPDATE NO ACTION
;

ALTER TABLE courtroom ADD CONSTRAINT ctrm_loc_fk FOREIGN KEY (location_id) REFERENCES location (location_id) ON DELETE NO ACTION ON UPDATE NO ACTION
;

ALTER TABLE courthouse ADD CONSTRAINT cths_loc_fk FOREIGN KEY (location_id) REFERENCES location (location_id) ON DELETE NO ACTION ON UPDATE NO ACTION
;

ALTER TABLE region ADD CONSTRAINT regn_loc_fk FOREIGN KEY (location_id) REFERENCES location (location_id) ON DELETE NO ACTION ON UPDATE NO ACTION
;

ALTER TABLE duty ADD CONSTRAINT duty_shft_fk FOREIGN KEY (shift_id) REFERENCES shift (shift_id) ON DELETE NO ACTION ON UPDATE NO ACTION
;

ALTER TABLE duty ADD CONSTRAINT duty_wksc_fk FOREIGN KEY (work_section_code) REFERENCES work_section_code (work_section_code) ON DELETE NO ACTION ON UPDATE NO ACTION
;

ALTER TABLE location ADD CONSTRAINT loc_lccd_fk FOREIGN KEY (location_type_code) REFERENCES location_code (location_code) ON DELETE NO ACTION ON UPDATE NO ACTION
;

ALTER TABLE courthouse ADD CONSTRAINT cths_rloc_fk FOREIGN KEY (region_location_id) REFERENCES region (location_id) ON DELETE NO ACTION ON UPDATE NO ACTION
;

ALTER TABLE courtroom ADD CONSTRAINT ctrm_cths_fk FOREIGN KEY (courthouse_location_id) REFERENCES courthouse (location_id) ON DELETE NO ACTION ON UPDATE NO ACTION
;

ALTER TABLE duty ADD CONSTRAINT duty_astr_fk FOREIGN KEY (assignment_stream_id) REFERENCES assignment_stream (assignment_stream_id) ON DELETE NO ACTION ON UPDATE NO ACTION
;

ALTER TABLE sheriff ADD CONSTRAINT shrf_cths_fk FOREIGN KEY (location_id) REFERENCES courthouse (location_id) ON DELETE NO ACTION ON UPDATE NO ACTION
;

ALTER TABLE shift ADD CONSTRAINT shft_cths_fk FOREIGN KEY (location_id) REFERENCES courthouse (location_id) ON DELETE NO ACTION ON UPDATE NO ACTION
;

ALTER TABLE assignment_stream ADD CONSTRAINT astr_cths_fk FOREIGN KEY (location_id) REFERENCES courthouse (location_id) ON DELETE NO ACTION ON UPDATE NO ACTION
;

ALTER TABLE shift ADD CONSTRAINT shft_sftm_fk FOREIGN KEY (shift_template_id) REFERENCES shift_template (shift_template_id) ON DELETE NO ACTION ON UPDATE NO ACTION
;

ALTER TABLE shift ADD CONSTRAINT shft_wksc_fk FOREIGN KEY (work_section_code) REFERENCES work_section_code (work_section_code) ON DELETE NO ACTION ON UPDATE NO ACTION
;

ALTER TABLE shift_template ADD CONSTRAINT sftm_wksc_fk FOREIGN KEY (work_section_code) REFERENCES work_section_code (work_section_code) ON DELETE NO ACTION ON UPDATE NO ACTION
;

ALTER TABLE duty ADD CONSTRAINT duty_dttm_fk FOREIGN KEY (assignment_template_id) REFERENCES duty_template (duty_template_id) ON DELETE NO ACTION ON UPDATE NO ACTION
;

ALTER TABLE duty_template ADD CONSTRAINT dttm_sftm_fk FOREIGN KEY (shift_template_id) REFERENCES shift_template (shift_template_id) ON DELETE NO ACTION ON UPDATE NO ACTION
;

ALTER TABLE duty_template ADD CONSTRAINT dttm_wksc_fk FOREIGN KEY (work_section_code) REFERENCES work_section_code (work_section_code) ON DELETE NO ACTION ON UPDATE NO ACTION
;

ALTER TABLE shift_template ADD CONSTRAINT sftm_rcur_fk FOREIGN KEY (recurrence_id) REFERENCES recurrence (recurrence_id) ON DELETE NO ACTION ON UPDATE NO ACTION
;

ALTER TABLE duty_template ADD CONSTRAINT dttm_rcur_fk FOREIGN KEY (recurrence_id) REFERENCES recurrence (recurrence_id) ON DELETE NO ACTION ON UPDATE NO ACTION
;

ALTER TABLE assignment_stream ADD CONSTRAINT astr_wksc_fk FOREIGN KEY (work_section_code) REFERENCES work_section_code (work_section_code) ON DELETE NO ACTION ON UPDATE NO ACTION
;



-- Grant permissions section -------------------------------------------------


