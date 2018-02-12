#!/usr/bin/env bash
set -eux

cd /usr/lib/agentdiscoveries

java8 -jar agentdiscoveries-backend-1.0-SNAPSHOT.jar &> agentdiscoveries.log &
AGENT_DISCOVERIES_PID=$!
echo "kill $AGENT_DISCOVERIES_PID || true" > stop.sh