#postgres user information
export POSTGRES_USER=postgres
export POSTGRES_PASS=password

#schema to use for liquibase tables (must exist)
export POSTGRES_DEFAULT_SCHEMA=public

#postgres connection info and database
export POSTGRES_URL=localhost
export POSTGRES_PORT=5432
export POSTGRES_DATABASE=appdb

#application user information
export POSTGRES_APP_USER=shersched
export POSTGRES_APP_PASS=password

#catalog and schema to use for sheriff scheduling application
export POSTGRES_CATALOG=justice
export POSTGRES_SCHEMA=shersched


java -jar /usr/local/opt/liquibase/libexec/liquibase.jar \
     --driver=org.postgresql.Driver \
     --classpath=/Users/michael.gabelmann/Work/_projects/jag-shuber-api/openshift/java_api/nondeliverable/lib/postgresql-42.2.1.jar \
     --changeLogFile=shersched.db.changelog-master.xml \
     --url="jdbc:postgresql://$POSTGRES_URL:$POSTGRES_PORT/$POSTGRES_DATABASE" \
     --username=$POSTGRES_USER \
     --password=$POSTGRES_PASS \
     --defaultSchemaName=$POSTGRES_DEFAULT_SCHEMA \
     --logLevel=debug \
     update \
     -DPOSTGRES_APP_USER=$POSTGRES_APP_USER \
     -DPOSTGRES_APP_PASS=$POSTGRES_APP_PASS \
     -DPOSTGRES_CATALOG=$POSTGRES_CATALOG \
     -DPOSTGRES_SCHEMA=$POSTGRES_SCHEMA

#liquibase --driver=org.postgresql.Driver --changeLogFile=shersched.db.changelog-master.xml --url="jdbc:postgresql://$POSTGRES_URL:$POSTGRES_PORT/$POSTGRES_DATABASE" --username=$POSTGRES_USER --password=$POSTGRES_PASS --defaultSchemaName=$POSTGRES_DEFAULT_SCHEMA --logLevel=debug update -DPOSTGRES_APP_USER=$POSTGRES_APP_USER -DPOSTGRES_APP_PASS=$POSTGRES_APP_PASS -DPOSTGRES_CATALOG=$POSTGRES_CATALOG -DPOSTGRES_SCHEMA=$POSTGRES_SCHEMA
