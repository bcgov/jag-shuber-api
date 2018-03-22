#!/bin/bash
echo "You should log into OpenShift and select your project before running this script."

read -p "Continue? (Y/n): " ok
ok=${ok:-y}
ok=$(echo $ok |awk '{print tolower($0)}')

if [ "$ok" == "y" ]; then
    echo "Loading development data..."
    oc exec $(oc get pods -l app=api -o jsonpath="{.items[0].metadata.name}") -it -- "./database/deploy-db.sh"
else
    exit 0
fi
