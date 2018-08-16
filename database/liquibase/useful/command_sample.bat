      
liquibase --driver=org.postgresql.Driver /
          --classpath="C:\Program Files (x86)\PostgreSQL\pgJDBC\postgresql-42.2.2.jar" /
          --changeLogFile="C:\Users\carol.geisler\Documents\Justice\Liquibase\shersched.db.changelog.xml" /
          --url="jdbc:postgresql://localhost:5432:postgres" /
          --defaultSchemaName=shersched /
          --username=postgres /
          --password=postgres / 
          --includeSchema=false /
          --outputSchemaAs=shersched
          generateChangeLog


#generate full changeset
liquibase --driver=org.postgresql.Driver ^
          --classpath="C:\Program Files (x86)\PostgreSQL\pgJDBC\postgresql-42.2.2.jar" ^
          --changeLogFile="shersched.db.changelog.work.xml" ^
          --url="jdbc:postgresql:postgres" ^
          --username=tdm_shersched ^
          --password=postgres ^
          generateChangeLog

#run changeset to generate
liquibase --driver=org.postgresql.Driver ^
          --classpath="C:\Program Files (x86)\PostgreSQL\pgJDBC\postgresql-42.2.2.jar" ^
          --defaultSchemaName="cgeisler" ^
          --changeLogFile=shersched.db.changelog-master.xml ^
          --url="jdbc:postgresql:postgres" ^
          --contexts="prod" ^
          --username=postgres ^
          --password=postgres ^
          update ^
          -DPOSTGRES_EXT_SCHEMA=extensions ^
          -DPOSTGRES_SCHEMA=shersched ^
          -DPOSTGRES_APP_USER=shersched_app ^
          -DPOSTGRES_APP_PASS=postgres

#rollback 
liquibase --driver=org.postgresql.Driver ^
          --classpath="C:\Program Files (x86)\PostgreSQL\pgJDBC\postgresql-42.2.2.jar" ^
          --defaultSchemaName="cgeisler" ^
          --changeLogFile=shersched.db.changelog-master.xml ^
          --url="jdbc:postgresql:postgres" ^
          --contexts="prod" ^
          --username=postgres ^
          --password=postgres rollback "ddl_set_04_leave_start" ^
          -DPOSTGRES_EXT_SCHEMA=extensions ^
          -DPOSTGRES_SCHEMA=shersched ^
          -DPOSTGRES_APP_USER=shersched_app ^
          -DPOSTGRES_APP_PASS=postgres
