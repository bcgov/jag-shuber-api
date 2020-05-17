#!/usr/bin/env bash
SCRIPTDIR=$(dirname "$0")

echo -e "Running Liquibase ..."\\n

# Postgres admin user is 'postgres'
export PG_ADMIN_USER=${PG_ADMIN_USER:-postgres}
export PG_ADMIN_PASSWORD=${PG_ADMIN_PASSWORD:-${POSTGRESQL_ADMIN_PASSWORD}}

export PG_USER=${PG_USER:-${PGUSER:-shersched}}
export PG_PASSWORD=${PG_PASSWORD:-${PGPASSWORD}}

# Schema to use for liquibase tables (must exist)
export PG_DEFAULT_SCHEMA=${PG_DEFAULT_SCHEMA:-public}

# Postgres connection info and database
export PG_HOST=${PG_HOST:-${PGHOST:-localhost}}
export POSTGRES_SERVICE_PORT=${POSTGRES_SERVICE_PORT:-5432}

# Catalog and schema to use for sheriff scheduling application
export POSTGRES_CATALOG=${POSTGRES_CATALOG:-appdb}
export PG_DATABASE=${PG_DATABASE:-${POSTGRES_DATABASE:-${POSTGRESQL_DATABASE:-${PGDATABASE:-appdb}}}}
export API_DATABASE_SCHEMA=${API_DATABASE_SCHEMA:-shersched}
export POSTGRES_EXT_SCHEMA=${POSTGRES_EXT_SCHEMA:-extensions}

export LIQUIBASE_CONTEXTS=${LIQUIBASE_CONTEXTS:-${API_DATA_CONTEXTS}}

pushd "${SCRIPTDIR}/liquibase/" >/dev/null
echo "pwd: `pwd`"
echo "env:"
echo -e "\tPG_ADMIN_USER: ${PG_ADMIN_USER}"
echo -e "\tPG_ADMIN_PASSWORD: ${PG_ADMIN_PASSWORD}"
echo -e "\tPG_USER: ${PG_USER}"
echo -e "\tPG_PASSWORD: ${PG_PASSWORD}"
echo -e "\tPG_DEFAULT_SCHEMA: ${PG_DEFAULT_SCHEMA}"
echo -e "\tPG_HOST: ${PG_HOST}"
echo -e "\tPOSTGRES_SERVICE_PORT: ${POSTGRES_SERVICE_PORT}"
echo -e "\tPOSTGRES_CATALOG: ${POSTGRES_CATALOG}"
echo -e "\tPG_DATABASE: ${PG_DATABASE}"
echo -e "\tAPI_DATABASE_SCHEMA: ${API_DATABASE_SCHEMA}"
echo -e "\tPOSTGRES_EXT_SCHEMA: ${POSTGRES_EXT_SCHEMA}"
echo -e "\tLIQUIBASE_CONTEXTS: ${LIQUIBASE_CONTEXTS}"

echo -e "jdbc url: jdbc:postgresql://$PG_HOST:$POSTGRES_SERVICE_PORT/$PG_DATABASE"\\n

echo liquibase --driver=org.postgresql.Driver \
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

echo
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
popd >/dev/null