# Complete Application from database (mongodb) to front (react)

[![Build Status](https://travis-ci.org/jfperrin/accounts-react.svg?branch=master)](https://travis-ci.org/jfperrin/accounts-react)

I build this application for my personnal use. The purpose was a self formation on js tech and eventualy I ended up with a complete application with express, graphQL, react/redux, passport.

## Installation

I used [create-react-app](https://github.com/facebook/create-react-app) to build the skeleton of the app. For the database you need mongodb and redis.

You can use [MLab](https://mlab.com/) for mongodb and [redisLab](https://redislabs.com/) for redis, it's free and easy.
You have to set thoses configurations into
```
./server/src/redis.js
./server/src/server.js
```

You can also find docker containers for both of them (it's the default configuration).
```docker
docker run --name redis-account -d -p 6379:6379 redis
docker run --name mongo-account -d -p 27017:27017 mongo:3.7.9
```

Once everything is set, start the application with
```
yarn start
```
You will find the application at this address [http://localhost:3000/](http://localhost:3000/), create a user with the first button on the top right of the screen.
After that create your banks, your basics operations a period and enjoy.



## Deploy

I choose [Travis-ci](https://travis-ci.org/) to deploy in docker container into [Heroku](https://www.heroku.com/) (to host this website). 
On the travis.yml file, I set two deployment profiles. One use on each commit, and one on tag only.

On heroku you have to set thoose config variables in order to acces to the databases.
```
REDIS_PORT # Redis Port
REDIS_URI # Redis Uri
REDIS_PWD # Redis password. Do not set this one your redis server is not secured

MONGO_URI # Full mongodb Uri including user and password (ex: mongodb://user:pwd@uri:port/path)
```
For travis-ci you have to set 4 environment variables
```
HEROKU_APP # Name of the application targeted by travis on each commit
HEROKU_APP_TAGGED # Name of the application targeted by travis on tag
HEROKU_TOKEN # Heroku API Key 
HEROKU_USER # Heroku user
```

