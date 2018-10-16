FROM nginx:alpine


RUN mkdir -p /data/log/nginx \
  && ln -sf /dev/stdout /data/log/nginx/wechat.access.log \
  && ln -sf /dev/stderr /data/log/nginx/wechat.error.log


COPY dist /data/dist
COPY wechat.docker.conf /etc/nginx/conf.d/wechat.conf

CMD nginx -g 'daemon off;'
