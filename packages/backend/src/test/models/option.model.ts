import mongoose from 'mongoose';
import { BaseModel } from '../../config/base.model';

export interface IOption extends BaseModel {
  text: string;
}

export const OptionSchema = new mongoose.Schema<IOption>({
  text: {
    type: String,
    required: true
  }
});

export const Option = mongoose.model<IOption>('options', OptionSchema);
