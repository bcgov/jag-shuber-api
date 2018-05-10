#!/bin/bash
echo "You should log into OpenShift and select your project before running this script."

read -p "Continue? (Y/n): " ok
ok=${ok:-y}
ok=$(echo $ok |awk '{print tolower($0)}')

if [ "$ok" == "y" ]; then
    echo "Creating ingress Service for postgres..."
    ocip=$(minishift ip)
    oc create -f - <<INGRESS
apiVersion: v1
kind: Service
metadata:
  name: postgresql-ingress
spec:
  ports:
  - port: 5432
    protocol: TCP
  selector:
    name: postgres
  type: LoadBalancer
INGRESS

# Todo: use oc get svc postgresql-ingress -o json to pull out relevant connection string details

else
    exit 0
fi
