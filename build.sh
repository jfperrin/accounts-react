#!/bin/bash

git pull
docker build -t accounts-react .
docker rm account -f
docker run --restart always --name account -d --init --env-file ./env.production -p 3000:80 accounts-react
