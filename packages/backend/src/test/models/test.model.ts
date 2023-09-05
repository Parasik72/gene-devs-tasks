import mongoose from 'mongoose';
import { IQuestion, Question } from './question.model';
import { User } from '../../user/models/user.model';
import { BaseModel } from '../../config/base.model';
import { ObjectId } from 'mongodb';

export interface ITest extends BaseModel {
  title: string;
  description: string;
  questions: IQuestion[];
  createdBy: ObjectId;
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

TestSchema.pre('deleteOne',  async function (next) {
  try {
    const test = await this.model.findOne(this.getFilter());
    await Question.deleteMany({ _id: { $in: test.questions } });
    next();
  } catch (error: any) {
    next(error);
  }
});

export const Test = mongoose.model<ITest>('tests', TestSchema);
