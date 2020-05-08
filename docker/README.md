# Running the sheriff-scheduling API in Docker

This is the API Docker portion of the sheriff-scheduling appliaction.  The Frontend portion of the application is in the sheriff-scheduling Frontend repository.

See the docker folder of the sheriff-scheduling Frontend repository for details.

## Build
```
Wade@Epoch MINGW64 /c/jag-shuber-api/docker (master)
$ ./manage build
```

## Start
```
Wade@Epoch MINGW64 /c/jag-shuber-api/docker (master)
$ ./manage start
```

By default the API is started with the `TESTUSR` setup as the SA account.  If you want to start the API with a different account set as SA run the following:
```
Wade@Epoch MINGW64 /c/jag-shuber-api/docker (master)
$ ./manage start SYS_SA_AUTH_ID=WBARNES
```

## Restore a backup of the database

Create a `/c/jag-shuber-api/docker/tmp` folder if it does not exist.
Place a backup archive in that folder.

### Connect to the running database container
```
Wade@Epoch MINGW64 /c/jag-shuber-api/docker (master)
$ winpty docker exec -it sheriff-scheduling_postgres_1 bash
```

### Restore the database
```
bash-4.2$ psql -ac "CREATE USER shersched WITH PASSWORD 'n05dmkFjio1GCUVY';"
bash-4.2$ psql -ac "GRANT ALL ON DATABASE ${POSTGRESQL_DATABASE} TO shersched;"
bash-4.2$ gunzip -c /tmp2/postgres-appdb_2020-03-06_13-42-56.sql.gz | psql -v -x -h 127.0.0.1 -d appdb
```

### Test the restore
```
bash-4.2$ psql -d ${POSTGRESQL_DATABASE}
appdb=# select count(*) from shersched.duty;
 count
-------
  3706
(1 row)

appdb=# \q
bash-4.2$ exit
```

### Restart the API

Now that you've restored a copy of the database you need to restart the API;
```
Wade@Epoch MINGW64 /c/jag-shuber-api/docker (master)
$ ./manage stop
Stopping sheriff-scheduling_postgres_1 ... done
Stopping sheriff-scheduling_api_1      ... done
```

```
Wade@Epoch MINGW64 /c/jag-shuber-api/docker (master)
$ ./manage start
Recreating sheriff-scheduling_api_1      ... done
Recreating sheriff-scheduling_postgres_1 ... done
Attaching to sheriff-scheduling_postgres_1, sheriff-scheduling_api_1
api_1       | Environment:
api_1       |   DEV_MODE=false
...
```

## Stoping without deleting data
```
Wade@Epoch MINGW64 /c/jag-shuber-api/docker (master)
$ ./manage stop
```

## Cleanup / Reseting data
```
Wade@Epoch MINGW64 /c/jag-shuber-api/docker (master)
$ ./manage down
```