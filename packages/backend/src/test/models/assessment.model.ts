import mongoose from 'mongoose';
import { ITest, Test } from './test.model';
import { IUser, User } from '../../user/models/user.model';
import { BaseModel } from '../../config/base.model';

export interface IAssessment extends BaseModel {
  test: ITest;
  candidate: IUser;
  score: number;
}

export const AssessmentSchema = new mongoose.Schema<IAssessment>({
  test: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Test.name
  },
  candidate: {
    type: mongoose.Schema.Types.ObjectId,
    ref: User.name
  },
  score: {
    type: Number,
    required: true
  }
}, { timestamps: true });

export const Assessment = mongoose.model<IAssessment>('assessments', AssessmentSchema);
