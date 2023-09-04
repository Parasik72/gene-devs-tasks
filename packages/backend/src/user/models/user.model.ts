import mongoose from 'mongoose';
import { BaseModel } from '../../config/base.model';

export interface IUser extends BaseModel {
  email: string;
  password: string;
}

export const UserSchema = new mongoose.Schema<IUser>({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});

export const User = mongoose.model<IUser>('user', UserSchema);
