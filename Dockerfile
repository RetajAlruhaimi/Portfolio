FROM nginx:alpine

COPY portfolio.html /usr/share/nginx/html/index.html
COPY . /usr/share/nginx/html

# Force correct Cloud Run port binding
RUN printf "server {\n\
    listen 8080;\n\
    server_name _;\n\
    location / {\n\
        root /usr/share/nginx/html;\n\
        index index.html;\n\
    }\n\
}\n" > /etc/nginx/conf.d/default.conf

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]