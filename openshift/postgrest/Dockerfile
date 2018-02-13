FROM postgrest/postgrest

# Install Java
RUN apt-get -qq update && \
    apt-get -qq install -y --no-install-recommends default-jre && \
    apt-get -qq clean && \
    rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

# Install liquibase && postgres driver
RUN BUILD_DEPS="curl" && \
    apt-get -qq update && \
    apt-get -qq install -y --no-install-recommends $BUILD_DEPS && \
    cd /tmp && \
    mkdir ~/liquibase && \
    curl -SLo liquibase.tar.gz https://github.com/liquibase/liquibase/releases/download/liquibase-parent-3.5.3/liquibase-3.5.3-bin.tar.gz && \  
    tar -xzf liquibase.tar.gz -C ~/liquibase && \
    ln -s ~/liquibase/liquibase /usr/local/bin && \
    curl -SLO https://jdbc.postgresql.org/download/postgresql-42.2.1.jre7.jar && \
    mv postgresql-42.2.1.jre7.jar ~/liquibase/lib && \
    cd / && \
    apt-get -qq purge --auto-remove -y $BUILD_DEPS && \
    apt-get -qq clean && \
    rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

COPY postgrest.conf /etc/postgrest.conf

COPY ./database /database/

# RUN echo "deb http://ftp.it.debian.org/debian unstable main contrib non-free" >> /etc/apt/sources.list && \
#     apt-get -qq update && \
#     apt-get -qq install -y --no-install-recommends sqitch/unstable && \
#     sed -i '$d' /etc/apt/sources.list && \
#     apt-get -qq update && \
#     apt-get -qq clean

# RUN apt-get -qq update && \
#     apt-get -qq -t unstable install -y --no-install-recommends sqitch && \
#     apt-get -qq purge --auto-remove -y sqitch && \
#     apt-get -qq clean && \
#     rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

# RUN sqitch