Sheriff Scheduling Liquibase Readme

2018-06-05
Addition of parameter POSTGRES_EXT_SCHEMA to liquibase scripts
Now sets default search_path of APP_USER upon creation

...

2018-09-14
Complete Refactoring of all Liquibase scripts, consolidating
all changes leading up to the initial PROD Release.  Reorganizing
all changeSets by object, consistent naming conventions, 
reapplying contexts.