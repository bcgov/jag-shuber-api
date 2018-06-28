      
liquibase --driver=org.postgresql.Driver /
          --classpath=c:\program files\postgreSQL\JDBC\postgresql-42.2.1.jar /
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
          --classpath="c:\program files\postgreSQL\JDBC\postgresql-42.2.1.jar" ^
          --changeLogFile="shersched.db.changelog.work.xml" ^
          --url="jdbc:postgresql:postgres" ^
          --username=tdm_shersched ^
          --password=postgres ^
          generateChangeLog

#run changeset to generate
liquibase --driver=org.postgresql.Driver ^
          --classpath="c:\program files\postgreSQL\JDBC\postgresql-42.2.1.jar" ^
          --defaultSchemaName="cgeisler" ^
          --changeLogFile=shersched.db.changelog-master.xml ^
          --url="jdbc:postgresql:postgres" ^
          --contexts="prod" ^
          --username=postgres ^
          --password=postgres ^
          update ^
          -DRELEASE_TAG=R002 ^
          -DPOSTGRES_EXT_SCHEMA=cgeisler ^
          -DPOSTGRES_SCHEMA=new_shersched ^
          -DPOSTGRES_APP_USER=new_shersched_app ^
          -DPOSTGRES_APP_PASS=postgres

#rollback 
liquibase --driver=org.postgresql.Driver ^
          --classpath="c:\program files\postgreSQL\JDBC\postgresql-42.2.1.jar" ^
          --defaultSchemaName="cgeisler" ^
          --changeLogFile=shersched.db.changelog-master.xml ^
          --url="jdbc:postgresql:postgres" ^
          --contexts="prod" ^
          --username=postgres ^
          --password=postgres rollback "R000" ^
          -DRELEASE_TAG=R000 ^
          -DPOSTGRES_EXT_SCHEMA=extensions ^
          -DPOSTGRES_SCHEMA=new_shersched ^
          -DPOSTGRES_APP_USER=new_shersched_app ^
          -DPOSTGRES_APP_PASS=postgres
