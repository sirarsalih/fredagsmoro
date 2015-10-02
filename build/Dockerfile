FROM nginx
MAINTAINER chris@chrissearle.org

EXPOSE 11115

COPY default.conf /etc/nginx/conf.d/default.conf
COPY site /usr/share/nginx/html
RUN chown -R nginx /usr/share/nginx/html/*
