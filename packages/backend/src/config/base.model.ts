import mongoose from 'mongoose';
import { ObjectId } from 'mongodb';

export interface BaseModel extends mongoose.Document {
  _id: ObjectId;
}
