-- set schema
SET search_path TO shersched;

-- allow create of UUIDs
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";


-- SHIFT
INSERT INTO shift (shift_id,location_id,shift_template_id,sheriff_id,work_section_code,start_time,end_time,shift_status,created_by,updated_by,created_dtm,updated_dtm,revision_count)	VALUES (uuid_generate_v4(),(SELECT L.location_id FROM location L WHERE L.location_name='VANCOUVER'),null,(SELECT s.sheriff_id FROM sheriff s WHERE s.badge_no ='BN10000'),'COURTS',to_timestamp('2018-02-09 09:00','yyyy-MM-dd HH24:MI'),to_timestamp('2018-02-09 17:00','yyyy-MM-dd HH24:MI'),'','test','test',now(),now(),0);
