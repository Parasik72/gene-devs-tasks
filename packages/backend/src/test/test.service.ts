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
  IQuestionWithOptions, 
  ITestWithOptions, 
  ITestWithQuestions, 
  IUpdateQuestion, 
  IUpdateTest,
  IUserAnswer
} from './test.types';
import { IOption } from './models/option.model';
import { IQuestion } from './models/question.model';
import { ITest } from './models/test.model';
import { IUser } from '../user/models/user.model';
import { IAssessment } from './models/assessment.model';

export class TestService {
  constructor(private readonly testRepository: TestRepository) {}

  async getAllTests(): Promise<ITest[]>  {
    return this.testRepository.getAllTests();
  }

  async getOneFullTestById(testId: string): Promise<ITestWithOptions> {
    return (await this.testRepository.getOneFullTestById(testId))[0];
  }

  async getOneById(id: string): Promise<ITest | null> {
    return this.testRepository.getOneById(id);
  }

  async getOneByTitle(title: string): Promise<ITest | null> {
    return this.testRepository.getOneByTitle(title);
  }

  async getOneByQuestionId(questionId: string): Promise<ITest | null> {
    return this.testRepository.getOneByQuestionId(questionId);
  }

  async getOneQuestionByOptionId(optionId: string): Promise<IQuestion | null> {
    return this.testRepository.getOneQuestionByOptionId(optionId);
  }

  async getOneQuestionByAnswerId(answerId: string): Promise<IQuestion | null> {
    return this.testRepository.getOneQuestionByAnswerId(answerId);
  }

  async getOneByIdAndQuestionTitle(questionTitle: string, testId: string)
  : Promise<ITestWithQuestions> {
    return (await this.testRepository.getOneByIdAndQuestionTitle(questionTitle, testId))[0];
  }

  async createTest(data: ICreateTest): Promise<ITest> {
    return this.testRepository.createTest(data);
  }

  async createOption(data: ICreateOption): Promise<IOption> {
    return this.testRepository.createOption(data);
  }

  async getOneQuestionByIdAndOptionTitle(questionId: string, optionTitle: string)
  : Promise<IQuestionWithOptions> {
    return (await this.testRepository.getOneQuestionByIdAndOptionTitle(questionId, optionTitle))[0];
  }

  async getOneQuestionByTitleAndTestId(title: string, testId: string)
  : Promise<ITestWithQuestions> {
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

  async getOneQuestionById(questionId: string): Promise<IQuestion | null> {
    return this.testRepository.getOneQuestionById(questionId);
  }

  async getOneQuestionByIdAndOptionId(questionId: string, optionId: string): Promise<IQuestion | null> {
    return this.testRepository.getOneQuestionByIdAndOptionId(questionId, optionId);
  }

  async deleteOneById(testId: string): Promise<void> {
    return this.testRepository.deleteOneById(testId);
  }

  async deleteOneQuestionByIdAndTestId(questionId: string, testId: string): Promise<void> {
    return this.testRepository.deleteOneQuestionByIdAndTestId(questionId, testId);
  }

  async deleteOneOptionByIdAndQuestionId(optionId: string, questionId: string): Promise<void> {
    return this.testRepository.deleteOneOptionByIdAndQuestionId(optionId, questionId);
  }

  async deleteOneAnswerByIdAndQuestionId(answerId: string, questionId: string): Promise<void> {
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

  async getOneOptionById(optionId: string): Promise<IOption | null> {
    return this.testRepository.getOneOptionById(optionId);
  }

  async updateOneById(data: IUpdateTest, testId: string) {
    return this.testRepository.updateOneById(data, testId);
  }

  async updateOneQuestionById(data: IUpdateQuestion, questionId: string) {
    return this.testRepository.updateOneQuestionById(data, questionId);
  }

  async getAssessmentsByTestId(testId: string): Promise<IAssessment[]> {
    return this.testRepository.getAssessmentsByTestId(testId);
  }

  async getAssessmentsByTestIdAndUserId(testId: string, userId: string)
  : Promise<IAssessment[]> {
    return this.testRepository.getAssessmentsByTestIdAndUserId(testId, userId);
  }

  async generateAssessment(testId: string, user: IUser, answers: IUserAnswer[])
  : Promise<IAssessment> {
    const testWithOptionsAndAnswers = 
      (await this.testRepository.getTestWithQuestionOptionsAndAnswersIds(testId))[0];
    let score = 0;
    let incorrectQuestions = 0;
    const questionsPassed: Record<string, string> = {};
    answers.forEach((answer) => {
      if (questionsPassed[answer.questionId]) return;
      const question = 
        testWithOptionsAndAnswers.questions.find((item) => item._id.toHexString() === answer.questionId);
      if (!question) return;
      if (question.options.length === 0 || question.answers.length === 0) {
        ++incorrectQuestions;
        return;
      }
      if (answer.selected.length !== question.answers.length) return;
      const answersPassed: Record<string, string> = {};
      for (const selected of answer.selected) {
        if (answersPassed[selected]) return;
        const findAnswer = question.answers.find((item) => item._id.toHexString() === selected);
        if (!findAnswer) return;
        const answerId = findAnswer.toHexString();
        answersPassed[answerId] = answerId;
      }
      const questionId = question._id.toHexString();
      questionsPassed[questionId] = questionId;
      ++score;
    });
    const precentageOfScore = 
      (score / (testWithOptionsAndAnswers.questions.length - incorrectQuestions)) * 100;
    return this.testRepository.createAssessment({
      test: testWithOptionsAndAnswers._id,
      candidate: user._id,
      score: precentageOfScore
    });
  }

  isUserTestCreator(test: ITest, user: IUser): boolean {
    return test.createdBy.toHexString() === user._id.toHexString();
  }

  isAnswerInQuestion(question: IQuestion, answerId: string): IOption | undefined {
    return question.answers.find((answer) => answer._id.toHexString() === answerId);
  }

  isTestEmpty(test: ITest): boolean {
    return test.questions.length === 0;
  }

  prepareOptionsForCreation(options: IOption[]): IBulkWriteCreateOption[] {
    return options.map((option) => ({
      insertOne: {
        document: option
      }
    }));
  }

  prepareQuestionForCreation(question: IPrepareQuestionForCreation): IBulkWriteCreateQuestion {
    return {
      insertOne: {
        document: question
      }
    };
  }

  prepareTestForAddQuestion(testId: ObjectId, questionId: ObjectId): IBulkWriteAddQuestionToTest {
    return {
      updateOne: {
        filter: { _id: testId },
        update: { $push: { questions: questionId } }
      }
    };
  }

  prepareQuestionForAddOption(questionId: ObjectId, optionId: ObjectId): IBulkWriteAddOptionToQuestion {
    return {
      updateOne: {
        filter: { _id: questionId },
        update: { $push: { options: optionId } }
      }
    };
  }

  prepareQuestionForAddAnswer(questionId: ObjectId, answerId: ObjectId): IBulkWriteAddAnswerToQuestion {
    return {
      updateOne: {
        filter: { _id: questionId },
        update: { $push: { answers: answerId } }
      }
    };
  }
}
