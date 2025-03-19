# Complete Application from database (mongodb) to front (react)

[![Build Status](https://travis-ci.org/jfperrin/accounts-react.svg?branch=master)](https://travis-ci.org/jfperrin/accounts-react)

I build this application for my personnal use. The purpose was a self formation on js tech and eventualy I ended up with a complete application with express, graphQL, react/redux, passport.

## Dev
To fix the yarn registry
```
yarn --registry=https://registry.yarnpkg.com
```

## Installation

I used [vite](https://vitejs.dev/) to build the skeleton of the app. For the database you need mongodb and redis.

You can use [MLab](https://mlab.com/) for mongodb , it's free and easy.
You have to set thoses configurations into
```
./server/src/server.js
```

You can also find docker container (it's the default configuration).
```docker
docker run --name mongo-account -d -p 27017:27017 mongo:3.7.9
```

Once everything is set, start the application with
```
yarn start
```
You will find the application at this address [http://localhost:3000/](http://localhost:3000/), create a user with the first button on the top right of the screen.
After that create your banks, your basics operations a period and enjoy.

## Docker

If you want only use Docker and nginx in mode reverse proxy you can use this configuration.

First step, you need to build the image. (don't forget the last dot)
```
docker build -t accounts-react .
```

after that you need an environment file. In my case I use 2 files, one for the dev and one for the production. I named then env.production and env.development
```
MONGO_URI=xxxxxxxxxxx
REDIS_PORT=xxxxxxxxxxx
REDIS_PWD=xxxxxxxxxxx
REDIS_URI=xxxxxxxxxxx
```

Then launch the container
```
docker run --restart unless-stopped --name account -d --init --env-file ./env.production -p 3000:80 accounts-react
```

Install certbot from letsencrypt
```
sudo add-apt-repository ppa:certbot/certbot
sudo apt-get update
sudo apt-get install -y certbot
```

You can increase the security
```
sudo openssl dhparam -out /etc/ssl/certs/dhparam.pem 4096
sudo chmod 600 /etc/ssl/certs/dhparam.pem
```

The first step for nginx is to generate the certificate. First, you need to create this nginx configuration
```
server {
    listen                    80;
    listen                    [::]:80;
    server_name               my.domain.com;
    return                    301 https://$server_name$request_uri;

    root                      /var/www/accounts;
    index                     index.html;

    access_log                /var/log/nginx/account.access.log;
    error_log                 /var/log/nginx/account.error.log;

    location / {
        proxy_pass            http://127.0.0.1:3000;
        include               proxy_params;
    }

    location /graphql-subscription {
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";

        proxy_pass            http://127.0.0.1:3000/graphql-subscription;
        include               proxy_params;
    }

    location ~ /.well-known {
        allow                 all;
    }
}
```

and create the certificates with this command
```
sudo certbot certonly --webroot -w /var/www/accounts --agree-tos --no-eff-email --email me@my.domain.com -d my.domain.com --rsa-key-size 4096
```

And then change the nginx configuration with ssl
```
server {
    listen                    80;
    listen                    [::]:80;
    server_name               my.domain.com;
    return                    301 https://$server_name$request_uri;
}

server {
    listen                    443 ssl;
    listen                    [::]:443 ssl http2;
    server_name               my.domain.com;

    ssl_certificate           /etc/letsencrypt/live/my.domain.com/fullchain.pem;
    ssl_certificate_key       /etc/letsencrypt/live/my.domain.com/privkey.pem;
    ssl_trusted_certificate   /etc/letsencrypt/live/my.domain.com/chain.pem;
    ssl_dhparam               /etc/ssl/certs/dhparam.pem;

    ssl_protocols             TLSv1 TLSv1.1 TLSv1.2;
    ssl_prefer_server_ciphers on;
    ssl_ciphers               'kEECDH+ECDSA+AES128 kEECDH+ECDSA+AES256 kEECDH+AES128 kEECDH+AES256 kEDH+AES128 kEDH+AES256 DES-CBC3-SHA +SHA !aNULL !eNULL !LOW !kECDH !DSS !MD5 !EXP !PSK !SRP !CAMELLIA !SEED';
    ssl_ecdh_curve            secp384r1;
    ssl_session_cache         shared:SSL:1m;
    ssl_session_timeout       1440m;
    ssl_stapling              on;
    ssl_stapling_verify       on;
    ssl_buffer_size           8k;
    add_header                Strict-Transport-Security "max-age=63072000";

    root                      /var/www/accounts;
    index                     index.html;

    access_log                /var/log/nginx/account.access.log;
    error_log                 /var/log/nginx/account.error.log;

    location / {
        proxy_pass            http://127.0.0.1:3000;
        include               proxy_params;
    }

    location /graphql-subscription {
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";

        proxy_pass            http://127.0.0.1:3000/graphql-subscription;
        include               proxy_params;
    }

    location ~ /.well-known {
        allow                 all;
    }
}

```

Use ```sudo crontab -e``` to schedule the renew of the certificates
```
42 23 * * 1 /usr/bin/certbot renew >> /var/log/le-renew.log
```
