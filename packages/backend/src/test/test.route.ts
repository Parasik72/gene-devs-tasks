import express from 'express';
import { createTestValidator } from './validators/create-test.validator';
import { validateRequest } from '../middlewares/validate-request.middleware';
import { tryCatchController } from '../middlewares/try-catch-controller.middleware';
import testController from './test.controller';
import { isLogedIn } from '../middlewares/is-loged-in.middleware';
import { deleteTestValidator } from './validators/delete-test.validator';
import { deleteQuestionValidator } from './validators/delete-question.validator';
import { addOptionValidator } from './validators/add-option.validator';
import { deleteOptionValidator } from './validators/delete-option.validator';
import { addQuestionToTestValidator } from './validators/add-question-to-test.validator';

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

testsRouter.post(
  '/add-option/:questionId',
  isLogedIn,
  addOptionValidator,
  validateRequest,
  tryCatchController(testController.addOption.bind(testController), 201)
);

testsRouter.delete(
  '/delete-question/:questionId',
  isLogedIn,
  deleteQuestionValidator,
  tryCatchController(testController.deleteQuestion.bind(testController), 200)
);

testsRouter.delete(
  '/delete-option/:optionId',
  isLogedIn,
  deleteOptionValidator,
  tryCatchController(testController.deleteOption.bind(testController), 200)
);

testsRouter.delete(
  '/delete/:testId',
  isLogedIn,
  deleteTestValidator,
  tryCatchController(testController.deleteTest.bind(testController), 200)
);

export default testsRouter;
