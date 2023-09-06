import express from 'express';
import router from './router';
import bodyParser from 'body-parser';
import { errorHandlerMiddleware } from './middlewares/error-handler.middleware';
import cors from 'cors';

const app = express();

app.use(cors({ 
  origin: process.env.FRONTEND_URL,
  credentials: true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/', router);
app.use(errorHandlerMiddleware);

export default app;
