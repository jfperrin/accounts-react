#!/usr/bin/env bash

git pull
docker build -t account .
docker rm -f account
docker run --restart unless-stopped --name account -d --init --env-file ./env.production -p 3000:80 accounts
