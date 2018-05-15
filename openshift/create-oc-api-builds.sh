#!/bin/bash
SCRIPT_DIR=`dirname $0`
echo "You should log into OpenShift and select your project before running this script."

read -p "Delete resources from environment? (y/N)" delete
delete=${delete:-n}
delete=$(echo $delete |awk '{print tolower($0)}')

if [ "$delete" == "y" ]; then
    oc delete all --all
fi

read -p "Create Builds? (Y/n): " ok
ok=${ok:-y}
ok=$(echo $ok |awk '{print tolower($0)}')

params="-p GIT_REF=node-api"
#params=""

if [ "$ok" == "y" ]; then
    echo "Deploying api build environment..."
    oc process -f "$SCRIPT_DIR/templates/api-builder/api-builder-build.json" $params | oc create -f -
    oc process -f "$SCRIPT_DIR/templates/api/api-build.json" $params | oc create -f -
else
    exit 0
fi
