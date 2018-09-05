#!/bin/bash
SCRIPT_DIR=`dirname $0`
SERVER_URL="https://console.pathfinder.gov.bc.ca:8443"
PROJECT_IDENTIFIER="shuber"
source "$SCRIPT_DIR/functions.sh"

log_into_pathfinder $TOKEN

extract_data(){
    AUDITING_DIR_NAME="auditing"
    POD_TMP_DIR="/tmp/audit-extraction/"
    POD_TMP_AUDIT_DIR="$POD_TMP_DIR/$AUDITING_DIR_NAME"
    
    start_color $DARK_GRAY
    echo "Extracting data from $1 project..."
    oc project $1
    POSTGRES_POD_NAME="$(oc get pod -l=name=postgres -o=jsonpath='{.items[0].metadata.name}')"
    echo "Connecting to POD: '$POSTGRES_POD_NAME'"

    printf "Creating temp directory in running pod..."
    oc exec $POSTGRES_POD_NAME -- bash -c "rm -rf $POD_TMP_DIR; mkdir -p $POD_TMP_DIR"
    print_command_status

    printf "Copying extraction scripts into pod..."
    oc cp "$SCRIPT_DIR/../database/$AUDITING_DIR_NAME" $POSTGRES_POD_NAME:$POD_TMP_DIR
    print_command_status

    printf "Running extraction scripts..."
    oc exec $POSTGRES_POD_NAME -- bash $POD_TMP_AUDIT_DIR/extract-audits.sh
    print_command_status

    OUTPUT_DIR="$PWD/database-audit-data/$1"
    printf "Copying extracted audit data to '$OUTPUT_DIR'..."    
    mkdir -p $OUTPUT_DIR
    oc cp $POSTGRES_POD_NAME:"$POD_TMP_AUDIT_DIR/output" "$OUTPUT_DIR" 2> /dev/null 
    print_command_status

    printf "Cleaning up temporary remote extraction files..."
    oc exec $POSTGRES_POD_NAME -- bash -c "rm -rf $POD_TMP_DIR;"
    print_command_status

    end_color
}


QUIT_OPTION="Quit"
PS3=$'\033[0;33mSelect a project from the list to extract audit data for: \033[0m'
projects=($(oc projects -q | grep $PROJECT_IDENTIFIER) $QUIT_OPTION)
select opt in "${projects[@]}"
do
    if [ -z "$opt" ]; then
        echo "Invalid selection"
    elif [ "$opt" = "$QUIT_OPTION" ]; then
        echo "Goodbye"
        break
    else 
        extract_data $opt
    fi
done