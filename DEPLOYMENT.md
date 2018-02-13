# Deployment

## Jenkins
The Jenkins server for this project can be found [here](http://ec2-52-56-165-128.eu-west-2.compute.amazonaws.com/).
When you push to the origin/master branch on git, a jenkins build should be triggered(there should
be one corresponding to your project).

This will run the tests and build the JAR (in the Agent Discoveries Build job). The Agent Discoveries
Deploy job will then be triggered to deploy your changes to the server.

After a few minutes, you should be able to see your changes at the URL provided by your trainer.

## LOGS
Currently, very basic logs can be found on the server at `/usr/lib/agentdiscoveries/agentdiscoveries.log`.