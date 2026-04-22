FROM nginx:alpine

COPY portfolio.html /usr/share/nginx/html/index.html
COPY . /usr/share/nginx/html


EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]