import express from 'express';
import { TestService } from './test.service';
import { TestRepository } from './test.repository';
import { CreateTestDto } from './dto/create-test.dto';
import { HttpException } from '../exceptions/http.exception';
import { UserService } from '../user/user.service';
import { UserRepository } from '../user/user.repository';
import { AddQuestionDto } from './dto/add-question.dto';
import { AddQuestionsParams } from './params/add-questions.params';

class TestController {
  constructor(
    private readonly testService: TestService,
    private readonly userService: UserService
  ) {}

  async createTest(req: express.Request<{}, {}, CreateTestDto>) {
    const user = await this.userService.getOneUserByEmail(req.user.email);
    const { title, description } = req.body;
    const titleInUse = await this.testService.getOneByTitle(title);
    if (titleInUse) {
      throw new HttpException('This title is already in use', 400);
    }
    return this.testService.createTest({ title, description, createdBy: user!._id });
  }

  async addQuestion(req: express.Request<AddQuestionsParams, {}, AddQuestionDto>) {
    const test = await this.testService.getOneById(req.params.testId);
    if (!test) {
      throw new HttpException('The test was not found', 404);
    }
    const prepareOptions = this.testService.prepareOptionsForCreation(req.body.options);
    const { options, answers } = await this.testService.createOptions(prepareOptions, req.body.answers);
    const prepareQuestion = this.testService
      .prepareQuestionForCreation({ title: req.body.title, options, answers });
    const questionId = await this.testService.createQuestion(prepareQuestion);
    const prepareAddQuestion = this.testService.prepareTestForAddQuestion(test._id, questionId);
    await this.testService.addQuestionToTest(prepareAddQuestion);
    return { message: 'The question has been added successfully!' };
  }
}

export default new TestController(
  new TestService(new TestRepository()),
  new UserService(new UserRepository())
);
