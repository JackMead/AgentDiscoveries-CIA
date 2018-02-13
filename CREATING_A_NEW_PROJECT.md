# Creating a new project

## Steps
### Project Tag
For many of these steps, we will be using your project tag. This is a short unique string which
will be used to distinguish your project from other Agent Discoveries project (of which there may
be many in the future). This can be anything, you could ask your team for ideas, or some up with 
something sensible yourself. For example, the project which is builds the original source code
is called "skeleton".

Note: You may want to consider creating separate projects ones for test and live, where only the 
test one is triggered automatically.

### Create a New KeyPair
When AWS creates a new EC2 instance, it allows a user with a specific key pair to SSH into it. 
So first you must create this. Visit https://eu-west-2.console.aws.amazon.com/ec2/v2/home?region=eu-west-2#KeyPairs
and create a key pair. Make sure you save the file it gives you, as this is the only way of accessing
the server you're about to create.

### Create Resources
Run the Jenkins build called 
["Agent Discoveries Create New"](http://ec2-52-56-165-128.eu-west-2.compute.amazonaws.com/job/Agent%20Discoveries%20Create%20New).
This will create all of the resources you will need for your project.

Note: After the build finishes, you will have to wait 10 mins or so for all of your resources to build.
You can find your stack and follow its progress [here](https://eu-west-2.console.aws.amazon.com/cloudformation/home?region=eu-west-2#/stacks).

This creates all the resources needed. It creates a stack using template in ./infrastructure, which creates the EC2
instance etc. And then sets up the code deploy resources so that Jenkins will be able to deploy straight to the server.

### Create a Jenkins Build
You should create a Jenkins build for your project. A good starting place is to clone the 
[Skeleton build](http://ec2-52-56-165-128.eu-west-2.compute.amazonaws.com/job/Agent%20Discoveries%20Skeleton/). And then
edit the values in the configuration to use your git repo and your project tag.

The idea is to create a build that is automatically triggered (you will need to add the following hook to your github repo: 
http://ec2-35-177-87-184.eu-west-2.compute.amazonaws.com/github-webhook/).
This build will then trigger the generic Agent Discoveries Build and Agent Discoveries Deploy builds in turn 
to build your project to your server (again, give the deployment a few minutes before panicking).

### Checking that it works
Find your new instance in the list of EC2 instance: https://eu-west-2.console.aws.amazon.com/ec2/v2/home?region=eu-west-2#Instances
Visit the url listed under the Public DNS (IPv4) value in the description for this instance.

Hopefully, you are able to see your website!

## Create a Jenkin's Job for End-to-End Tests
Like the Jenkin's build above, the easiest way to do this is to clone the [End-To-End Skeleton](http://ec2-35-178-57-85.eu-west-2.compute.amazonaws.com/job/Agent%20Discoveries%20Skeleton%20End-To-End%20Testing/), then edit the parameters in the configuration to use your Github Repository, and your Deployment Address. This job will trigger the generic Agent Discoveries End-to-End Testing job and report the results.

You should then add your team's email addresses at the bottom so that you'll be notified quickly in the case of any broken tests, and optionally can configure the job to run on a different schedule to the current one.

## Giving users SSH access
You should do this, even if it's just so that you can login as yourself, instead of the root user.

The first time, log in to your instance as ec2-user
```
ssh -i /path/to/key/pair/pem/file ec2-user@<Public DNS (IPv4)>
# For example
ssh -i ~/.ssh/skeleton.pem ec2-user@ec2-35-178-54-146.eu-west-2.compute.amazonaws.com
```
Run the following commands the first time to set up sudo permissions for the "academy" group:
```
# Set up groups
sudo groupadd academy
sudo visudo # Add a line like '%academy ALL=(ALL) NOPASSWD: ALL' to provide the academy group with sudo permission
```

Run the following commands to give another user access (in this case, AGP):
```
sudo useradd AGP
sudo mkdir /home/AGP/.ssh
sudo nano /home/AGP/.ssh/authorized_keys # Paste in the user's public key - id_rsa.pub
sudo chown -R AGP:AGP /home/AGP/.ssh
sudo usermod -aG academy AGP
```