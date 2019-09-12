# Agent Discoveries Application

# Requirements

This project requires at least Java 8.  If you want to run it from the command line then you'll
need [Maven 3](https://maven.apache.org/) on your `PATH` as well.

You'll need MySQL server and MySQL workbench, this can be downloaded from
[here](https://dev.mysql.com/downloads/installer/) if you don't already have it.  When running
through the installer you can keep all the default options.

Update:
 - the `database.username` and `database.password` fields in `config.properties`.
 - the `javax.persistence.jdbc.user` and `javax.persistence.jdbc.password` fields in `META-INF/persistence.xml`.

# Setup

Open mysql workbench, choose the local mysql instance.
Create a database called `agentdiscoveries` and then you can start the application which will create the necessary tables.

# Running the application

You will notice that there are 2 modules in this project - `AgentDiscoveries-Backend` and `AgentDiscoveries-Frontend`.
The main build will build them both.
There are instructions for running them separately at the bottom of this section.

## Build

To build the project, you will need to run `mvn clean package`.
The jar generated in the backend project will contain everything required for the website.

## Run

To start the application from the command line, run

`java -jar AgentDiscoveries-Backend/target/agentdiscoveries-backend-1.0-SNAPSHOT.jar`.

## Checking the application has started

The application homepage can be found at `http://localhost:8080`.

There is also a health-check at `http://localhost:8080/healthcheck`.
If there are any problems starting the application take a look at the logs first, it is probably a database or port already in use issue.

### Test users

The app comes with some test users added by the migrations:

| Username     | Password | Role  |
| ------------ | -------- | ----- |
| test_user    | password | User  |
| test_agent   | password | Agent |
| test_corrupt | N/A      | User with a corrupt password |
| test_admin   | password | Admin |

These should be deleted in the production environment.

## IntelliJ Configuration

You can run `AgentDiscoveriesApplication` directly, but the frontend project must also have been built for it to serve the website.

You can do this automatically by adding a 'build step' to the run configuration which builds the frontend:
Either `mvn build` or `npm run build` in the frontend project.

Alternatively, you can serve the frontend using a development server:

### Frontend Development Server

To speed up front end development, there is a dev server you can run instead.

To use this from the command line, run `mvn clean package -Ddev`
To use this, setup a `Maven` configuration with the working directory set to the `AgentDiscoveries-Frontend` project.
For the Command Line option, add `clean package -Ddev`.

This will set up a server at `http://localhost:8081` (*Note the difference!*).
The browser will automatically reload whenever you change any javascript or SASS.

Note: You will still need to have the backend server running on port 8080!

# Unit Tests

Both the backend and frontend Unit Tests can be run with `mvn test`

## Backend Tests

These can be found in `AgentDiscoveries-Backend/src/test/java`.

**N.B. Unit test files must have names ending with "Test.java"**

To run in IntelliJ, right click on any test to run it individually, or the entire directory to 'Run All Tests'.

From the command line, use `mvn test` in the `AgentDiscoveries-Backend` directory. 

## Frontend Tests

These can be found in `AgentDiscoveries-Frontend/app/test`

To run the frontend unit tests in IntelliJ, follow the instructions for [Mocha](https://www.jetbrains.com/help/idea/running-unit-tests-on-mocha.html)

From command line navigate to `AgentDiscoveries-Frontend` and then run `npm test` (or `mvn test`, but this may give less pretty output).

# Integration Tests

These can be found in `AgentDiscoveries-Backend/src/test/java/integration`.

**N.B. Integration test files must have names ending with "IT.java"**

## Command Line

To run the tests use `mvn verify -P integration-test-local` from the root directory.
This will target the address `http://localhost:8080` by default.

If you need to run the tests on another address (e.g. for targeting the live site)
use the command `mvn verify -P integration-test-live -Dtarget.address="http://foo.bar"` with the relevant address.

## IntelliJ

Make sure the app is already running, then you can run/debug each test individually.

Changing `WebDriverHelper.HEADLESS` to `false` will cause a visible Chrome window to pop up,
which is usually much easier to debug!
