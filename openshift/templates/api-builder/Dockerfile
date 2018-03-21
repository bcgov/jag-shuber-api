# Pull in springboot-maven3 s2i builder
FROM codecentric/springboot-maven3-centos

# Install liquibase && postgres driver
ENV LIQUIBASE_ROOT="$HOME/liquibase"
RUN TMPDIR="$HOME/tmp" && \
    mkdir -p $TMPDIR && \
    cd $TMPDIR && \
    mkdir $LIQUIBASE_ROOT && \
    curl -SLo liquibase.tar.gz https://github.com/liquibase/liquibase/releases/download/liquibase-parent-3.5.3/liquibase-3.5.3-bin.tar.gz && \  
    tar -xzf liquibase.tar.gz -C $LIQUIBASE_ROOT && \
    chmod 755 $LIQUIBASE_ROOT/liquibase && \
    # ln -s $LIQUIBASE_ROOT/liquibase /usr/local/bin && \
    curl -SLO https://jdbc.postgresql.org/download/postgresql-42.2.1.jre7.jar && \
    mv postgresql-42.2.1.jre7.jar $LIQUIBASE_ROOT/lib && \
    cd / && \
    rm -rf $TMPDIR

# Add liquibase to the path
ENV PATH="${LIQUIBASE_ROOT}:${PATH}"