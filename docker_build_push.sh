#!/bin/bash

docker login -u $HEROKU_USER -p "$HEROKU_TOKEN"  registry.heroku.com

if [ "$1" = "tag" ]; then
  HEROKU = $HEROKU_APP_TAGGED
else
  HEROKU = $HEROKU_APP
fi

docker build -t registry.heroku.com/$HEROKU/web .
docker push registry.heroku.com/$HEROKU/web:latest
