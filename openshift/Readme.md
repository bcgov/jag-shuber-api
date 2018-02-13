# OpenShift configuration files

Here we have a couple files of interest:

- **build.json** : template for the api build system
- **deploy.json** : template for the api + postgres backend

> ## `postgrest/`
> Contains the docker context for the postgrest api.  Contains liquibase database scripts within
> #### `Dockerfile`
> Adds Java and liquibase to the standard `postgrest` image
> #### `postgrest.conf`
> The configuration file for postgrest pulls in some environment variables that are expected to be available.
> #### `database/`
> Contains the liquibase database migration files

