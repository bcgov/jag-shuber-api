# Sheriff Scheduling API
This project represents the API for the Sheriff Scheduling (Code Named 'Shuber') application.

## Project Architecture
The architecture notes for this project and be found in the [Project Docs](./docs/index.md).

## API Client Installation

This API includes a Typescript / Javascript client within the repo that can be added to your project via

`yarn add github:bcgov/jag-shuber-api`

or 

`npm install github:bcgov/jag-shuber-api`

### Package Development

If you are working on developing the Client api, the typical flow is as follows:

Within this project folder run `yarn link` This registers this project as a local package.

Then within your frontend project run `yarn link jag-shuber-api`, which will simlink in the registered local pacakge into your node_modules.

Then you'll want to run this project in dev mode (i.e. `yarn watch:dev`) and start your frontend project in dev mode which will point the api proxy to this instance.

## Getting Started

### Development Environment
- Deploy the backend to minishift (See [openshift/Readme.md](openshift/Readme.md))
- The build of the shuber-api will deploy and will migrate the database via `liquibase`, so if you have a branch that has new database changes you will need to build and deploy that branch (in order to migrate the database) before you can run your local development instance against the database.
- Once the development environment is set up, you should be able to use the commands described [below](#commands) to get your development / test instances up and running.

### Debugging
This project was built using [VS Code](https://code.visualstudio.com/) and as such the debugging flow is built around some mechanisms supported in this specific editor. 

You can attach the debugger to the test runner, dev and test instances of the api easily.  Each of these are defined within the [launch.json](.vscode/launch.json) and support multiple debugging sessions at the same time.  Which allows you to debug right from the unit test into the api and back.

## Commands 

The scripts can be organized into a few categories:

### Development

#### `yarn watch:dev` 
>
> Launches the backend in dev mode against the development database.  Running this command will read and use environment variables defined in `.env.dev`.  See the ##Setup## section for instructions on how to have this file generated for you automatically. 

#### `yarn rebuild`
>
> Cleans all compiled files (found in the `dist/`) with the exception of the `dist/.gitignore` folder. Then regenerates all typescript files and rebuilds.  **This should be done before issuing / completing Pull Requests**

### Testing

### DO NOT RUN TESTS AGAINST ANY DATABASE THAT YOU CARE ABOUT
>
> The Tests have *setup* and *teardown* hooks that clear many of the database tables so that CRUD functionality of the API can be verified (i.e. numbers of records etc.)  

Generally, I run the following two commands in separate terminal windows so that I can clearly watch the output of both.

#### `yarn watch:testing` 
>
> Launches the backend in dev mode against the testing database.  Running this command will read and use environment variables defined in `.env.testing`.  See the ##Setup## section for instructions on how to have this file generated for you automatically. 

#### `yarn test`
>
> runs the jest tests for the application (should be done in conjuction with the `yarn watch:testing` command described above).  This command will use the values of `.env.jest` to override the values within `.env.testing` this is to allow the test runner to have admin access to the database so that tables and records can be deleted and cleaned for testing purposes.


#### `yarn test:coverage`
>
> Runs the jest tests for the API Client using code coverage and displays the coverage results in a browser.  Note that the coverage only covers the API Client code and not the API itself.

### Support

These commands typically don't have to be run and are mostly here to support the commands described above.

#### `yarn start`
>
> Starts the production instance of the API Server.  This generally not run on dev machines but instead is used by the openshift container running the application.

#### `yarn start:dev`
>
> Starts the server loading the `.env.dev` environment variables, effectively wiring up to your development database.

#### `yarn start:testing`
>
> Starts the server loading the `.env.testing` environment varibles, effectively wiring up to your testing database.

#### `yarn build`
>
> Runs typescript to compile the javascript that ends up in `dist/`

#### `yarn build:watch`
>
> Watches for changes to typescript files and runs the `build` command described above

#### `yarn generate`
>
> Generates code based on the process described in [Generating Code](#generating-code)

#### `yarn oc:dev`
>
> A development hook to allow debugging within the OpenShift environment.  This is typically never used and is largely untested but remains as a reminder of the possibility.

## Generating Code

### API Routes & Swagger

In this project, the Controllers used by the application represent all of the endpoints supported by the API.  The Controllers use models to expose the shape of objects that they accept / return.  These controllers and models are used by [TSOA](https://www.npmjs.com/package/tsoa) to generate the [`swagger.json`](dist/swagger.json) and the [`src/routes.ts`](src/routes.ts) based on the [Routes Template](templates/routeTemplate.handlebars) and the Controllers that are imported within the [Controller Index](src/controllers/index.ts) according to the [TSOA Config File](tsoa.json).

The routes that are generated include code for authorization and validation and general error handling, however, the [template](templates/routeTemplate.handlebars) can be changed to match the needs of the application.
 
### API Client

The `swagger.json` generated by TSOA (from the controllers and models) is then used by [swagger-ts-client](https://www.npmjs.com/package/swagger-ts-client) to generate a typescript / javascript client for the API.  This client is created using the two templates:
>  [Type Definition Template](templates/typeDefinitions.handlebars) 
>
> Used to generate the [Model Definitions](src/client/models.ts) 

> [Operation Group Template](templates/operationsGroup.handlebars) 
>
> Used to generate the [Base Api Client](src/client/Client.ts).

### Troubleshooting
- if you the database migration fails, you may need to destroy the current database (by deleting the storage volume in openshift) and recreating it.  This is because sometimes changesets are changed in development and liquibase keeps hash values for changesets so it will fail if it's already applied a changeset and it changes.

## How to Contribute

If you would like to contribute, please see our [CONTRIBUTING](CONTRIBUTING.md) guidelines.

Please note that this project is released with a [Contributor Code of Conduct](.github/CODE_OF_CONDUCT.md). 
By participating in this project you agree to abide by its terms.

## License

    Copyright 2016 Province of British Columbia

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
