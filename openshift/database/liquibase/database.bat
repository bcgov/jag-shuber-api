
set POSTGRES_USER=postgres
set POSTGRES_PASS=admin

set POSTGRES_URL=localhost
set POSTGRES_PORT=5432
set POSTGRES_DATABASE=appdb
set POSTGRES_SCHEMA=api
set POSTGRES_ANON_ROLE=web_anon

liquibase^
 --driver=org.postgresql.Driver^
 --changeLogFile=db.changelog-master.xml^
 --url="jdbc:postgresql://%POSTGRES_URL%:%POSTGRES_PORT%/%POSTGRES_DATABASE%"^
 --username=%POSTGRES_USER%^
 --password=%POSTGRES_PASS%^
 update^
 -DPOSTGRES_USER=%POSTGRES_USER%^
 -DPGRST_DB_SCHEMA=%POSTGRES_SCHEMA%^
 -DPGRST_DB_ANON_ROLE=%POSTGRES_ANON_ROLE%
  