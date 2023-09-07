import { AxiosResponse } from 'axios';
import { HttpService } from '../http';
import { BACKEND_KEYS } from '../../constants/app-keys.constants';
import { FullTestReceivingDto, TestsReceivingDto } from './dto/tests-from-server.dto';
import TestModel, { createTestModel } from './test.model';
import { CreateTestDto } from './dto/create-test.dto';
import { AddAnswerDto } from './dto/add-answer.dto';
import { IMessageFromServer } from '../http.interfaces';
import { AddQuestionDto } from './dto/add-question.dto';
import { UpdateTestDto } from './dto/update-test.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { AddOptionDto } from './dto/add-option.dto';

class TestsService {
  constructor(private httpService: HttpService) {}

  async getAllTests(): Promise<TestModel[]> {
    const response: AxiosResponse<TestsReceivingDto[]> = await this.httpService.get({
      url: BACKEND_KEYS.TESTS
    }, false);
    return response.data.map((test) => createTestModel(test));
  }

  async createTest(dto: CreateTestDto): Promise<TestsReceivingDto> {
    const response: AxiosResponse<TestsReceivingDto> = await this.httpService.create({
      url: BACKEND_KEYS.CREATE_TEST,
      data: dto
    }, true);
    return response.data;
  }

  async updateTest(testId: string, dto: UpdateTestDto): Promise<IMessageFromServer> {
    const response: AxiosResponse<IMessageFromServer> = await this.httpService.patch({
      url: BACKEND_KEYS.UPDATE_TEST.replace(':testId', testId),
      data: dto
    }, true);
    return response.data;
  }

  async getFullTest(testId: string): Promise<TestModel> {
    const response: AxiosResponse<FullTestReceivingDto> = await this.httpService.get({
      url: BACKEND_KEYS.EDIT_TEST.replace(':testId', testId)
    }, true);
    return createTestModel(response.data);
  }

  async addAnswer(questionId: string, dto: AddAnswerDto): Promise<IMessageFromServer> {
    const response: AxiosResponse<IMessageFromServer> = await this.httpService.create({
      url: BACKEND_KEYS.ADD_ANSWER.replace(':questionId', questionId),
      data: dto
    }, true);
    return response.data;
  }

  async removeAnswer(answerId: string): Promise<IMessageFromServer> {
    const response: AxiosResponse<IMessageFromServer> = await this.httpService.delete({
      url: BACKEND_KEYS.REMOVE_ANSWER.replace(':answerId', answerId)
    }, true);
    return response.data;
  }

  async addQuestion(testId: string, dto: AddQuestionDto): Promise<IMessageFromServer> {
    const response: AxiosResponse<IMessageFromServer> = await this.httpService.create({
      url: BACKEND_KEYS.ADD_QUESTION.replace(':testId', testId),
      data: dto
    }, true);
    return response.data;
  }

  async updateQuestion(questionId: string, dto: UpdateQuestionDto): Promise<IMessageFromServer> {
    const response: AxiosResponse<IMessageFromServer> = await this.httpService.patch({
      url: BACKEND_KEYS.UPDATE_QUESTION.replace(':questionId', questionId),
      data: dto
    }, true);
    return response.data;
  }

  async addOption(questionId: string, dto: AddOptionDto): Promise<IMessageFromServer> {
    const response: AxiosResponse<IMessageFromServer> = await this.httpService.create({
      url: BACKEND_KEYS.ADD_OPTION.replace(':questionId', questionId),
      data: dto
    }, true);
    return response.data;
  }

  async removeOption(optionId: string): Promise<IMessageFromServer> {
    const response: AxiosResponse<IMessageFromServer> = await this.httpService.delete({
      url: BACKEND_KEYS.REMOVE_OPTION.replace(':optionId', optionId)
    }, true);
    return response.data;
  }

  async removeQuestion(questionId: string): Promise<IMessageFromServer> {
    const response: AxiosResponse<IMessageFromServer> = await this.httpService.delete({
      url: BACKEND_KEYS.REMOVE_QUESTION.replace(':questionId', questionId)
    }, true);
    return response.data;
  }

  async removeTest(testId: string): Promise<IMessageFromServer> {
    const response: AxiosResponse<IMessageFromServer> = await this.httpService.delete({
      url: BACKEND_KEYS.REMOVE_TEST.replace(':testId', testId)
    }, true);
    return response.data;
  }
}

export const testsService = new TestsService(new HttpService());
