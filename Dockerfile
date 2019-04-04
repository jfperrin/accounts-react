FROM node:9

COPY client /app/client
RUN cd /app/client && yarn install && NODE_ENV=production yarn build

COPY server /app/server
RUN cd /app/server && yarn install && NODE_ENV=production yarn run build

ENV PORT 3333
ENV NODE_ENV production

CMD node /app/server/dist/server.js

EXPOSE 3333
