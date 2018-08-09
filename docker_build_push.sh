#!/bin/bash

docker login -u $HEROKU_USER -p "$HEROKU_TOKEN"  registry.heroku.com
docker build -t "registry.heroku.com/reactapp-testing/web" .
docker push "registry.heroku.com/reactapp-testing/web:latest"
