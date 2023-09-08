import { ITestData } from './passing-test.types';

export const storeTestData = (
  testData: ITestData, 
  setTestData: (value: React.SetStateAction<ITestData>) => void
) =>
  (questionId: string, optionId: string, toAdd: boolean) => {
    const answer = testData.answers.find((item) => item.questionId === questionId);
    if (!answer && toAdd) {
      return setTestData((prev) => ({
        answers: [
          ...prev.answers,
          { questionId, selected: [optionId] }
        ]
      }));
    } else if (!answer) return;
    if (toAdd) {
      return setTestData((prev) => ({
        answers: prev.answers.map((item) => item.questionId === answer.questionId
          ? { 
            ...item, 
            selected: [...item.selected, optionId] 
          }
          : item)}));
    }
    return setTestData((prev) => ({
      answers: prev.answers.map((item) => item.questionId === answer.questionId
        ? { 
          ...item, 
          selected: answer.selected.filter((item) => item !== optionId)
        }
        : item
      )}));
  };
