export const STORAGE_KEYS = {
  TOKEN: 'TOKEN'
};

export const QUERY_KEYS = {
  USER: 'USER',
  TESTS: 'TESTS',
  EDIT_TEST: 'EDIT_TEST',
};

export const BACKEND_KEYS = {
  REGISTRATION: 'user/register',
  LOGIN: 'user/login',
  CHECK_AUTH: 'user/auth',
  TESTS: 'tests/all',
  CREATE_TEST: 'tests/create',
  UPDATE_TEST: 'tests/update/:testId',
  EDIT_TEST: 'tests/edit/:testId',
  ADD_ANSWER: 'tests/add-answer/:questionId',
  REMOVE_ANSWER: 'tests/delete-answer/:answerId',
  ADD_QUESTION: 'tests/add-question/:testId',
  ADD_OPTION: 'tests/add-option/:questionId',
  UPDATE_QUESTION: 'tests/update-question/:questionId',
  REMOVE_OPTION: 'tests/delete-option/:optionId',
  REMOVE_QUESTION: 'tests/delete-question/:questionId',
  REMOVE_TEST: 'tests/delete/:testId',
};

export const ROUTER_KEYS = {
  ROOT: '/',
  REGISTRATION: '/auth/registration',
  LOGIN: '/auth/login',
  EDIT_TEST: '/edit-test/:testId'
};

export const HISTORY_KEYS = {
  ROOT: '/',
  REGISTRATION: '/auth/registration',
  LOGIN: '/auth/login',
  EDIT_TEST: '/edit-test/:testId'
};
