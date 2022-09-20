import express from 'express';
import 'express-async-errors';
import mongoose from 'mongoose';

import { signinRouter } from './routes/signin';
import { signupRouter } from './routes/signup';
import { signoutRouter } from './routes/signout';
import { currentUserRouter } from './routes/current-user';

import { errorHandler } from './middlewares/error-handler';
import { NotFoundError } from './errors/not-found-error';

const app = express();

app.use(express.json());

app.use(signinRouter);
app.use(signupRouter);
app.use(signoutRouter);
app.use(currentUserRouter);

app.all('*', () => {
  throw new NotFoundError();
});

app.use(errorHandler);

// connect to db
const start = async () => {
  try {
    const connect = await mongoose.connect(
      'mongodb://auth-mongo-srv:27017/auth'
    );
    console.log('Connected to mongodb');
  } catch (err) {
    console.log('something went wrong while connecting to db');
  }

  app.listen(3000, () => {
    console.log('Listening on port 3000!!!!!');
  });
};

start();
