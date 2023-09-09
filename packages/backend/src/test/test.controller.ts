import express from 'express';
import { TestService } from './test.service';
import { TestRepository } from './test.repository';
import { CreateTestDto } from './dto/create-test.dto';
import { HttpException } from '../exceptions/http.exception';
import { UserService } from '../user/user.service';
import { UserRepository } from '../user/user.repository';
import { AddQuestionDto } from './dto/add-question.dto';
import { AddQuestionsParams } from './params/add-questions.params';
import { DeleteQuestionParams } from './params/delete-question.params';
import { DeleteTestParams } from './params/delete-test.params';
import { AddOptionParams } from './params/add-option.params';
import { AddOptionDto } from './dto/add-option.dto';
import { DeleteOptionParams } from './params/delete-option.params';
import { UpdateTestParams } from './params/update-test.params';
import { UpdateTestDto } from './dto/update-test.dto';
import { UpdateQuestionParams } from './params/update-question.params';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { GetOneTestByIdParams } from './params/get-one-test-by-id.params';
import { AddAnswerParams } from './params/add-answer.params';
import { AddAnswerDto } from './dto/add-answer.dto';
import { ObjectId } from 'mongodb';
import { DeleteAnswerParams } from './params/delete-answer.params';
import { PassTestParams } from './params/pass-test.params';
import { PassTestDto } from './dto/pass-test.dto';
import { GetAssessmentsParams } from './params/get-assessments.params';
import { ITest } from './models/test.model';
import { IAssessmentWithTestAndUser, IFullTest, IMessage, ITestWithOptions } from './test.types';
import { IAssessment } from './models/assessment.model';
import { GetOneAssessmentParams } from './params/get-one-assessment.params';

class TestController {
  constructor(
    private readonly testService: TestService,
    private readonly userService: UserService
  ) {}

  async getAllTests(): Promise<ITest[]> {
    return this.testService.getAllTests();
  }

  async getOneTestWithOptionsById(req: express.Request<GetOneTestByIdParams>): Promise<ITestWithOptions> {
    const test = await this.testService.getOneById(req.params.testId);
    if (!test) {
      throw new HttpException('The test was not found', 404);
    }
    const testWithOptions = await this.testService.getOneTestWithOptionsById(test._id.toHexString());
    return this.testService.randomizeQuestions(testWithOptions);
  }

  async getOneTestForEditingByIdAgg(req: express.Request<GetOneTestByIdParams>): Promise<IFullTest> {
    const test = await this.testService.getOneById(req.params.testId);
    if (!test) {
      throw new HttpException('The test was not found', 404);
    }
    const user = await this.userService.getOneUserByEmail(req.user.email);
    if (!this.testService.isUserTestCreator(test, user!)) {
      throw new HttpException('You cant get the full test', 403);
    }
    return this.testService.getOneTestForEditingByIdAgg(test._id.toHexString());
  }

  async createTest(req: express.Request<{}, {}, CreateTestDto>): Promise<ITest> {
    const user = await this.userService.getOneUserByEmail(req.user.email);
    const { title, description } = req.body;
    const titleInUse = await this.testService.getOneByTitle(title);
    if (titleInUse) {
      throw new HttpException('This title is already in use', 400);
    }
    return this.testService.createTest({ title, description, createdBy: user!._id });
  }

  async updateTest(req: express.Request<UpdateTestParams, {}, UpdateTestDto>)
  : Promise<IMessage> {
    const test = await this.testService.getOneById(req.params.testId);
    if (!test) {
      throw new HttpException('The test was not found', 404);
    }
    const user = await this.userService.getOneUserByEmail(req.user.email);
    if (!this.testService.isUserTestCreator(test, user!)) {
      throw new HttpException('You cant update this test', 403);
    }
    if (req.body.title) {
      const titleInUse = await this.testService.getOneByTitle(req.body.title);
      if (titleInUse) {
        throw new HttpException('This title is already in use', 400);
      }
    }
    await this.testService.updateOneById(
      { title: req.body.title, description: req.body.description }, 
      test._id.toHexString()
    );
    return { message: 'The test has been updated successfully!' };
  }

  async addQuestion(req: express.Request<AddQuestionsParams, {}, AddQuestionDto>)
  : Promise<IMessage> {
    const test = await this.testService.getOneById(req.params.testId);
    if (!test) {
      throw new HttpException('The test was not found', 404);
    }
    const user = await this.userService.getOneUserByEmail(req.user.email);
    if (!this.testService.isUserTestCreator(test, user!)) {
      throw new HttpException('You cant add questions to this test', 403);
    }
    const testWithQuestion = 
      await this.testService.getOneByIdAndQuestionTitle(req.body.title, test._id.toHexString());
    if (testWithQuestion) {
      throw new HttpException('The test with this question title is already in use', 400);
    }
    const question = await this.testService.createQuestion({ title: req.body.title });
    const prepareAddQuestion = this.testService.prepareTestForAddQuestion(test._id, question._id);
    await this.testService.addQuestionToTest(prepareAddQuestion);
    return { message: 'The question has been added successfully!' };
  }

  async updateQuestion(req: express.Request<UpdateQuestionParams, {}, UpdateQuestionDto>)
  : Promise<IMessage> {
    const question = await this.testService.getOneQuestionById(req.params.questionId);
    if (!question) {
      throw new HttpException('The question was not found', 404);
    }
    const test = await this.testService.getOneByQuestionId(question._id.toHexString());
    const user = await this.userService.getOneUserByEmail(req.user.email);
    if (!this.testService.isUserTestCreator(test!, user!)) {
      throw new HttpException('You cant add options to this question', 403);
    }
    const questionWithTitle = 
      await this.testService.getOneQuestionByTitleAndTestId(req.body.title, test!._id.toHexString());
    if (questionWithTitle) {
      throw new HttpException('This title is already in use', 400);
    }
    await this.testService.updateOneQuestionById({ title: req.body.title }, question._id.toHexString());
    return { message: 'The question has been updated successfully!' };
  }

  async addOption(req: express.Request<AddOptionParams, {}, AddOptionDto>)
  : Promise<IMessage> {
    const question = await this.testService.getOneQuestionById(req.params.questionId);
    if (!question) {
      throw new HttpException('The question was not found', 404);
    }
    const test = await this.testService.getOneByQuestionId(question._id.toHexString());
    const user = await this.userService.getOneUserByEmail(req.user.email);
    if (!this.testService.isUserTestCreator(test!, user!)) {
      throw new HttpException('You cant add options to this question', 403);
    }
    const questionWithOption = 
      await this.testService.getOneQuestionByIdAndOptionTitle(
        question._id.toHexString(),
        req.body.text
      );
    if (questionWithOption) {
      throw new HttpException('The question with this option title is already in use', 400);
    }
    const option = await this.testService.createOption({ text: req.body.text });
    const prepareAddOption = 
      await this.testService.prepareQuestionForAddOption(
        question._id,
        option._id
      );
    await this.testService.addOptionToQuestion(prepareAddOption);
    return { message: 'The option has been added successfully!' };
  }

  async addAnswer(req: express.Request<AddAnswerParams, {}, AddAnswerDto>)
  : Promise<IMessage> {
    const question = await this.testService.getOneQuestionById(req.params.questionId);
    if (!question) {
      throw new HttpException('The question was not found', 404);
    }
    const test = await this.testService.getOneByQuestionId(question._id.toHexString());
    const user = await this.userService.getOneUserByEmail(req.user.email);
    if (!this.testService.isUserTestCreator(test!, user!)) {
      throw new HttpException('You cant add options to this question', 403);
    }
    const questionByOptionId = 
      await this.testService.getOneQuestionByIdAndOptionId(question._id.toHexString(), req.body.optionId);
    if (!questionByOptionId) {
      throw new HttpException('This option doesnt exist', 404);
    }
    const isAnswerInQuestion = this.testService.isAnswerInQuestion(question, req.body.optionId);
    if (isAnswerInQuestion) {
      throw new HttpException('This answer is already set', 400);
    }
    const prepareQuestion = 
      this.testService.prepareQuestionForAddAnswer(question._id, new ObjectId(req.body.optionId));
    await this.testService.addAnswerToQuestion(prepareQuestion);
    return { message: 'The answer has been added successfully!' };
  }

  async deleteAnswer(req: express.Request<DeleteAnswerParams>)
  : Promise<IMessage> {
    const answer = await this.testService.getOneOptionById(req.params.answerId);
    if (!answer) {
      throw new HttpException('The answer was not found', 404);
    }
    const question = await this.testService.getOneQuestionByAnswerId(answer._id.toHexString());
    if (!question) {
      throw new HttpException('The question with this option was not found', 404);
    }
    const test = await this.testService.getOneByQuestionId(question._id.toHexString());
    const user = await this.userService.getOneUserByEmail(req.user.email);
    if (!this.testService.isUserTestCreator(test!, user!)) {
      throw new HttpException('You cant delete this option', 403);
    }
    await this.testService.deleteOneAnswerByIdAndQuestionId(
      answer._id.toHexString(),
      question._id.toHexString()
    );
    return { message: 'The answer has been deleted successfully!' };
  }

  async deleteOption(req: express.Request<DeleteOptionParams>)
  : Promise<IMessage> {
    const option = await this.testService.getOneOptionById(req.params.optionId);
    if (!option) {
      throw new HttpException('The option was not found', 404);
    }
    const question = await this.testService.getOneQuestionByOptionId(option._id.toHexString());
    if (!question) {
      throw new HttpException('The question with this answer was not found', 404);
    }
    const test = await this.testService.getOneByQuestionId(question._id.toHexString());
    const user = await this.userService.getOneUserByEmail(req.user.email);
    if (!this.testService.isUserTestCreator(test!, user!)) {
      throw new HttpException('You cant delete this option', 403);
    }
    await this.testService.deleteOneOptionByIdAndQuestionId(
      option._id.toHexString(),
      question._id.toHexString()
    );
    return { message: 'The option has been deleted successfully!' };
  }

  async deleteQuestion(req: express.Request<DeleteQuestionParams>)
  : Promise<IMessage> {
    const question = await this.testService.getOneQuestionById(req.params.questionId);
    if (!question) {
      throw new HttpException('The question was not found', 404);
    }
    const test = await this.testService.getOneByQuestionId(question._id.toHexString());
    if (!test) {
      throw new HttpException('The test was not found', 404);
    }
    const user = await this.userService.getOneUserByEmail(req.user.email);
    if (!this.testService.isUserTestCreator(test, user!)) {
      throw new HttpException('You cant delete this question', 403);
    }
    await this.testService.deleteOneQuestionByIdAndTestId(
      question._id.toHexString(),
      test._id.toHexString()
    );
    return { message: 'The question has been deleted successfully!' };
  }

  async deleteTest(req: express.Request<DeleteTestParams>)
  : Promise<IMessage> {
    const test = await this.testService.getOneById(req.params.testId);
    if (!test) {
      throw new HttpException('The test was not found', 404);
    }
    const user = await this.userService.getOneUserByEmail(req.user.email);
    if (!this.testService.isUserTestCreator(test, user!)) {
      throw new HttpException('You cant delete this test', 403);
    }
    await this.testService.deleteOneById(test._id.toHexString());
    return { message: 'The test has been deleted successfully!' };
  }

  async passTest(req: express.Request<PassTestParams, {}, PassTestDto>)
  : Promise<IAssessment> {
    const test = await this.testService.getOneById(req.params.testId);
    if (!test) {
      throw new HttpException('The test was not found', 404);
    }
    if (this.testService.isTestEmpty(test)) {
      throw new HttpException('This test is empty', 400);
    }
    const user = await this.userService.getOneUserByEmail(req.user.email);
    return this.testService.generateAssessment(
      test._id.toHexString(),
      user!,
      req.body.answers,
      req.body.timer
    );
  }

  async getAssessment(req: express.Request<GetOneAssessmentParams>)
  : Promise<IAssessmentWithTestAndUser> {
    const assessment = await this.testService.getOneAssessmentById(
      req.params.assessmentId
    );
    if (!assessment) {
      throw new HttpException('The assessment was not found', 404);
    }
    const test = await this.testService.getOneById(assessment.test._id.toHexString());
    if (!test) {
      throw new HttpException('The test was not found', 404);
    }
    const user = await this.userService.getOneUserByEmail(req.user.email);
    if (!this.testService.isUserAssessmentCandidate(assessment.candidate._id, user!)) {
      throw new HttpException('You cant get this assessment', 403);
    }
    return assessment;
  }

  async getAssessments(req: express.Request<GetAssessmentsParams>)
  : Promise<IAssessment[]> {
    const test = await this.testService.getOneById(req.params.testId);
    if (!test) {
      throw new HttpException('The test was not found', 404);
    }
    const user = await this.userService.getOneUserByEmail(req.user.email);
    if (this.testService.isUserTestCreator(test, user!)) {
      return this.testService.getAssessmentsByTestId(test._id.toHexString());
    }
    return this.testService.getAssessmentsByTestIdAndUserId(
      test._id.toHexString(),
      user!._id.toHexString()
    );
  }
}

export default new TestController(
  new TestService(new TestRepository()),
  new UserService(new UserRepository())
);
