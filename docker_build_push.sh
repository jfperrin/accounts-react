#!/bin/bash

docker login -u $HEROKU_USER -p "$HEROKU_TOKEN"  registry.heroku.com

if [ "$1" = "tag" ]; then
  docker build -t registry.heroku.com/atraxi-account/web .
  docker push registry.heroku.com/atraxi-account/web:latest
else
  docker build -t registry.heroku.com/atraxi-account-dev/web .
  docker push registry.heroku.com/atraxi-account-dev/web:latest
fi

