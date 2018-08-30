#!/bin/bash
YELLOW='\033[0;33m'
RED='\033[0;31m'
CYAN='\033[0;36m'
GREEN='\033[0;32m'
DARK_GRAY='\033[1;30m'
NC='\033[0m'

log_into_minishift(){
    start_color $DARK_GRAY
    printf "Logging into minishift instance..."
    oc login https://$(minishift ip):8443 --username=developer --password=d &>/dev/null
    start_color $GREEN
    printf "OK (project='$(oc project -q)')\r\n"
    end_color
}

start_color(){
    printf "$1"
}

end_color(){
    printf "$NC"
}

print_color(){
    start_color $1
    printf "$2"
    end_color
}

# Delete a project if it already exists
delete_project_if_exists(){
    oc project "$1" &>/dev/null 
    if [ "$?" == "0" ]; then
        print_color $GREEN "Removing '$1' project...\r\n"
        start_color $DARK_GRAY
        oc delete all --all --force=true
        oc delete project "$1"
        oc project "$1" &>/dev/null
        while [ "$?" == "0" ]; do
            oc project "$1" &>/dev/null
        done        
        sleep 1
        end_color
    fi
}

create_project(){
    print_color $GREEN "Creating project '$1'...\r\n"
    start_color $DARK_GRAY
    oc new-project "$1" &>/dev/null
    if [ "$?" != "0" ]; then
        sleep 1
        oc new-project "$1"        
    fi
    if [ "$?" != "0" ]; then
        sleep 1
        oc new-project "$1"
    fi
    if [ "$?" != "0" ]; then
        sleep 1
        oc new-project "$1"
    fi       
    if [ "$?" != "0" ]; then
        print_color $RED "Couldn't create project '$1'\r\n"
        exit 1
    fi  

    end_color    
}

grant_puller_permissions(){
    oc policy add-role-to-user system:image-puller system:serviceaccount:$1:default -n $2
}

expose_postgres(){
    start_color $DARK_GRAY
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
    end_color
    print_color $CYAN "'$(oc project -q)' Postgres exposed at: \r\n\tIP:\t $ip \r\n\tPORT:\t $ingressPort\r\n"
}

write_postgres_envfile(){
    start_color $DARK_GRAY
    projectName=$(oc project -q)
    ingressPort=$(oc get svc postgresql-ingress -o=jsonpath='{.spec.ports[0].nodePort}')
    ip=$(minishift ip)
    envFileName=".env.$projectName"
    if [ -e $envFileName ]
    then
        rm $envFileName
    fi
      cat <<EOT >> .env.$projectName
PGHOST='$ip'
PGUSER='shersched'
PGDATABASE='appdb'
PGPASSWORD=''
PGPORT=$ingressPort
POSTGRES_EXT_SCHEMA='extensions'
EOT
    end_color
    print_color $CYAN "Postgres connection info written to '.env.$projectName'\r\n"
    print_color $YELLOW "You can find necessary credentials at: \r\n\thttps://$ip:8443/console/project/$projectName/browse/secrets/api\r\n"
}

create_tools_project(){
    create_project $1
    start_color $DARK_GRAY
    oc process -f "$SCRIPT_DIR/templates/api-builder/api-builder-build.json" $params | oc create -f -
    oc process -f "$SCRIPT_DIR/templates/api/api-build.json" $params | oc create -f -
    end_color
}

# Arg1: Name of project
# Arg2: Name of tools project
create_deployment_project(){
    create_project $1
    start_color $DARK_GRAY
    params="-p API_IMAGE_NAMESPACE=$2"
    grant_puller_permissions $1 $2
    oc process -f "$SCRIPT_DIR/api-postgres-deploy.json" $params | oc create -f -
    end_color
    expose_postgres
    write_postgres_envfile
}






# echo "You should log into OpenShift and select your project before running this script."

# read -p "Delete resources from environment? (y/N)" delete
# delete=${delete:-n}
# delete=$(echo $delete |awk '{print tolower($0)}')

# if [ "$delete" == "y" ]; then
#     oc delete all --all
# fi

# read -p "Create Builds? (Y/n): " ok
# ok=${ok:-y}
# ok=$(echo $ok |awk '{print tolower($0)}')

# #params="-p GIT_REF=node-api"
# #params=""

# if [ "$ok" == "y" ]; then
#     echo "Deploying api build environment..."
#     oc process -f "$SCRIPT_DIR/templates/api-builder/api-builder-build.json" $params | oc create -f -
#     oc process -f "$SCRIPT_DIR/templates/api/api-build.json" $params | oc create -f -
# else
#     exit 0
# fi
