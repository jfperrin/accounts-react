/* eslint-disable prefer-template,no-path-concat,no-path-concat */
import dotenv from 'dotenv';
import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import session from 'express-session';
import passport from 'passport';
import schema from './schema/schema';
import MongoStore from 'connect-mongo';

dotenv.config();

const app = express();

const { MONGO_URI ,PORT } = process.env;
if (!MONGO_URI) {
  throw new Error('You must provide a MongoLab URI');
}

mongoose.connect(MONGO_URI);
mongoose.Promise = global.Promise;
mongoose.connection.on('error', console.error.bind(console, 'connection error:'));
mongoose.connection.once('open', () => {
  let listener = app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log('Listening backend express app on port ' + listener.address().port); //Listening on port 8888
  });
});

// Configures express to use sessions.  This places an encrypted identifier
// on the users cookie.  When a user makes a request, this middleware examines
// the cookie and modifies the request object to indicate which user made the request
// The cookie itself only contains the id of a session; more data about the session
// is stored inside of MongoDB.
app.use(
  session({
    resave: true,
    saveUninitialized: true,
    secret: 'aaabbbccc',
    store: MongoStore.create({
      mongoUrl: MONGO_URI,
      autoReconnect: true,
    }),
  }),
);

// Passport is wired into express as a middleware. When a request comes in,
// Passport will examine the request's session (as set by the above config) and
// assign the current user to the 'req.user' object.  See also servces/auth.js
app.use(passport.initialize());
app.use(passport.session());

app.set('port', process.env.PORT);
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(__dirname + '/../../client/dist'));
}

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true,
  }),
);
