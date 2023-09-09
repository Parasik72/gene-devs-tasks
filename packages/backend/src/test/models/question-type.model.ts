import mongoose from 'mongoose';
import { BaseModel } from '../../config/base.model';

export interface IQeustionType extends BaseModel {
  text: string;
}

export const QuestionTypeSchema = new mongoose.Schema<IQeustionType>({
  text: {
    type: String,
    required: true
  }
});

export const QuestionType = mongoose.model<IQeustionType>('question-types', QuestionTypeSchema);
