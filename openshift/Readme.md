# OpenShift configuration files

Some scripts have been created to ease the development workflow when deploying things in your own development environment.  These aren't used in pathfinder as we typically import `json` template files directly.


# Scripts 

## Setup Local Dev Environment
This document assumes that you already have minishift setup and running.

> `setup-dev-environments.sh`
>
> Sets up the entire tools, dev, test projects and populates them with the appropriate builds and deployments.  This script will effectively get you up and running with the entire backend stack.  It will also generate `.env` files on behalf of the `dev` and `test` environments.  You will just need to fill in the database secrets, which it gives links to in the command line output.

## Support

> `functions.sh`
>
> Importable collection of useful shell functions for setting up development environments.

### Legacy Scripts
These scripts are still useful, however you should be able to get up and running with the script described above.

> `create-oc-api-builds.sh`
>
> Creates the builds / pipelines for the api (Should be run in tools project)
  
> `deploy-oc-api.sh`
>
> Deploys the api components into an environment (Should be run in dev, test, prod projects)

> `expose-postgres.sh`
>
> Exposes an ingress port into the postgres service within the given project.  This is now covered within the `functions.sh` script.

> ### NOTE 
> In order to be able to pull images from a different project you will need to run the `policy` command to grant authority eg:
>
> `oc policy add-role-to-user system:image-puller system:serviceaccount:test:default -n tools`
> 
> would grant the `test` project `image-puller` abilities on the `tools` project