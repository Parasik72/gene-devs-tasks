export interface ITestPassingParams {
  [key: string]: string;
  testId: string;
}

export interface ITestAnswer {
  questionId: string;
  selected: string[];
}

export interface ITestData {
  answers: ITestAnswer[];
}
