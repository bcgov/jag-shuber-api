#!/usr/bin/env bash
SCRIPTDIR=$(dirname "$0")

echo "Running Liquibase"

# Postgres admin user is 'postgres'
export PG_ADMIN_USER="postgres"

cd "${SCRIPTDIR}/liquibase/"

liquibase --driver=org.postgresql.Driver \
          --contexts="$LIQUIBASE_CONTEXTS" \
          --changeLogFile=shersched.db.changelog.MASTER.xml \
          --url="jdbc:postgresql://postgres:$POSTGRES_SERVICE_PORT/$PG_DATABASE" \
          --username=$PG_ADMIN_USER \
          --password=$PG_ADMIN_PASSWORD \
          --defaultSchemaName=$PG_DEFAULT_SCHEMA \
          --logLevel=debug update \
          -DPOSTGRES_APP_USER=$PG_USER \
          -DPOSTGRES_APP_PASS=$PG_PASSWORD \
          -DPOSTGRES_CATALOG=$PG_DATABASE \
          -DPOSTGRES_SCHEMA=$API_DATABASE_SCHEMA \
          -DPOSTGRES_EXT_SCHEMA=$POSTGRES_EXT_SCHEMA


