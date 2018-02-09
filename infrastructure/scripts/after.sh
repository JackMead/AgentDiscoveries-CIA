#!/usr/bin/env bash
set -eux

cd /usr/lib/agentdiscoveries

java -jar agentdiscoveries-backend-1.0-SNAPSHOT.jar &      # You send it in background
AGENT_DISCOVERIES_PID=$!                        # You sign it's PID
echo ${AGENT_DISCOVERIES_PID}                     # You print to terminal
echo "kill $AGENT_DISCOVERIES_PID" > stop.sh  # Write the the command kill pid in stop.sh