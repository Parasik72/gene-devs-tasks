import mongoose from 'mongoose';
import { IOption, Option } from './option.model';
import { BaseModel } from '../../config/base.model';

export interface IQuestion extends BaseModel {
  title: string;
  options: IOption[];
  answers: IOption[];
}

export const QuestionSchema = new mongoose.Schema<IQuestion>({
  title: {
    type: String,
    required: true
  },
  options: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: Option.name,
      default: []
    }
  ],
  answers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: Option.name,
      default: []
    }
  ]
});

export const Question = mongoose.model<IQuestion>('questions', QuestionSchema);
