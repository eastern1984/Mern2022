import path from 'path';
import express from 'express';
import { router } from './routes/loginRoutes';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import { default as connectMongoDBSession } from 'connect-mongodb-session';
import ExpressSession from 'express-session';
import flash from 'connect-flash';
import session from 'express-session';
import User from './models/User';
import { natsConnect } from './utils/nats';
import * as dotenv from "dotenv";

dotenv.config({ path: './.env' });

declare module 'express-session' {
  interface SessionData {
    user: typeof User;
  }
}

const MONGODB_URI = process.env.MONGO_DB_CONNECTION || "";
const PORT = process.env.SERVER_PORT;

const app = express();

const MongoDBStore = connectMongoDBSession(session);

const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: 'sessions'
});

app.use(
  ExpressSession({ secret: process.env.SECRET_SESSION_STRING || "", resave: false, saveUninitialized: false, store: store })
).use(flash());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(process.env.API_URL || "", router);

app.use(express.static(path.join(__dirname, '..', 'client', 'build')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html'));
});

natsConnect();

mongoose.connect(MONGODB_URI).then(result => {
  app.listen(PORT, () => {
    console.log('Listening on port 3000 ');
  });
}).catch(err => {
  console.log('Mongo connect error', err);
});


