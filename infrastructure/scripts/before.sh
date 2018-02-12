#!/usr/bin/env bash
set -eux

if [ -e /usr/lib/agentdiscoveries/stop.sh ]
then
    sh /usr/lib/agentdiscoveries/stop.sh
    rm /usr/lib/agentdiscoveries/stop.sh
fi