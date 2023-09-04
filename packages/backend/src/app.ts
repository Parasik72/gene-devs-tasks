import express from 'express';
import router from './router';
import bodyParser from 'body-parser';
import { errorHandlerMiddleware } from './middlewares/error-handler.middleware';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/', router);
app.use(errorHandlerMiddleware);

export default app;
