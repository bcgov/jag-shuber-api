REM postgres user information
set POSTGRES_USER=postgres
set POSTGRES_PASS=password

REM schema to use for liquibase tables (must exist)
set POSTGRES_DEFAULT_SCHEMA=public

REM postgres connection info and database
set POSTGRES_URL=localhost
set POSTGRES_PORT=5432
set POSTGRES_DATABASE=appdb

REM application user information
set POSTGRES_APP_USER=shersched
set POSTGRES_APP_PASS=password

REM catalog and schema to use for sheriff scheduling application
set POSTGRES_CATALOG=appdb
set POSTGRES_SCHEMA=shersched

liquibase^
    --driver=org.postgresql.Driver^
    --changeLogFile=shersched.db.changelog-master.xml^
    --url="jdbc:postgresql://%POSTGRES_URL%:%POSTGRES_PORT%/%POSTGRES_DATABASE%"^
    --username=%POSTGRES_USER%^
    --password=%POSTGRES_PASS%^
    --defaultSchemaName=%POSTGRES_DEFAULT_SCHEMA%^
    --logLevel=debug^
    update^
    -DPOSTGRES_APP_USER=%POSTGRES_APP_USER%^
    -DPOSTGRES_APP_PASS=%POSTGRES_APP_PASS%^
    -DPOSTGRES_CATALOG=%POSTGRES_CATALOG%^
    -DPOSTGRES_SCHEMA=%POSTGRES_SCHEMA%
  