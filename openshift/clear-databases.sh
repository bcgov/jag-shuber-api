#!/bin/bash
SCRIPT_DIR=`dirname $0`
source "$SCRIPT_DIR/functions.sh"

log_into_minishift

DEV_PROJECT="dev"
TESTING_PROJECT="testing"

clean_postgres $DEV_PROJECT
clean_postgres $TESTING_PROJECT