/* eslint-disable prefer-template,no-path-concat,no-path-concat */
import express from 'express';
import expressGraphQL from 'express-graphql';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import session from 'express-session';
import passport from 'passport';
import { execute, subscribe } from 'graphql';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import schema from './schema/schema';

const app = express();
const MongoStore = require('connect-mongo')(session);

const MONGO_URI = process.env.MONGO_URI || 'mongodb://atraxi-dev:Shallassan69@ds117935.mlab.com:17935/accounts';
if (!MONGO_URI) {
  throw new Error('You must provide a MongoLab URI');
}

mongoose.set('debug', true);
mongoose.connect(MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.Promise = global.Promise;
// eslint-disable-next-line no-console
mongoose.connection.on('error', console.error.bind(console, 'connection error:'));
mongoose.connection.once('open', () => {
  const server = app.listen(app.get('port'), () => {
    console.log(`Find the server at: http://localhost:${app.get('port')}/`); // eslint-disable-line no-console
  });

  SubscriptionServer.create(
    {
      schema,
      execute,
      subscribe,
    },
    {
      server,
      path: '/graphql-subscription',
    },
  );
});


// Configures express to use sessions.  This places an encrypted identifier
// on the users cookie.  When a user makes a request, this middleware examines
// the cookie and modifies the request object to indicate which user made the request
// The cookie itself only contains the id of a session; more data about the session
// is stored inside of MongoDB.
app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: 'aaabbbccc',
  store: new MongoStore({
    url: MONGO_URI,
    autoReconnect: true,
  }),
}));

// Passport is wired into express as a middleware. When a request comes in,
// Passport will examine the request's session (as set by the above config) and
// assign the current user to the 'req.user' object.  See also servces/auth.js
app.use(passport.initialize());
app.use(passport.session());

app.set('port', process.env.PORT || 3001);
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(__dirname + '/../../client/build'));
}

app.use('/graphql', expressGraphQL({
  schema,
  graphiql: true,
}));
