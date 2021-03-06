# meso-challenge

Mesosphere Coding Challenge

## Get Started

Get started developing...

```shell
# install deps
npm install

# run in development mode.  

This mode keeps watch for changes and runs 
linting and unit tests when any are detected.  If everything passes, 
the service will be brought up, however you must point the MONGO_DB environment 
variable and a running instance of MongoDB.  To run the service along with 
MongoDB, see running under Docker.

npm run dev

# run tests
npm run test
```

## Install Dependencies

Install all package dependencies (one time operation)

```shell
npm install
```

## Run It
#### Run in *development* mode:
Runs the application is development mode. Should not be used in production (see notes above under getting started)

```shell
npm run dev
```

or debug it

```shell
npm run dev:debug
```

### Run with integration tests in *development* mode:

Adds running of integration tests along with the usual unit test suite.

Note: This requires mongodb support.  The simplest way to do this is to run the provided
mongo container and adjusting the MONGO_DB environment variable to point to it.

```shell
MONGO_DB=mongodb://localhost:27017/meso_api_test npm run dev:int
```

#### Run in *production* mode:

Compiles the application and starts it in production production mode.

```shell
npm run compile
npm start
```

## Test It

Run the Mocha unit tests

```shell
npm test
```

or debug them

```shell
npm run test:debug
```

## Running in a local docker environment

Also provided is a docker-compose based environment for integration test with the data store.  Three containers are created:

  1. api - the core API container
  2. mongo - the data store
  3. test - runs through unit (and ideally integration tests) as the environment is being brought up.

```shell
npm install
npm run compile
```

Next, create a .env file in the root folder of the project.  It should look something like this:

```
APP_ID=meso-challenge
PORT=3000
LOG_LEVEL=debug
REQUEST_LIMIT=100kb
SESSION_SECRET=mySecret

#Swagger
SWAGGER_API_SPEC=/spec

#MongoDB
MONGO_DB="mongodb://mongo:27017/meso_api_test
```

then: 
```shell
npm run docker
```

## Try It
* Open you're browser to [http://localhost:3000](http://localhost:3000)
* Invoke the `/examples` endpoint
  ```shell
  curl http://localhost:3000/api/v1/examples
  ```


## Debug It

#### Debug the server:

```
npm run dev:debug
```

#### Debug Tests

```
npm run test:debug
```

#### Debug with VSCode

Add these [contents](https://github.com/cdimascio/generator-express-no-stress/blob/next/assets/.vscode/launch.json) to your `.vscode/launch.json` file
## Lint It

View airbnb linter output

```
npm run lint
```

Fix all airbnb linter errors

```
npm run lint
```

## Deploy It

Deploy to CloudFoundry

```shell
cf push meso-challenge
```



