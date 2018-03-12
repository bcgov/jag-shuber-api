/*
Created: 05/01/2018
Modified: 08/03/2018
Model: PostgreSQL 9.5
Database: PostgreSQL 9.5
*/


-- Drop relationships section -------------------------------------------------

ALTER TABLE assignment_stream DROP CONSTRAINT IF EXISTS astr_wksc_fk
;
ALTER TABLE duty_template DROP CONSTRAINT IF EXISTS dttm_rcur_fk
;
ALTER TABLE shift_template DROP CONSTRAINT IF EXISTS sftm_rcur_fk
;
ALTER TABLE duty_template DROP CONSTRAINT IF EXISTS dttm_wksc_fk
;
ALTER TABLE duty_template DROP CONSTRAINT IF EXISTS dttm_sftm_fk
;
ALTER TABLE duty DROP CONSTRAINT IF EXISTS duty_dttm_fk
;
ALTER TABLE shift_template DROP CONSTRAINT IF EXISTS sftm_wksc_fk
;
ALTER TABLE shift DROP CONSTRAINT IF EXISTS shft_wksc_fk
;
ALTER TABLE shift DROP CONSTRAINT IF EXISTS shft_sftm_fk
;
ALTER TABLE assignment_stream DROP CONSTRAINT IF EXISTS astr_cths_fk
;
ALTER TABLE shift DROP CONSTRAINT IF EXISTS shft_cths_fk
;
ALTER TABLE sheriff DROP CONSTRAINT IF EXISTS shrf_cths_fk
;
ALTER TABLE duty DROP CONSTRAINT IF EXISTS duty_astr_fk
;
ALTER TABLE courtroom DROP CONSTRAINT IF EXISTS ctrm_cths_fk
;
ALTER TABLE courthouse DROP CONSTRAINT IF EXISTS cths_rloc_fk
;
ALTER TABLE location DROP CONSTRAINT IF EXISTS loc_lccd_fk
;
ALTER TABLE duty DROP CONSTRAINT IF EXISTS duty_wksc_fk
;
ALTER TABLE duty DROP CONSTRAINT IF EXISTS duty_shft_fk
;
ALTER TABLE region DROP CONSTRAINT IF EXISTS regn_loc_fk
;
ALTER TABLE courthouse DROP CONSTRAINT IF EXISTS cths_loc_fk
;
ALTER TABLE courtroom DROP CONSTRAINT IF EXISTS ctrm_loc_fk
;
ALTER TABLE location DROP CONSTRAINT IF EXISTS loc_ploc_fk
;
ALTER TABLE shift DROP CONSTRAINT IF EXISTS shft_shrf_fk
;




-- Drop keys for tables section -------------------------------------------------

ALTER TABLE duty_template DROP CONSTRAINT IF EXISTS dttm_pk
;
ALTER TABLE shift_template DROP CONSTRAINT IF EXISTS sftm_pk
;
ALTER TABLE shift_template DROP CONSTRAINT IF EXISTS sftm_uk
;
ALTER TABLE days_bitmap_code DROP CONSTRAINT IF EXISTS dbmp_pk
;
ALTER TABLE recurrence DROP CONSTRAINT IF EXISTS recr_pk
;
ALTER TABLE assignment_stream DROP CONSTRAINT IF EXISTS astr_pk
;
ALTER TABLE location_code DROP CONSTRAINT IF EXISTS lccd_pk
;
ALTER TABLE region DROP CONSTRAINT IF EXISTS regn_pk
;
ALTER TABLE location DROP CONSTRAINT IF EXISTS loc_pk
;
ALTER TABLE work_section_code DROP CONSTRAINT IF EXISTS wksc_pk
;
ALTER TABLE shift DROP CONSTRAINT IF EXISTS shft_pk
;
ALTER TABLE courtroom DROP CONSTRAINT IF EXISTS ctrm_pk
;
ALTER TABLE courthouse DROP CONSTRAINT IF EXISTS cths_pk
;
ALTER TABLE duty DROP CONSTRAINT IF EXISTS duty_pk
;
ALTER TABLE sheriff DROP CONSTRAINT IF EXISTS shrf_pk
;
ALTER TABLE sheriff DROP CONSTRAINT IF EXISTS shrf_bdgn_uk
;
ALTER TABLE sheriff DROP CONSTRAINT IF EXISTS shrf_usrd_uk
;


-- Drop indexes section -------------------------------------------------

DROP INDEX IF EXISTS ix_dttm_pk
;
DROP INDEX IF EXISTS ix_dttm_wksc_fk
;
DROP INDEX IF EXISTS ix_dttm_astr_fk
;
DROP INDEX IF EXISTS ix_dttm_sftm_fk
;
DROP INDEX IF EXISTS ix_dttm_rcur_fk
;
DROP INDEX IF EXISTS ix_sftm_cths_fk
;
DROP INDEX IF EXISTS ix_sftm_wksc_fk
;
DROP INDEX IF EXISTS ix_sftm_rcur_fk
;
DROP INDEX IF EXISTS ix_astr_cths_fk
;
DROP INDEX IF EXISTS ix_astr_wksc_fk
;
DROP INDEX IF EXISTS ix_loc_ploc_fk
;
DROP INDEX IF EXISTS ix_loc_lccd_fk
;
DROP INDEX IF EXISTS ix_shft_shrf_fk
;
DROP INDEX IF EXISTS ix_shft_cths_fk
;
DROP INDEX IF EXISTS ix_shft_sftm_fk
;
DROP INDEX IF EXISTS ix_shft_wksc_fk
;
DROP INDEX IF EXISTS ix_ctrm_cloc_fk
;
DROP INDEX IF EXISTS ix_cths_orgu_fk
;
DROP INDEX IF EXISTS ix_cths_rloc_fk
;
DROP INDEX IF EXISTS ix_cths_loc_fk
;
DROP INDEX IF EXISTS ix_duty_shft_pk
;
DROP INDEX IF EXISTS ix_duty_wksc_fk
;
DROP INDEX IF EXISTS ix_duty_astr_fk
;
DROP INDEX IF EXISTS ix_duty_dttm_fk
;
DROP INDEX IF EXISTS ix_shrf_cths_fk
;


-- Drop tables section ---------------------------------------------------

DROP TABLE IF EXISTS days_bitmap_code
;
DROP TABLE IF EXISTS recurrence
;
DROP TABLE IF EXISTS assignment_stream
;
DROP TABLE IF EXISTS location_code
;
DROP TABLE IF EXISTS region
;
DROP TABLE IF EXISTS location
;
DROP TABLE IF EXISTS work_section_code
;
DROP TABLE IF EXISTS shift_template
;
DROP TABLE IF EXISTS shift
;
DROP TABLE IF EXISTS courtroom
;
DROP TABLE IF EXISTS courthouse
;
DROP TABLE IF EXISTS duty_template
;
DROP TABLE IF EXISTS duty
;
DROP TABLE IF EXISTS sheriff
;

-- Drop schemas section --------------------------------------------------- 

DROP SCHEMA IF EXISTS tdm_shersched
;

-- Drop roles section --------------------------------------------------- 

DROP ROLE IF EXISTS tdm_shersched
;

-- Grant permissions section -------------------------------------------------


