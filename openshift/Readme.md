## OpenShift configuration files

I have created some scripts of interest for deploying various aspects to this project:

- **create-oc-api-builds.sh**
  - Creates the build environment for the api (Should be run in tools project)
- **deploy-oc-api.sh**
  - Deploys the api components into an environment (Should be run in dev, test, prod projects)

  > NOTE: In order to be able to pull images from a different project you will need to run the `policy` command to grant authority eg:
  >
  > `oc policy add-role-to-user system:image-puller system:serviceaccount:test:default -n tools`
  > 
  > would grant the `test` project `image-puller` abilities on the `tools` project


## Setting up Local Development Environment

The two scripts described above should work for deploying everything into minishift.  You just need to log into minishift and select the project before running the scripts.  In addition to running these scripts you may want to load some test data into the database, this can be done by doing the following:

- `oc login` to your minishift cluster
- Select your deployment project `oc project <deploymentProject>`

Loading development data:
- To load development data into the data base, run the following command

`oc exec $(oc get pods -l app=api -o jsonpath="{.items[0].metadata.name}") -it -- "./database/deploy-db.sh"`

> This command selects the current api pod and runs the `deploy-db.sh` script inside it.  It will prompt for inputs, but this command is running **INSIDE** of the `api` pod.

## Extracting Audit Data

An interactive scripts has been written to assist in extracting audit data from the running instances in any of the environments.  This can be done by using the following script and following the prompts:

`./extract-audit-data.sh`

This will place all of the exported audit data into a folder called `database-audit-data` and will be prefixed by the openshift project that it was exported from.

The data is in `csv` format for easier consumption by other analysis applications.
