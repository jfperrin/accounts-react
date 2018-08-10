#!/bin/bash

docker login -u $HEROKU_USER -p "$HEROKU_TOKEN"  registry.heroku.com

if [ "$1" = "tag" ]; then
  heroku_app=$HEROKU_APP_TAGGED
else
  heroku_app=$HEROKU_APP
fi

docker build -t "registry.heroku.com/$heroku_app/web" .
docker push "registry.heroku.com/$heroku_app/web:latest"
./heroku_release.sh $heroku_app
