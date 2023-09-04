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
