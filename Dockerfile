FROM nginx
COPY conf/default.conf /etc/nginx/conf.d/default.conf
COPY dist/angular-ui /usr/share/nginx/html