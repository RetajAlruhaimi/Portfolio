FROM nginx:alpine

COPY portfolio.html /usr/share/nginx/html/index.html
COPY . /usr/share/nginx/html

EXPOSE 80
