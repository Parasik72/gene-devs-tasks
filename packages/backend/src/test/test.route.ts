import express from 'express';
import { addQuestionToTestValidator, createTestValidator } from './validators/create-test.validator';
import { validateRequest } from '../middlewares/validate-request.middleware';
import { tryCatchController } from '../middlewares/try-catch-controller.middleware';
import testController from './test.controller';
import { isLogedIn } from '../middlewares/is-loged-in.middleware';

const testsRouter = express();

testsRouter.post(
  '/create',
  isLogedIn,
  createTestValidator,
  validateRequest,
  tryCatchController(testController.createTest.bind(testController), 201)
);

testsRouter.post(
  '/add-question/:testId',
  isLogedIn,
  addQuestionToTestValidator,
  validateRequest,
  tryCatchController(testController.addQuestion.bind(testController), 201)
);

export default testsRouter;
