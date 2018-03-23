#!/bin/bash
echo "You should log into OpenShift and select your project before running this script."

read -p "Continue? (Y/n): " ok
ok=${ok:-y}
ok=$(echo $ok |awk '{print tolower($0)}')

read -p "Delete ALL resources from environment? (y/N)" delete
delete=${delete:-n}
delete=$(echo $delete |awk '{print tolower($0)}')

if [ "$delete" == "y" ]; then
    oc delete all --all
fi

params="-p API_IMAGE_NAMESPACE=tools"
#params=""

if [ "$ok" == "y" ]; then
    echo "Deploying api environment..."
    oc process -f "api-postgres-deploy.json" $params | oc create -f -
else
    exit 0
fi
