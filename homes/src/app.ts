import express from 'express';
import 'express-async-errors';
import cookieSession from 'cookie-session';
import { errorHandler, NotFoundError, currentUser } from '@gethomes/common';

import { createHomeRouter } from './routes/new';
import { showHomeRouter } from './routes/show';
import { indexHomeRouter } from './routes/index';

const app = express();
app.set('trust proxy', true);

app.use(express.json());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test',
  })
);

app.use(currentUser);

app.use(createHomeRouter);
app.use(showHomeRouter);
app.use(indexHomeRouter);

app.all('*', () => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
