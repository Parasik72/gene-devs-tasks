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
import { updateTestValidator } from './validators/update-test.validator';
import { updateQuestionValidator } from './validators/update-question.validator';
import { getOneTestByIdValidator } from './validators/get-one-test-by-id.validator';
import { addAnswerValidator } from './validators/add-answer.validator';
import { deleteAnswerValidator } from './validators/delete-answer.validator';
import { passTestValidator } from './validators/pass-test.validator';
import { getAssessmentsValidator } from './validators/get-assessments.validator';
import { getOneFullTestByIdValidator } from './validators/get-one-full-test-by-id.validator';
import { getAssessmentValidator } from './validators/get-assessment.validator';
import { changeQuestionTypeValidator } from './validators/change-question-type.validator';

const testsRouter = express();

testsRouter.get(
  '/all',
  tryCatchController(testController.getAllTests.bind(testController))
);

testsRouter.get(
  '/assessment/:assessmentId',
  isLogedIn,
  getAssessmentValidator,
  tryCatchController(testController.getAssessment.bind(testController))
);

testsRouter.get(
  '/assessments/:testId',
  isLogedIn,
  getAssessmentsValidator,
  tryCatchController(testController.getAssessments.bind(testController))
);

testsRouter.get(
  '/edit/:testId',
  isLogedIn,
  getOneFullTestByIdValidator,
  tryCatchController(testController.getOneTestForEditingByIdAgg.bind(testController))
);

testsRouter.get(
  '/question-types',
  isLogedIn,
  tryCatchController(testController.getAllQuestionTypes.bind(testController))
);

testsRouter.get(
  '/:testId',
  isLogedIn,
  getOneTestByIdValidator,
  tryCatchController(testController.getOneTestWithOptionsById.bind(testController))
);

testsRouter.post(
  '/create',
  isLogedIn,
  createTestValidator,
  validateRequest,
  tryCatchController(testController.createTest.bind(testController), 201)
);

testsRouter.patch(
  '/update/:testId',
  isLogedIn,
  updateTestValidator,
  validateRequest,
  tryCatchController(testController.updateTest.bind(testController))
);

testsRouter.post(
  '/add-question/:testId',
  isLogedIn,
  addQuestionToTestValidator,
  validateRequest,
  tryCatchController(testController.addQuestion.bind(testController), 201)
);

testsRouter.patch(
  '/update-question/:questionId',
  isLogedIn,
  updateQuestionValidator,
  validateRequest,
  tryCatchController(testController.updateQuestion.bind(testController))
);

testsRouter.patch(
  '/change-question-type/:questionId',
  isLogedIn,
  changeQuestionTypeValidator,
  validateRequest,
  tryCatchController(testController.changeQuestionType.bind(testController))
);

testsRouter.post(
  '/add-option/:questionId',
  isLogedIn,
  addOptionValidator,
  validateRequest,
  tryCatchController(testController.addOption.bind(testController), 201)
);

testsRouter.post(
  '/add-answer/:questionId',
  isLogedIn,
  addAnswerValidator,
  tryCatchController(testController.addAnswer.bind(testController), 201)
);

testsRouter.post(
  '/pass-test/:testId',
  isLogedIn,
  passTestValidator,
  validateRequest,
  tryCatchController(testController.passTest.bind(testController), 201)
);

testsRouter.delete(
  '/delete-answer/:answerId',
  isLogedIn,
  deleteAnswerValidator,
  tryCatchController(testController.deleteAnswer.bind(testController))
);

testsRouter.delete(
  '/delete-question/:questionId',
  isLogedIn,
  deleteQuestionValidator,
  tryCatchController(testController.deleteQuestion.bind(testController))
);

testsRouter.delete(
  '/delete-option/:optionId',
  isLogedIn,
  deleteOptionValidator,
  tryCatchController(testController.deleteOption.bind(testController))
);

testsRouter.delete(
  '/delete/:testId',
  isLogedIn,
  deleteTestValidator,
  tryCatchController(testController.deleteTest.bind(testController))
);

export default testsRouter;
