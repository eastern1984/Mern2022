import path from 'path';
import express, { Request, Response } from 'express';
import { router } from './routes/loginRoutes';
import bodyParser from 'body-parser';
import cookieSession from 'cookie-session';
import mongoose from 'mongoose';
import { default as connectMongoDBSession } from 'connect-mongodb-session';
import ExpressSession from 'express-session';
import flash from 'connect-flash';
import session from 'express-session';

const MONGODB_URI = 'mongodb://localhost:27017/omnitec';
const PORT = 3000;

const app = express();

const MongoDBStore = connectMongoDBSession(session);

const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: 'sessions'
});

/*app.use(
  ExpressSession({ secret: 'my secret string', resave: false, saveUninitialized: false, store: store })
).use(flash());*/

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieSession({ keys: ['laskdjf'] }));

app.use(express.static(path.join(__dirname, '..', 'client', 'build')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html'));
});

app.use(router);

mongoose.connect(MONGODB_URI).then(result => {
  app.listen(PORT, () => {
    console.log('Listening on port 3000 ');
  });
}).catch(err => {
  console.log('321Mongo connect error', err);
});


