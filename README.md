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

To run inside intelliJ, create a run configuration of type `Application`, the main class is
`main/java/org.softwire.training.AgentDiscoveriesApplication`.

To run from the command line, first build the jar with `mvn clean install` then start the app with
 `java -jar target/agentdiscoveries-1.0-SNAPSHOT.jar`.

To check the application has started go to `http://localhost:8080/healthcheck` in a browser.
If there are any problems starting the application take a look at the logs first, it is probably a database or 
port already in use issue.

# Unit Tests

To run in intelliJ, right click on the `src/test/java` folder and then choose `Run 'All Tests'`.  
From the command line, use `mvn test`.
