FROM nginx
MAINTAINER chris@chrissearle.org

COPY build /usr/share/nginx/html
RUN chown -R nginx /usr/share/nginx/html/*