FROM arm64v8/ubuntu:18.04
ENV DEBIAN_FRONTEND noninteractive

RUN sed -i 's/archive.ubuntu.com/ftp.daumkakao.com/g' /etc/apt/sources.list
RUN apt-get update && apt-get -y install \
        nginx \
        python-pip \
        python-dev \
        uwsgi-plugin-python \
        python-psycopg2 \
        libpq-dev \
        libssl-dev \
        supervisor && \
    apt-get clean && rm -rf /var/cache/apt/* && rm -rf /var/lib/apt/lists/*

RUN mkdir -p /var/log/nginx/app
RUN mkdir -p /var/log/uwsgi/app
RUN mkdir -p /var/log/supervisor

RUN rm /etc/nginx/sites-enabled/default
RUN ln -s /etc/nginx/sites-available/flask.conf /etc/nginx/sites-enabled/flask.conf
RUN echo "daemon off;" >> /etc/nginx/nginx.conf

COPY data/flask/requirements.txt /var/www/flask/requirements.txt
RUN pip install -r /var/www/flask/requirements.txt

COPY data/bbm /usr/bin/bbm
RUN chmod a+x /usr/bin/bbm

EXPOSE 80
EXPOSE 443

CMD ["/usr/bin/supervisord"]
