FROM nginx
MAINTAINER chris@chrissearle.org

COPY default.conf /etc/nginx/conf.d/default.conf
COPY build /usr/share/nginx/html
RUN chown -R nginx /usr/share/nginx/html/*

EXPOSE 11115