import { app } from './app';
import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGO_DB_CONNECTION || "";
const PORT = process.env.SERVER_PORT;

mongoose.connect(MONGODB_URI).then(result => {
  app.listen(PORT, () => {
    console.log('Listening on port ' + process.env.SERVER_PORT);
  });
}).catch(err => {
  console.log('Mongo connect error', err);
});


