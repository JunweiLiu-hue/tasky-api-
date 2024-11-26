import dotenv from 'dotenv';
import express from 'express';
import tasksRouter from './api/tasks';
import './db';
import usersRouter from './api/users';

dotenv.config();

const app = express();

const errHandler = (err, req, res, next) => {
  if (process.env.NODE_ENV === 'production') {
    return res.status(500).send('Something went wrong!');
  }
  res.status(500).send(`Hey!! You caught the error 👍👍. Here's the details: ${err.stack}`);
};

const port = process.env.PORT || 8080;

app.use(express.json());

app.use('/api/tasks', tasksRouter);

app.use(errHandler);

app.use('/api/users', usersRouter);

app.listen(port, () => {
  console.info(`Server running at http://localhost:${port}`);
});
