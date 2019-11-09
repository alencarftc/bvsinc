FROM mysql:5

ENV MYSQL_DATABASE solinc
ENV MYSQL_ROOT_PASSWORD=root

COPY ./sql-scripts/ /docker-entrypoint-initdb.d/
