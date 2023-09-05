import { Question } from './models/question.model';
import { Test } from './models/test.model';
import { 
  IBulkWriteAddOptionToQuestion,
  IBulkWriteAddQuestionToTest, 
  IBulkWriteCreateOption, 
  IBulkWriteCreateQuestion, 
  ICreateOption, 
  ICreateTest 
} from './test.types';
import { Option } from './models/option.model';
import { getOneByIdAndQuestionTitleAgg, getOneQuestionByIdAndOptionTitleAgg } from './aggregations/test.aggregations';

export class TestRepository {
  async getOneById(id: string) {
    return Test.findById(id);
  }

  async getOneByTitle(title: string) {
    return Test.findOne({ title });
  }

  async getOneByQuestionId(questionId: string) {
    return Test.findOne({ questions: questionId });
  }

  async getOneQuestionByOptionId(optionId: string) {
    return Question.findOne({ options: optionId });
  }

  async getOneByIdAndQuestionTitle(questionTitle: string, testId: string) {
    return Test.aggregate(
      getOneByIdAndQuestionTitleAgg(questionTitle, testId)
    );
  }

  async createTest(data: ICreateTest) {
    return Test.create(data);
  }

  async createOption(data: ICreateOption) {
    return Option.create(data);
  }

  async getOneQuestionByIdAndOptionTitle(questionId: string, optionTitle: string) {
    return Question.aggregate(
      getOneQuestionByIdAndOptionTitleAgg(questionId, optionTitle)
    );
  }

  async createOptions(data: IBulkWriteCreateOption[]) {
    return Option.bulkWrite(data);
  }

  async createQuestion(data: IBulkWriteCreateQuestion) {
    return Question.bulkWrite([data]);
  }

  async getOneQuestionById(questionId: string) {
    return Question.findById(questionId);
  }

  async deleteOneById(testId: string) {
    await Test.deleteOne({ _id: testId });
  }

  async deleteOneQuestionByIdAndTestId(questionId: string, testId: string) {
    await Test.updateOne(
      { _id: testId },
      { $pull: { questions: questionId } }
    );
    await Question.deleteOne({ _id: questionId });
  }

  async deleteOneOptionByIdAndQuestionId(optionId: string, questionId: string) {
    await Question.updateOne(
      { _id: questionId },
      { $pull: { options: optionId, answers: optionId } }
    );
    await Option.deleteOne({ _id: optionId });
  }

  async addQuestionToTest(data: IBulkWriteAddQuestionToTest) {
    return Test.bulkWrite([data as any]);
  }

  async addOptionToQuestion(data: IBulkWriteAddOptionToQuestion) {
    return Question.bulkWrite([data as any]);
  }

  async getOneOptionById(optionId: string) {
    return Option.findById(optionId);
  }
}
