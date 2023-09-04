import mongoose from 'mongoose';
import { IQuestion, Question } from './question.model';
import { IUser, User } from '../../user/models/user.model';
import { BaseModel } from '../../config/base.model';

export interface ITest extends BaseModel {
  title: string;
  description: string;
  questions: IQuestion[];
  createdBy: IUser;
}

export const TestSchema = new mongoose.Schema<ITest>({
  title: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: true
  },
  questions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: Question.name,
      default: []
    }
  ],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: User.name
  }
}, { timestamps: true });

export const Test = mongoose.model<ITest>('tests', TestSchema);
