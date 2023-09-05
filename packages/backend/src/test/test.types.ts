import { ObjectId } from 'mongodb';

export interface ICreateTest {
  title: string;
  description: string;
  createdBy: ObjectId;
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
    update: { $push: { answers: ObjectId; } }
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
}
