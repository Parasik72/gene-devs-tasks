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
    const testWithQuestion = 
      await this.testService.getOneByIdAndQuestionTitle(req.body.title, test._id.toHexString());
    if (testWithQuestion) {
      throw new HttpException('The test with this question title is already in use', 400);
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

  async addOption(req: express.Request<AddOptionParams, {}, AddOptionDto>) {
    const question = await this.testService.getOneQuestionById(req.params.questionId);
    if (!question) {
      throw new HttpException('The question was not found', 404);
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

  async deleteOption(req: express.Request<DeleteOptionParams>) {
    const option = await this.testService.getOneOptionById(req.params.optionId);
    if (!option) {
      throw new HttpException('The option was not found', 404);
    }
    const question = await this.testService.getOneQuestionByOptionId(option._id.toHexString());
    if (!question) {
      throw new HttpException('The question was not found', 404);
    }
    await this.testService.deleteOneOptionByIdAndQuestionId(
      option._id.toHexString(),
      question._id.toHexString()
    );
    return { message: 'The option has been deleted successfully!' };
  }

  async deleteQuestion(req: express.Request<DeleteQuestionParams>) {
    const question = await this.testService.getOneQuestionById(req.params.questionId);
    if (!question) {
      throw new HttpException('The question was not found', 404);
    }
    const test = await this.testService.getOneByQuestionId(question._id.toHexString());
    if (!test) {
      throw new HttpException('The test was not found', 404);
    }
    await this.testService.deleteOneQuestionByIdAndTestId(
      question._id.toHexString(),
      test._id.toHexString()
    );
    return { message: 'The question has been deleted successfully!' };
  }

  async deleteTest(req: express.Request<DeleteTestParams>) {
    const test = await this.testService.getOneById(req.params.testId);
    if (!test) {
      throw new HttpException('The test was not found', 404);
    }
    await this.testService.deleteOneById(test._id.toHexString());
    return { message: 'The test has been deleted successfully!' };
  }
}

export default new TestController(
  new TestService(new TestRepository()),
  new UserService(new UserRepository())
);
