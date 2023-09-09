export interface IAddOptionComponent {
  questionId: string;
  testId: string;
  callback?: () => void;
}

export interface IAddOptionFormCreation {
  text: string;
}
