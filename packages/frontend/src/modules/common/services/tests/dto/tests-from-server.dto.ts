import UserModel from '../../user/user.model';
import TestModel, { IQuestion } from '../test.model';

export interface TestsReceivingDto {
  _id: string;
  title: string;
  description: string;
  questions: string[];
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface TestForEditReceivingDto {
  _id: string;
  title: string;
  description: string;
  questions: IQuestion[];
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface TestForPassingReceivingDto {
  _id: string;
  title: string;
  description: string;
  questions: IQuestion[];
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface AssessmentReceivingDto {
  _id: string;
  test: string | TestModel;
  candidate: string | UserModel;
  score: number;
  timer: number;
  createdAt: string;
  updatedAt: string;
}
