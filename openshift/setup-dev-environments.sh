#!/bin/bash
SCRIPT_DIR=`dirname $0`
source "$SCRIPT_DIR/functions.sh"

log_into_minishift

TOOLS_PROJECT="tools"
DEV_PROJECT="dev"
TESTING_PROJECT="testing"

delete_project_if_exists $TOOLS_PROJECT
delete_project_if_exists $DEV_PROJECT
delete_project_if_exists $TESTING_PROJECT

create_tools_project $TOOLS_PROJECT
create_deployment_project $DEV_PROJECT $TOOLS_PROJECT
# Testing Deployment
create_deployment_project $TESTING_PROJECT $TOOLS_PROJECT
write_jest_envfile