-- drop database objects so we can run liquibase again

DROP SCHEMA public CASCADE;
DROP SCHEMA shersched CASCADE;
DROP USER shersched;
-- DROP EXTENSION IF EXISTS "uuid-ossp" SCHEMA shersched;

CREATE SCHEMA public;
