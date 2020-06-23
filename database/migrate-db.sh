#!/usr/bin/env bash
SCRIPTDIR=$(dirname "$0")

echo "Running Liquibase"

export PG_HOST=$PGHOST
export POSTGRES_SERVICE_PORT=5432

# Postgres admin user is 'postgres'
export PG_ADMIN_USER="postgres"
export PG_DEFAULT_SCHEMA="public"

echo "pwd: `pwd`"
echo "env: `env | grep POSTGRES_`"
echo "jdbc url: jdbc:postgresql://$PG_HOST:$POSTGRES_SERVICE_PORT/appdb"
echo "admin user: $PG_ADMIN_USER | admin password: $PGPASSWORD"
echo "app user: $PGUSER | app password: $PGPASSWORD"

cd "${SCRIPTDIR}/liquibase/"

# --url="jdbc:postgresql://$PG_HOST:$POSTGRES_SERVICE_PORT/$PG_DATABASE" \

# TODO: WE NEED AN ENVIRONMENT VARIABLE FOR THE PG ADMIN PASSWORD
liquibase --driver=org.postgresql.Driver \
         --contexts="$LIQUIBASE_CONTEXTS" \
         --changeLogFile=shersched.db.changelog.MASTER.xml \
         --url="jdbc:postgresql://$PG_HOST:$POSTGRES_SERVICE_PORT/appdb" \
         --username=$PG_ADMIN_USER \
         --password=$PGADMINPASSWORD \
         --defaultSchemaName=$PG_DEFAULT_SCHEMA \
         --logLevel=info clearCheckSums \
         -DPOSTGRES_APP_USER=$PGUSER \
         -DPOSTGRES_APP_PASS=$PGPASSWORD \
         -DPOSTGRES_CATALOG=appdb \
         -DPOSTGRES_SCHEMA=shersched \
         -DPOSTGRES_EXT_SCHEMA=$POSTGRES_EXT_SCHEMA

liquibase --driver=org.postgresql.Driver \
         --contexts="$LIQUIBASE_CONTEXTS" \
         --changeLogFile=shersched.db.changelog.MASTER.xml \
         --url="jdbc:postgresql://$PG_HOST:$POSTGRES_SERVICE_PORT/appdb" \
         --username=$PG_ADMIN_USER \
         --password=$PGADMINPASSWORD \
         --defaultSchemaName=$PG_DEFAULT_SCHEMA \
         --logLevel=info update \
         -DPOSTGRES_APP_USER=$PGUSER \
         -DPOSTGRES_APP_PASS=$PGPASSWORD \
         -DPOSTGRES_CATALOG=appdb \
         -DPOSTGRES_SCHEMA=shersched \
         -DPOSTGRES_EXT_SCHEMA=$POSTGRES_EXT_SCHEMA

echo "Finished Liquibase"
