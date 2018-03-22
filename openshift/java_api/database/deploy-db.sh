#!/usr/bin/env bash
SCRIPTDIR=$(dirname "$0")

export PGPASSFILE="$HOME/.pgpass"

# Create pgpassfile with connection string so we can run psql without specifying usernames/passwords
echo "postgres:$POSTGRES_SERVICE_PORT:$POSTGRES_DATABASE:postgres:$POSTGRES_ADMIN_PASSWORD" > $PGPASSFILE
echo "postgres:$POSTGRES_SERVICE_PORT:$POSTGRES_DATABASE:shersched:$POSTGRES_PASSWORD" >> $PGPASSFILE

chmod 0600 $PGPASSFILE

read -p "Drop current schema and Roles? (Y/n)" drop
drop=${drop:-y}
drop=$(echo $drop |awk '{print tolower($0)}')

# Create the PSQL command using the admin user
export PSQL_CMD="psql -h postgres -p $POSTGRES_SERVICE_PORT -d $POSTGRES_DATABASE -U postgres -w -a -q"

if [ "$drop" == "y" ]; then
    echo "Dropping current schema"
    $PSQL_CMD -c "DROP SCHEMA IF EXISTS shersched CASCADE;"
    $PSQL_CMD -c "DROP USER IF EXISTS shersched;"
fi

echo "Creating roles..."
$PSQL_CMD -c "CREATE USER shersched WITH PASSWORD '$POSTGRES_PASSWORD';"
$PSQL_CMD -c "CREATE SCHEMA shersched AUTHORIZATION shersched;"

echo "Adding uuid extension"
$PSQL_CMD -c "CREATE EXTENSION IF NOT EXISTS \"uuid-ossp\";"
$PSQL_CMD -c "ALTER EXTENSION \"uuid-ossp\" SET SCHEMA shersched;"

# Replace the PSQL command with the non-admin user
export PSQL_CMD="psql -h postgres -p $POSTGRES_SERVICE_PORT -d $POSTGRES_DATABASE -U shersched -w -a -q"

echo "Initializing Scheriff Scheduling Database"
$PSQL_CMD -f "$SCRIPTDIR/toad_data_modeler/scripts/GenerateSherSchedPG.sql"
echo "Sheriff Scheduling Database Initialized"

read -p "Load development data? (Y/n)" load
load=${load:-y}
load=$(echo $load |awk '{print tolower($0)}')

if [ "$load" == "y" ]; then
    echo "Loading development data"
    $PSQL_CMD -f "$SCRIPTDIR/dml/location_code.sql"
    $PSQL_CMD -f "$SCRIPTDIR/dml/work_section_code.sql"
    $PSQL_CMD -f "$SCRIPTDIR/dml/region.sql"
    $PSQL_CMD -f "$SCRIPTDIR/dml/courthouse.sql"
    $PSQL_CMD -f "$SCRIPTDIR/dml/courtroom.sql"
    $PSQL_CMD -f "$SCRIPTDIR/dml/sheriff.sql"
fi

rm $PGPASSFILE
unset PGPASSFILE