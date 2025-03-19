FROM node:20-buster

COPY client /app/client
RUN cd /app/client && yarn install --registry=https://registry.yarnpkg.com && NODE_ENV=production yarn build

COPY server /app/server
RUN cd /app/server && yarn install --registry=https://registry.yarnpkg.com && NODE_ENV=production yarn run build

ENV PORT 80
ENV NODE_ENV production

CMD node /app/server/dist/server.js

EXPOSE 80
