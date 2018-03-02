# "Agent Discoveries" REST services Java exercise

# Requirements

This project requires at least Java 8.  If you want to run it from the command line then you'll
need [Maven 3](https://maven.apache.org/) on your `PATH` as well.

You'll need MySQL server and MySQL workbench, this can be downloaded from
[here](https://dev.mysql.com/downloads/installer/) if you don't already have it.  When running
through the installer you can keep all the default options and set the password for the `root`
user as `mysql` (well, you can set it to anything you like, but if you want to use something
else then you must also update the `database.password` field in `config.properties`).

# Setup

Open mysql workbench, choose the local mysql instance, and log in with the username `root` and
the password `mysql`.  Create a database called agentdiscoveries and then you can start the application
which will create the necessary tables.

# Running the application

You will notice that there are 2 modules in this project - `AgentDiscoveries-Backend` and `AgentDiscoveries-Frontend`.
The main build will build them both. As you can imagine, this could be annoying for development! There are
instructions for running them separately at the bottom of this section.

## Build

To build the project, you will need to run `mvn clean package`. This can be set up inside intellij
using a run configuration of type `Maven`. Set the working directory to the root of this project and
add `clean package` for the Command Line option.

## Run

To start the application from the command line, run

`java -jar AgentDiscoveries-Backend/target/agentdiscoveries-backend-1.0-SNAPSHOT.jar`.

This can be made into an Intellij Run Configuration by choosing the type `JAR Application` and locating
the above backend jar as the Path to JAR.

## Checking the application has started

To check the application has started go to `http://localhost:8080/healthcheck` in a browser.
If there are any problems starting the application take a look at the logs first, it is probably a database or
port already in use issue. You can also see the homepage at `http://localhost:8080`.

## Fast Frontend Development Server
_"So everytime I make a simple change to the frontend I have to run through all that again?!"_

To speed up front end development, there is a dev server you can run instead. To use this, setup a
`Maven` configuration with the working directory set to the `AgentDiscoveries-Frontend` project.
For the Command Line option, add `clean package -Ddev`.

This will set up a server at `http://localhost:8081` (*Note the difference!*). The browser will automatically reload whenever
you change any javascript or SASS.

Note: You will need to have the backend server running on port 8080 to make API requests when using this server
as it runs the frontend and only proxies the backend API endpoints.

## Fast Backend Development Server
_"But, what if I want to work on the backend without having to build the frontend everytime?"_

To run the backend without worrying about what the frontend is doing, you can create an intellij Run
Configuration of type `Application`, the main class is
`AgentDiscoveries-Backend/main/java/org.softwire.training.AgentDiscoveriesApplication`.

# Unit Tests

## Backend Tests
To run the server side unit tests in intelliJ, right click on the `AgentDiscoveries-Backend/src/test/java` folder and then choose `Run 'All Tests'`.
From the command line, use `mvn test`. 

Unit test files should be named ending with "Test.java", and end-to-end tests should end in "IT.java" as the system views them as integration tests.

## Frontend Tests
To run the front-end unit tests, from command line navigate to `AgentDiscoveries-Frontend` and then run npm test.

## End-to-End Tests
Before running end-to-end tests, you will need to download chromedriver and add it to your path. Then in order to run the End-To-End tests locally the webserver needs to be active, so ensure you either first run the application as described in the "Run" section, or you run them using `mvn verify -P end-to-end-test-local`.

If the server is online, you can run the tests from the command line using `mvn verify -P integration-test` from the root directory. It will target the address `http://localhost:8080` by default.
If you need to run the tests on another address for any reason, use the command `mvn verify -P integration-test -Dtarget.address="http://foo.bar"` with the relevant address.