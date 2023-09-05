import { ObjectId } from 'mongodb';
import { TestRepository } from './test.repository';
import { 
  IBulkWriteAddAnswerToQuestion,
  IBulkWriteAddOptionToQuestion,
  IBulkWriteAddQuestionToTest,
  IBulkWriteCreateOption, 
  IBulkWriteCreateQuestion, 
  ICreateOption, 
  ICreateTest, 
  IPrepareQuestionForCreation, 
  IUpdateQuestion, 
  IUpdateTest
} from './test.types';
import { IOption } from './models/option.model';
import { IQuestion } from './models/question.model';

export class TestService {
  constructor(private readonly testRepository: TestRepository) {}

  async getAllTests() {
    return this.testRepository.getAllTests();
  }

  async getOneFullTestById(testId: string) {
    return (await this.testRepository.getOneFullTestById(testId))[0];
  }

  async getOneById(id: string) {
    return this.testRepository.getOneById(id);
  }

  async getOneByTitle(title: string) {
    return this.testRepository.getOneByTitle(title);
  }

  async getOneByQuestionId(questionId: string) {
    return this.testRepository.getOneByQuestionId(questionId);
  }

  async getOneQuestionByOptionId(optionId: string) {
    return this.testRepository.getOneQuestionByOptionId(optionId);
  }

  async getOneQuestionByAnswerId(answerId: string) {
    return this.testRepository.getOneQuestionByAnswerId(answerId);
  }

  async getOneByIdAndQuestionTitle(questionTitle: string, testId: string) {
    return (await this.testRepository.getOneByIdAndQuestionTitle(questionTitle, testId))[0];
  }

  async createTest(data: ICreateTest) {
    return this.testRepository.createTest(data);
  }

  async createOption(data: ICreateOption) {
    return this.testRepository.createOption(data);
  }

  async getOneQuestionByIdAndOptionTitle(questionId: string, optionTitle: string) {
    return (await this.testRepository.getOneQuestionByIdAndOptionTitle(questionId, optionTitle))[0];
  }

  async getOneQuestionByTitleAndTestId(title: string, testId: string) {
    return (await this.testRepository.getOneQuestionByTitleAndTestId(title, testId))[0];
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

  async getOneQuestionById(questionId: string) {
    return this.testRepository.getOneQuestionById(questionId);
  }

  async getOneQuestionByIdAndOptionId(questionId: string, optionId: string) {
    return this.testRepository.getOneQuestionByIdAndOptionId(questionId, optionId);
  }

  async deleteOneById(testId: string) {
    return this.testRepository.deleteOneById(testId);
  }

  async deleteOneQuestionByIdAndTestId(questionId: string, testId: string) {
    return this.testRepository.deleteOneQuestionByIdAndTestId(questionId, testId);
  }

  async deleteOneOptionByIdAndQuestionId(optionId: string, questionId: string) {
    return this.testRepository.deleteOneOptionByIdAndQuestionId(optionId, questionId);
  }

  async deleteOneAnswerByIdAndQuestionId(answerId: string, questionId: string) {
    return this.testRepository.deleteOneAnswerByIdAndQuestionId(answerId, questionId);
  }

  async addQuestionToTest(data: IBulkWriteAddQuestionToTest) {
    return this.testRepository.addQuestionToTest(data);
  }

  async addOptionToQuestion(data: IBulkWriteAddOptionToQuestion) {
    return this.testRepository.addOptionToQuestion(data);
  }

  async addAnswerToQuestion(data: IBulkWriteAddAnswerToQuestion) {
    return this.testRepository.addAnswerToQuestion(data);
  }

  async getOneOptionById(optionId: string) {
    return this.testRepository.getOneOptionById(optionId);
  }

  async updateOneById(data: IUpdateTest, testId: string) {
    return this.testRepository.updateOneById(data, testId);
  }

  async updateOneQuestionById(data: IUpdateQuestion, questionId: string) {
    return this.testRepository.updateOneQuestionById(data, questionId);
  }

  isAnswerInQuestion(question: IQuestion, answerId: string) {
    return question.answers.find((answer) => answer._id.toHexString() === answerId);
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

  prepareQuestionForAddOption(questionId: ObjectId, optionId: ObjectId) {
    return {
      updateOne: {
        filter: { _id: questionId },
        update: { $push: { options: optionId } }
      }
    };
  }

  prepareQuestionForAddAnswer(questionId: ObjectId, answerId: ObjectId) {
    return {
      updateOne: {
        filter: { _id: questionId },
        update: { $push: { answers: answerId } }
      }
    };
  }
}
