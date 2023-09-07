import { IQuestion } from '../test.model';

export interface TestsReceivingDto {
  _id: string;
  title: string;
  description: string;
  questions: string[];
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface FullTestReceivingDto {
  _id: string;
  title: string;
  description: string;
  questions: IQuestion[];
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}
