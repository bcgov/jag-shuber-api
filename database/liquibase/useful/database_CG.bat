REM postgres user information
set POSTGRES_USER=mg_shersched_8
set POSTGRES_PASS=postgres

REM schema to use for liquibase tables (must exist)
set POSTGRES_DEFAULT_SCHEMA=mg_shersched_8

REM postgres connection info and database
set POSTGRES_URL=localhost
set POSTGRES_PORT=5432
set POSTGRES_DATABASE=postgres

REM application user information
set POSTGRES_APP_USER=mg_shersched_app_8
set POSTGRES_APP_PASS=postgres

REM catalog and schema to use for sheriff scheduling application
set POSTGRES_CATALOG=appdb
set POSTGRES_SCHEMA=mg_shersched_8

liquibase^
    --driver=org.postgresql.Driver^
    --classpath="c:\program files\postgreSQL\JDBC\postgresql-42.2.1.jar"^
    --changeLogFile=shersched.db.changelog-master.xml^
    --url="jdbc:postgresql://%POSTGRES_URL%:%POSTGRES_PORT%/%POSTGRES_DATABASE%"^
    --username=%POSTGRES_USER%^
    --password=%POSTGRES_PASS%^
    --defaultSchemaName=%POSTGRES_DEFAULT_SCHEMA%^
    --logLevel=debug^
    update^
    -DPOSTGRES_APP_USER=%POSTGRES_APP_USER%^
    -DPOSTGRES_APP_PASS=%POSTGRES_APP_PASS%^
    -DPOSTGRES_SCHEMA=%POSTGRES_SCHEMA%
  