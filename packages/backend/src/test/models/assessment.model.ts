import mongoose from 'mongoose';
import { Test } from './test.model';
import { User } from '../../user/models/user.model';
import { BaseModel } from '../../config/base.model';
import { ObjectId } from 'mongodb';

export interface IAssessment extends BaseModel {
  test: ObjectId;
  candidate: ObjectId;
  score: number;
  timer: number;
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
  },
  timer: {
    type: Number,
    required: true
  },
}, { timestamps: true });

export const Assessment = mongoose.model<IAssessment>('assessments', AssessmentSchema);
