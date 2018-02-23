/*
Created: 05/01/2018
Modified: 16/02/2018
Model: PostgreSQL 9.5
Database: PostgreSQL 9.5
*/




-- Drop relationships section -------------------------------------------------

ALTER TABLE shersched.courtroom DROP CONSTRAINT IF EXISTS crtrm_crths_fk
;
ALTER TABLE shersched.courthouse DROP CONSTRAINT IF EXISTS crths_regn_fk
;
ALTER TABLE shersched.assignment_block DROP CONSTRAINT IF EXISTS asntblk_wksct_fk
;
ALTER TABLE shersched.assignment_block DROP CONSTRAINT IF EXISTS asntblk_shft_fk
;
ALTER TABLE shersched.assignment_type_code DROP CONSTRAINT IF EXISTS asnttp_wksct_fk
;
ALTER TABLE shersched.shift DROP CONSTRAINT IF EXISTS shft_shrf_fk
;
ALTER TABLE shersched.assignment_qualification_xref DROP CONSTRAINT IF EXISTS asntqlfx_asnt_fk
;
ALTER TABLE shersched.assignment_qualification_xref DROP CONSTRAINT IF EXISTS asntqlfx_qlf_fk
;
ALTER TABLE shersched.sheriff_qualification_xref DROP CONSTRAINT IF EXISTS shrfqlfx_qlf_fk
;
ALTER TABLE shersched.sheriff_qualification_xref DROP CONSTRAINT IF EXISTS shrfqlfx_shrf_fk
;
ALTER TABLE shersched.assignment DROP CONSTRAINT IF EXISTS asnt_asnttp_fk
;




-- Drop keys for tables section -------------------------------------------------

ALTER TABLE shersched.region DROP CONSTRAINT IF EXISTS regn_pk
;
ALTER TABLE shersched.work_section_code DROP CONSTRAINT IF EXISTS wksct_pk
;
ALTER TABLE shersched.shift DROP CONSTRAINT IF EXISTS shft_pk
;
ALTER TABLE shersched.courtroom DROP CONSTRAINT IF EXISTS crtrm_pk
;
ALTER TABLE shersched.courthouse DROP CONSTRAINT IF EXISTS crths_pk
;
ALTER TABLE shersched.assignment_qualification_xref DROP CONSTRAINT IF EXISTS asntqlfx_pk
;
ALTER TABLE shersched.assignment_qualification_xref DROP CONSTRAINT IF EXISTS asntqlfx_uk
;
ALTER TABLE shersched.sheriff_qualification_xref DROP CONSTRAINT IF EXISTS shrfqlfx_pk
;
ALTER TABLE shersched.assignment_block DROP CONSTRAINT IF EXISTS asntblk_pk
;
ALTER TABLE shersched.qualification DROP CONSTRAINT IF EXISTS qlf_pk
;
ALTER TABLE shersched.assignment_type_code DROP CONSTRAINT IF EXISTS asnttp_pk
;
ALTER TABLE shersched.assignment DROP CONSTRAINT IF EXISTS asnt_pk
;
ALTER TABLE shersched.sheriff DROP CONSTRAINT IF EXISTS shrf_pk
;
ALTER TABLE shersched.sheriff DROP CONSTRAINT IF EXISTS shrf_badge_uk
;


-- Drop indexes section -------------------------------------------------

DROP INDEX IF EXISTS shersched.ix_shft_shrf_fk
;
DROP INDEX IF EXISTS shersched.ix_relationship27
;
DROP INDEX IF EXISTS shersched.IX_Relationship3
;
DROP INDEX IF EXISTS shersched.ix_relationship19
;
DROP INDEX IF EXISTS shersched.IX_Relationship2
;
DROP INDEX IF EXISTS shersched.IX_asntqlfx_qlf_pk
;
DROP INDEX IF EXISTS shersched.IX_asntqlfx_asnt_fk
;
DROP INDEX IF EXISTS shersched.ix_relationship22
;
DROP INDEX IF EXISTS shersched.ix_assgnblk_wksct_fk
;
DROP INDEX IF EXISTS shersched.IX_Relationship1
;
DROP INDEX IF EXISTS shersched.ix_relationship36
;
DROP INDEX IF EXISTS shersched.ix_relationship4
;
DROP INDEX IF EXISTS shersched.ix_relationship25
;
DROP INDEX IF EXISTS shersched.ix_relationship29
;
DROP INDEX IF EXISTS shersched.ix_relationship35
;
DROP INDEX IF EXISTS shersched.ix_relationship28
;


-- Drop tables section ---------------------------------------------------

DROP TABLE IF EXISTS shersched.region
;
DROP TABLE IF EXISTS shersched.work_section_code
;
DROP TABLE IF EXISTS shersched.shift
;
DROP TABLE IF EXISTS shersched.courtroom
;
DROP TABLE IF EXISTS shersched.courthouse
;
DROP TABLE IF EXISTS shersched.assignment_qualification_xref
;
DROP TABLE IF EXISTS shersched.sheriff_qualification_xref
;
DROP TABLE IF EXISTS shersched.assignment_block
;
DROP TABLE IF EXISTS shersched.qualification
;
DROP TABLE IF EXISTS shersched.assignment_type_code
;
DROP TABLE IF EXISTS shersched.assignment
;
DROP TABLE IF EXISTS shersched.sheriff
;

-- Drop schemas section --------------------------------------------------- 

DROP SCHEMA IF EXISTS shersched
;

-- Drop roles section --------------------------------------------------- 

DROP ROLE IF EXISTS shersched
;

-- Grant permissions section -------------------------------------------------


