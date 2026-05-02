FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY index.html /usr/share/nginx/html/index.html
COPY poster.html /usr/share/nginx/html/poster.html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
