import { IQuestion, Question } from './models/question.model';
import { Test } from './models/test.model';
import { 
  IBulkWriteAddAnswerToQuestion,
  IBulkWriteAddOptionToQuestion,
  IBulkWriteAddQuestionToTest, 
  IBulkWriteCreateOption, 
  IBulkWriteCreateQuestion, 
  ICreateAssessment, 
  ICreateOption, 
  ICreateTest, 
  ITestWithOptionsAndAnswers, 
  IUpdateQuestion, 
  IUpdateTest
} from './test.types';
import { Option } from './models/option.model';
import { 
  getOneByIdAndQuestionTitleAgg, 
  getOneQuestionByIdAndOptionTitleAgg, 
  getOneQuestionByTitleAndTestIdAgg, 
  getOneTestByIdAgg,
  getTestWithQuestionOptionsAndAnswersIdsAgg
} from './aggregations/test.aggregations';
import { Assessment } from './models/assessment.model';
import { getAssessmentByTestIdAgg, getAssessmentByTestIdAndUserIdAgg } from './aggregations/assessments.aggregations';

export class TestRepository {
  async getAllTests() {
    return Test.find();
  }

  async getOneFullTestById(testId: string) {
    return Test.aggregate(
      getOneTestByIdAgg(testId)
    );
  }

  async getOneById(testId: string) {
    return Test.findById(testId);
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

  async getOneQuestionByAnswerId(answerId: string) {
    return Question.findOne({ answers: answerId });
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

  async getOneQuestionByIdAndOptionId(questionId: string, optionId: string) {
    return Question.findOne({ _id: questionId, options: optionId });
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
    await Assessment.deleteMany({ test: testId });
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
  
  async deleteOneAnswerByIdAndQuestionId(answerId: string, questionId: string) {
    await Question.updateOne(
      { _id: questionId },
      { $pull: { answers: answerId } }
    );
  }

  async addQuestionToTest(data: IBulkWriteAddQuestionToTest) {
    return Test.bulkWrite([data as any]);
  }

  async addOptionToQuestion(data: IBulkWriteAddOptionToQuestion) {
    return Question.bulkWrite([data as any]);
  }

  async addAnswerToQuestion(data: IBulkWriteAddAnswerToQuestion) {
    return Question.bulkWrite([data as any]);
  }

  async getOneOptionById(optionId: string) {
    return Option.findById(optionId);
  }

  async getOneQuestionByTitleAndTestId(title: string, testId: string) {
    return Test.aggregate(
      getOneQuestionByTitleAndTestIdAgg(title, testId)
    );
  }

  async getTestWithQuestionOptionsAndAnswersIds(testId: string): Promise<ITestWithOptionsAndAnswers[]> {
    return Test.aggregate<ITestWithOptionsAndAnswers>(
      getTestWithQuestionOptionsAndAnswersIdsAgg(testId)
    );
  }

  async updateOneById(data: IUpdateTest, testId: string) {
    return Test.updateOne({ _id: testId }, data);
  }

  async updateOneQuestionById(data: IUpdateQuestion, questionId: string) {
    return Question.updateOne({ _id: questionId }, data);
  }

  async createAssessment(data: ICreateAssessment) {
    return Assessment.create(data);
  }

  async getAssessmentsByTestId(testId: string) {
    return Assessment.aggregate(
      getAssessmentByTestIdAgg(testId)
    );
  }

  async getAssessmentsByTestIdAndUserId(testId: string, userId: string) {
    return Assessment.aggregate(
      getAssessmentByTestIdAndUserIdAgg(testId, userId)
    );
  }
}
