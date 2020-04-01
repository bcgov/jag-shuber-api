#!/usr/bin/env bash
SCRIPTDIR=$(dirname "$0")

echo "Running Liquibase"

# Postgres admin user is 'postgres'
export PG_ADMIN_USER=postgres
export PG_ADMIN_PASSWORD=

#schema to use for liquibase tables (must exist)
export PG_DEFAULT_SCHEMA=public

#postgres connection info and database
export PG_HOST=localhost
export POSTGRES_SERVICE_PORT=5432
export POSTGRES_DATABASE=appdb

#application user information
export POSTGRES_APP_USER=shersched
export POSTGRES_APP_PASS=

#catalog and schema to use for sheriff scheduling application
export POSTGRES_CATALOG=appdb
export PG_DATABASE=postgres
# shersched


cd "${SCRIPTDIR}/liquibase/"

echo "pwd: `pwd`"
echo "env: `env | grep PG_`"
echo "jdbc url: jdbc:postgresql://$PG_HOST:$POSTGRES_SERVICE_PORT/$PG_DATABASE"

liquibase --driver=org.postgresql.Driver \
         --contexts="$LIQUIBASE_CONTEXTS" \
         --changeLogFile=shersched.db.changelog.MASTER.xml \
         --url="jdbc:postgresql://$PG_HOST:$POSTGRES_SERVICE_PORT/$PG_DATABASE" \
         --username=$PG_ADMIN_USER \
         --password=$PG_ADMIN_PASSWORD \
         --defaultSchemaName=$PG_DEFAULT_SCHEMA \
         --logLevel=info update \
         -DPOSTGRES_APP_USER=$PG_USER \
         -DPOSTGRES_APP_PASS=$PG_PASSWORD \
         -DPOSTGRES_CATALOG=$PG_DATABASE \
         -DPOSTGRES_SCHEMA=$API_DATABASE_SCHEMA \
         -DPOSTGRES_EXT_SCHEMA=$POSTGRES_EXT_SCHEMA

echo "Finished Liquibase"

