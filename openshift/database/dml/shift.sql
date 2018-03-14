-- set schema
SET search_path TO shersched;

-- allow create of UUIDs
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";


-- SHIFT
INSERT INTO shersched.shift(
	shift_id, location_id, shift_template_id, sheriff_id, work_section_code, start_time, end_time, shift_status, created_by, updated_by, created_dtm, updated_dtm, revision_count)
	VALUES (uuid_generate_v4(), 'd23c26ee-adc0-4bdd-9b1c-74ecdb3784a8', null, 'ddc7b263-eb5b-4805-9c0b-7ffd9106ac38', 'COURTROOM1', to_timestamp('2018-02-09 09:00','yyyy-MM-dd HH24:MI'), to_timestamp('2018-02-09 17:30','yyyy-MM-dd HH24:MI'), null, 'test', 'test', now(), now(), 0);
    
    