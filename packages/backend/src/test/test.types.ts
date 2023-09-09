import { ObjectId } from 'mongodb';
import { ITest } from './models/test.model';

export enum QuestionTypes {
  MULTIPLE_CHOICE = 'Multiple choice',
  SINGLE_CHOICE = 'Single choice',
  TRUE_FALSE = 'True/False'
}

export enum TrueFalseOptions {
  TRUE = 'True',
  FALSE = 'False'
}

export const DEFAULT_QUESTION_TYPE = QuestionTypes.MULTIPLE_CHOICE;

export interface ICreateTest {
  title: string;
  description: string;
  createdBy: ObjectId;
}

export interface ICreateQuestion {
  title: string;
  questionType: ObjectId;
}

export interface IBulkWriteCreateOption {
  insertOne: {
    document: {
      text: string;
    };
  };
}

export interface IPrepareQuestionForCreation {
  title: string;
  options: ObjectId[];
  answers: ObjectId[];
}

export interface IBulkWriteCreateQuestion {
  insertOne: {
    document: {
      title: string;
      options: ObjectId[];
      answers: ObjectId[];
    } 
  }
}

export interface IBulkWriteAddQuestionToTest {
  updateOne: {
    filter: { _id: ObjectId },
    update: { $push: { questions: ObjectId; } }
  }
}

export interface ICreateOption {
  text: string;
}

export interface IBulkWriteAddOptionToQuestion {
  updateOne: {
    filter: { _id: ObjectId },
    update: { $push: { options: ObjectId; } }
  }
}

export interface IBulkWriteAddAnswerToQuestion {
  updateOne: {
    filter: { _id: ObjectId },
    update: { $push: { answers: ObjectId; } } |
            { $set: { answers: ObjectId[]; }; };
  }
}

export interface IBulkWriteChangeQuestionType {
  updateOne: {
    filter: { _id: ObjectId },
    update: {
      $set: {
          questionType: ObjectId;
          answers: ObjectId[];
          options?: ObjectId[];
      };
    };
  }
}

export interface IUpdateTest {
  title?: string;
  description?: string;
}

export interface IUpdateQuestion {
  title: string;
}

export interface IUserAnswer {
  questionId: string;
  selected: string[];
}

export interface ITestWithOptionsAndAnswers {
  _id: ObjectId;
  questions: {
    _id: ObjectId;
    options: ObjectId[]
    answers: ObjectId[]
  } [];
}

export interface ICreateAssessment {
  test: ObjectId;
  candidate: ObjectId;
  score: number;
  timer: number;
}

export interface ITestWithOptions {
  _id: ObjectId;
  title: string;
  description: string;
  questions: {
    _id: ObjectId;
    title: string;
    options: {
      _id: ObjectId;
      text: string;
    } []
  } []
  createdBy: ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export interface ITestWithQuestions {
  _id: ObjectId;
  title: string;
  description: string;
  questions: {
    _id: ObjectId;
    title: string;
    options: ObjectId[];
    answers: ObjectId[];
  } []
  createdBy: ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export interface IQuestionWithOptions {
  _id: ObjectId;
  title: string;
  options: {
    _id: ObjectId;
    text: string;
  } []
}

export interface IMessage {
  message: string;
}

export interface IFullTest {
  _id: ObjectId;
  title: string;
  description: string;
  questions: {
    _id: ObjectId;
    title: string;
    options: {
      _id: ObjectId;
      text: string;
    } [];
    answers: {
      _id: ObjectId;
      text: string;
    } [];
  } []
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IAssessmentWithTestAndUser {
  _id: ObjectId;
  test: ITest;
  candidate: {
    _id: ObjectId;
    email: string;
  };
  score: number;
}
