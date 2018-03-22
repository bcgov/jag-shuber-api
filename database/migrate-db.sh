#!/usr/bin/env bash
SCRIPTDIR=$(dirname "$0")

echo "Running Liquibase"

liquibase --driver=org.postgresql.Driver \
          --changeLogFile=liquibase/shersched.db.changelog-master.xml \
          --url="jdbc:postgresql://$POSTGRES_URL:$POSTGRES_PORT/$POSTGRES_DATABASE" \
          --username=$POSTGRES_USER \
          --password=$POSTGRES_PASS \
          --defaultSchemaName=$POSTGRES_DEFAULT_SCHEMA \
          --logLevel=debug update \
          -DPOSTGRES_APP_USER=$POSTGRES_APP_USER \
          -DPOSTGRES_APP_PASS=$POSTGRES_APP_PASS \
          -DPOSTGRES_CATALOG=$POSTGRES_CATALOG \
          -DPOSTGRES_SCHEMA=$POSTGRES_SCHEMA

echo "Finished running Liquibase"
