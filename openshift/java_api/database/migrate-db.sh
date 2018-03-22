#!/usr/bin/env bash
SCRIPTDIR=$(dirname "$0")

# DB_ROLES_FILE="/database/db.changelog-roles.xml"

# sed -i 's/${POSTGRES_USER}/'"$POSTGRES_USER"'/g' $DB_ROLES_FILE
# sed -i 's/${PGRST_DB_SCHEMA}/'"$PGRST_DB_SCHEMA"'/g' $DB_ROLES_FILE
# sed -i 's/${PGRST_DB_ANON_ROLE}/'"$PGRST_DB_ANON_ROLE"'/g' $DB_ROLES_FILE

# liquibase \
# --classpath=/liquibase/lib \
# --driver=org.postgresql.Driver \
# --changeLogFile=/database/db.changelog-master.xml \
# --url="jdbc:postgresql://postgres:$POSTGRES_SERVICE_PORT/$POSTGRES_DATABASE" \
# --username=postgres \
# --password=$POSTGRES_ADMIN_PASSWORD \
# update \
# -DPOSTGRES_USER=$POSTGRES_USER \
# -DPGRST_DB_SCHEMA=$PGRST_DB_SCHEMA \
# -DPGRST_DB_ANON_ROLE=$PGRST_DB_ANON_ROLE

echo "THIS FILE WILL EVENTUALLY RUN DATABASE MIGRATIONS VIA LIQUIBASE"