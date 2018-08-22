# Pull in nodejs-8 centos container
FROM centos/nodejs-8-centos7

# Temp Directory for downloads
RUN TMPDIR="$HOME/tmp" && \
    mkdir -p $TMPDIR && \
    cd $TMPDIR

# Install Yarn and Add it to the path
RUN curl -o- -L https://yarnpkg.com/install.sh | bash
ENV PATH="$HOME/.yarn/bin:$HOME/.config/yarn/global/node_modules/.bin:$PATH"

# Install liquibase, postgres driver
ENV LIQUIBASE_ROOT="$HOME/liquibase"
RUN mkdir $LIQUIBASE_ROOT && \
    curl -SLo liquibase.tar.gz https://github.com/liquibase/liquibase/releases/download/liquibase-parent-3.5.3/liquibase-3.5.3-bin.tar.gz && \  
    tar -xzf liquibase.tar.gz -C $LIQUIBASE_ROOT && \
    chmod 755 $LIQUIBASE_ROOT/liquibase && \
    curl -SLO https://jdbc.postgresql.org/download/postgresql-42.2.1.jre7.jar && \
    mv postgresql-42.2.1.jre7.jar $LIQUIBASE_ROOT/lib

# Add Liquibase to path
ENV PATH="${LIQUIBASE_ROOT}:${PATH}"

# Install Java
ENV JAVA_DIR="$HOME/java"
ENV JAVA_BIN="${JAVA_DIR}/jre1.8.0_172/bin"
RUN mkdir $JAVA_DIR && \
    curl -b "oraclelicense=a" -SL -o jre.tar.gz http://download.oracle.com/otn-pub/java/jdk/8u181-b13/96a7b8442fe848ef90c96a2fad6ed6d1/jdk-8u181-linux-x64.tar.gz && \
    tar -xzf jre.tar.gz -C $JAVA_DIR && \
    chmod -R 755 $JAVA_DIR/

# Add Java to path
ENV PATH="${JAVA_BIN}:${PATH}"

# Cleanup
RUN cd / && \
    rm -rf $TMPDIR

# Set the PORT so that our node app starts on 8080
ENV PORT=8080