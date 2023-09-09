import express from 'express';
import router from './router';
import bodyParser from 'body-parser';
import { errorHandlerMiddleware } from './middlewares/error-handler.middleware';
import fileUpload from 'express-fileupload';
import cors from 'cors';
import { STATIC_PATH } from './constants/paths.constants';

const app = express();

app.use(cors({ 
  origin: process.env.FRONTEND_URL,
  credentials: true
}));
app.use(fileUpload());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(STATIC_PATH));
app.use('/', router);
app.use(errorHandlerMiddleware);

export default app;
