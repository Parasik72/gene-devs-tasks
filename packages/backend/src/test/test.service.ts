import { ObjectId } from 'mongodb';
import { TestRepository } from './test.repository';
import { 
  IBulkWriteAddQuestionToTest,
  IBulkWriteCreateOption, 
  IBulkWriteCreateQuestion, 
  ICreateTest, 
  IPrepareQuestionForCreation 
} from './test.types';
import { IOption } from './models/option.model';

export class TestService {
  constructor(private readonly testRepository: TestRepository) {}

  async getOneById(id: string) {
    return this.testRepository.getOneById(id);
  }

  async getOneByTitle(title: string) {
    return this.testRepository.getOneByTitle(title);
  }

  async createTest(data: ICreateTest) {
    return this.testRepository.createTest(data);
  }

  async createOptions(data: IBulkWriteCreateOption[], answers: IOption[]) {
    const result = await this.testRepository.createOptions(data);
    return {
      options: Object.values(result.insertedIds),
      answers: answers.map((answer) => {
        const findOption = data.findIndex((item) => 
          item.insertOne.document.text === answer.text);
        return result.insertedIds[findOption];
      })
    };
  }

  async createQuestion(data: IBulkWriteCreateQuestion) {
    return (await this.testRepository.createQuestion(data)).insertedIds[0];
  }

  async addQuestionToTest(data: IBulkWriteAddQuestionToTest) {
    return this.testRepository.addQuestionToTest(data);
  }

  prepareOptionsForCreation(options: IOption[]) {
    return options.map((option) => ({
      insertOne: {
        document: option
      }
    }));
  }

  prepareQuestionForCreation(question: IPrepareQuestionForCreation) {
    return {
      insertOne: {
        document: question
      }
    };
  }

  prepareTestForAddQuestion(testId: ObjectId, questionId: ObjectId) {
    return {
      updateOne: {
        filter: { _id: testId },
        update: { $push: { questions: questionId } }
      }
    };
  }
}
