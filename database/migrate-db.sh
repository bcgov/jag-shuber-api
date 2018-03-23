#!/usr/bin/env bash
SCRIPTDIR=$(dirname "$0")

echo "Running Liquibase"

# The postgres host in openshift is just postgres (i.e. name of service)
export POSTGRES_HOST="postgres"
# Postgres admin user is 'postgres'
export POSTGRES_ADMIN_USER="postgres"

cd "${SCRIPTDIR}/liquibase/"

liquibase --driver=org.postgresql.Driver \
          --changeLogFile=shersched.db.changelog-master.xml \
          --url="jdbc:postgresql://$POSTGRES_HOST:$POSTGRES_SERVICE_PORT/$POSTGRES_DATABASE" \
          --username=$POSTGRES_ADMIN_USER \
          --password=$POSTGRES_ADMIN_PASSWORD \
          --defaultSchemaName=$POSTGRES_DEFAULT_SCHEMA \
          --logLevel=debug update \
          -DPOSTGRES_APP_USER=$POSTGRES_APP_USER \
          -DPOSTGRES_APP_PASS=$POSTGRES_APP_PASS \
          -DPOSTGRES_CATALOG=$POSTGRES_CATALOG \
          -DPOSTGRES_SCHEMA=$POSTGRES_SCHEMA


