import mongoose from 'mongoose';
import { IOption, Option } from './option.model';
import { BaseModel } from '../../config/base.model';
import { ObjectId } from 'mongodb';
import { QuestionType } from './question-type.model';

export interface IQuestion extends BaseModel {
  title: string;
  options: IOption[];
  answers: IOption[];
  questionType: ObjectId;
  image: string | null;
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
  ],
  questionType: {
    type: mongoose.Schema.Types.ObjectId,
    ref: QuestionType.name,
  },
  image: {
    type: String,
    default: null
  }
});

QuestionSchema.pre('deleteOne', async function (next) {
  try {
    const question = await this.model.findOne(this.getFilter());
    await Option.deleteMany({ _id: { $in: question.options } });
    next();
  } catch (error: any) {
    next(error);
  }
});

QuestionSchema.pre('deleteMany', async function (next) {
  try {
    const questionsToDelete = await this.model.find(this.getFilter());
    const optionIdsToDelete = questionsToDelete.reduce(
      (acc, question) => acc.concat(question.options),
      []
    );
    await Option.deleteMany({ _id: { $in: optionIdsToDelete } });
    next();
  } catch (error: any) {
    next(error);
  }
});

export const Question = mongoose.model<IQuestion>('questions', QuestionSchema);
