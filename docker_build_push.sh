#!/bin/bash

docker login -u $HEROKU_USER -p "$HEROKU_TOKEN"  registry.heroku.com

if [ "$1" = "tag" ]; then
  heroku_app=$HEROKU_APP_TAGGED
else
  heroku_app=$HEROKU_APP
fi

docker build -t "registry.heroku.com/$heroku_app/web" .
docker push "registry.heroku.com/$heroku_app/web:latest"

imageId=$(docker inspect registry.heroku.com/p/web --format={{.Id}})
payload='{"updates":[{"type":"web","docker_image":"'"$imageId"'"}]}'
curl -n -X PATCH https://api.heroku.com/apps/$heroku_app/formation \
-d "$payload" \
-H "Content-Type: application/json" \
-H "Accept: application/vnd.heroku+json; version=3.docker-releases" \
-H "Authorization: Bearer $HEROKU_TOKEN"

