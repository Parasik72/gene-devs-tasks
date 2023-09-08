import * as dotenv from 'dotenv';
dotenv.config({ path: `.env.${process.env.NODE_ENV}` });
import app from './app';
import connectDB from './config/database';

const PORT = process.env.PORT || 5000;


const start = async () => {
  await connectDB();
  app.listen(PORT,
    () => console.log(`Server has been started on port: ${PORT}`));
};

start();
