import mongoose from 'mongoose';
import { TokenPayload } from '../token/token.types';

declare global {
  namespace Express {
    export interface Request {
      user: TokenPayload;
    }
  }
}

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || '');
    console.log('MongoDB Connected...');
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

export default connectDB;
