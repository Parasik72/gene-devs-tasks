import { Question } from './models/question.model';
import { Test } from './models/test.model';
import { IBulkWriteAddQuestionToTest, IBulkWriteCreateOption, IBulkWriteCreateQuestion, ICreateTest } from './test.types';
import { Option } from './models/option.model';

export class TestRepository {
  async getOneById(id: string) {
    return Test.findById(id);
  }

  async getOneByTitle(title: string) {
    return Test.findOne({ title });
  }

  async createTest(data: ICreateTest) {
    return Test.create(data);
  }

  async createOptions(data: IBulkWriteCreateOption[]) {
    return Option.bulkWrite(data);
  }

  async createQuestion(data: IBulkWriteCreateQuestion) {
    return Question.bulkWrite([data]);
  }

  async addQuestionToTest(data: IBulkWriteAddQuestionToTest) {
    return Test.bulkWrite([data as any]);
  }
}
