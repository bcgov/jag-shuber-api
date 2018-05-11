#!/bin/bash
echo "You should log into OpenShift and select your project before running this script."

read -p "Continue? (Y/n): " ok
ok=${ok:-y}
ok=$(echo $ok |awk '{print tolower($0)}')

if [ "$ok" == "y" ]; then

ingressPort=$(oc get svc postgresql-ingress -o=jsonpath='{.spec.ports[0].nodePort}')

if [ -z "$ingressPort" ]; then
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
fi

ingressPort=$(oc get svc postgresql-ingress -o=jsonpath='{.spec.ports[0].nodePort}')
ip=$(minishift ip)

printf "Postgres exposed at: \r\n\tIP:\t $ip \r\n\tPORT:\t $ingressPort\r\n"
printf "You can find credentials at: \r\n\thttps://$ip:8443/console/project/$(oc project -q)/browse/secrets/api\r\n"

else
    exit 0
fi
