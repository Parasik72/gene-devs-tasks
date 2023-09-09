import { IQuestion, Question } from './models/question.model';
import { ITest, Test } from './models/test.model';
import { 
  IAssessmentWithTestAndUser,
  IBulkWriteAddAnswerToQuestion,
  IBulkWriteAddOptionToQuestion,
  IBulkWriteAddQuestionToTest, 
  IBulkWriteChangeQuestionType, 
  IBulkWriteCreateOption, 
  IBulkWriteCreateQuestion, 
  ICreateAssessment, 
  ICreateOption, 
  ICreateQuestion, 
  ICreateTest, 
  IFullTest, 
  IQuestionWithOptions, 
  ITestWithOptions, 
  ITestWithOptionsAndAnswers, 
  ITestWithQuestions, 
  IUpdateQuestion, 
  IUpdateTest
} from './test.types';
import { IOption, Option } from './models/option.model';
import { 
  getAllTestsAgg,
  getOneByIdAndQuestionTitleAgg, 
  getOneTestForEditingByIdAgg, 
  getOneQuestionByTitleAndTestIdAgg, 
  getOneTestWithOptionsByIdAgg,
  getTestWithQuestionOptionsAndAnswersIdsAgg
} from './aggregations/test.aggregations';
import { Assessment, IAssessment } from './models/assessment.model';
import { 
  getAssessmentByIdAgg,
  getAssessmentByTestIdAgg, 
  getAssessmentByTestIdAndUserIdAgg 
} from './aggregations/assessments.aggregations';
import { getOneQuestionByIdAndOptionTitleAgg } from './aggregations/question.aggregations';
import { IQeustionType, QuestionType } from './models/question-type.model';

export class TestRepository {
  async getAllTests(): Promise<ITest[]> {
    return Test.aggregate(
      getAllTestsAgg()
    );
  }

  async getOneTestWithOptionsById(testId: string): Promise<ITestWithOptions[]> {
    return Test.aggregate(
      getOneTestWithOptionsByIdAgg(testId)
    );
  }

  async getOneTestForEditingByIdAgg(testId: string): Promise<IFullTest[]> {
    return Test.aggregate(
      getOneTestForEditingByIdAgg(testId)
    );
  }

  async getAllQuestionTypes(): Promise<IQeustionType[]> {
    return QuestionType.find();
  }

  async getOneQuestionTypeById(questionTypeId: string): Promise<IQeustionType | null> {
    return QuestionType.findById(questionTypeId);
  }

  async getOneQuestionTypeByText(text: string): Promise<IQeustionType | null> {
    return QuestionType.findOne({ text });
  }

  async getOneById(testId: string): Promise<ITest | null> {
    return Test.findById(testId);
  }

  async getOneByTitle(title: string): Promise<ITest | null> {
    return Test.findOne({ title });
  }

  async getOneByQuestionId(questionId: string): Promise<ITest | null> {
    return Test.findOne({ questions: questionId });
  }

  async getOneQuestionByOptionId(optionId: string): Promise<IQuestion | null> {
    return Question.findOne({ options: optionId });
  }

  async getOneQuestionByAnswerId(answerId: string): Promise<IQuestion | null> {
    return Question.findOne({ answers: answerId });
  }

  async getOneByIdAndQuestionTitle(questionTitle: string, testId: string)
  : Promise<ITestWithQuestions[]> {
    return Test.aggregate(
      getOneByIdAndQuestionTitleAgg(questionTitle, testId)
    );
  }

  async createTest(data: ICreateTest): Promise<ITest> {
    return Test.create(data);
  }

  async createOption(data: ICreateOption): Promise<IOption> {
    return Option.create(data);
  }

  async getOneQuestionByIdAndOptionTitle(questionId: string, optionTitle: string)
  : Promise<IQuestionWithOptions[]> {
    return Question.aggregate(
      getOneQuestionByIdAndOptionTitleAgg(questionId, optionTitle)
    );
  }

  async getOneQuestionByIdAndOptionId(questionId: string, optionId: string)
  : Promise<IQuestion | null> {
    return Question.findOne({ _id: questionId, options: optionId });
  }

  async createOptions(data: IBulkWriteCreateOption[]) {
    return Option.bulkWrite(data);
  }

  async createQuestion(data: ICreateQuestion): Promise<IQuestion> {
    return Question.create(data);
  }

  async getOneQuestionById(questionId: string): Promise<IQuestion | null> {
    return Question.findById(questionId);
  }

  async deleteOneById(testId: string): Promise<void> {
    await Test.deleteOne({ _id: testId });
    await Assessment.deleteMany({ test: testId });
  }

  async deleteOneQuestionByIdAndTestId(questionId: string, testId: string): Promise<void>  {
    await Test.updateOne(
      { _id: testId },
      { $pull: { questions: questionId } }
    );
    await Question.deleteOne({ _id: questionId });
  }

  async deleteOneOptionByIdAndQuestionId(optionId: string, questionId: string): Promise<void>  {
    await Question.updateOne(
      { _id: questionId },
      { $pull: { options: optionId, answers: optionId } }
    );
    await Option.deleteOne({ _id: optionId });
  }
  
  async deleteOneAnswerByIdAndQuestionId(answerId: string, questionId: string): Promise<void>  {
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

  async changeQuestionType(data: IBulkWriteChangeQuestionType) {
    return Question.bulkWrite([data as any]);
  }

  async getOneOptionById(optionId: string): Promise<IOption | null> {
    return Option.findById(optionId);
  }

  async getOneQuestionByTitleAndTestId(title: string, testId: string)
  : Promise<ITestWithQuestions[]> {
    return Test.aggregate(
      getOneQuestionByTitleAndTestIdAgg(title, testId)
    );
  }

  async getTestWithQuestionOptionsAndAnswersIds(testId: string)
  : Promise<ITestWithOptionsAndAnswers[]> {
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

  async createAssessment(data: ICreateAssessment): Promise<IAssessment> {
    return Assessment.create(data);
  }

  async getAssessmentsByTestId(testId: string): Promise<IAssessment[]> {
    return Assessment.aggregate(
      getAssessmentByTestIdAgg(testId)
    );
  }

  async getOneAssessmentById(assessmentId: string)
  : Promise<IAssessmentWithTestAndUser[]> {
    return Assessment.aggregate(
      getAssessmentByIdAgg(assessmentId)
    );
  }

  async getAssessmentsByTestIdAndUserId(testId: string, userId: string)
  : Promise<IAssessment[]> {
    return Assessment.aggregate(
      getAssessmentByTestIdAndUserIdAgg(testId, userId)
    );
  }
}
