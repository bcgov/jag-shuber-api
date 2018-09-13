#!/bin/bash
SCRIPT_DIR=`dirname $0`
OUTPUT_DIR=$SCRIPT_DIR/output/
mkdir $OUTPUT_DIR

printf "\r\n"
# Process all .sql scripts
for script in $SCRIPT_DIR/*.sql
do 
    FILE_NAME=$(basename $script)
    FILENAME_WITHOUT_EXT=${FILE_NAME%.sql}
    OUTPUT_FILE=$OUTPUT_DIR/$FILENAME_WITHOUT_EXT.csv
    echo "Processing '$FILE_NAME' -> '$OUTPUT_FILE'"
    psql -d appdb -U shersched -f "$script" > $OUTPUT_FILE
done

