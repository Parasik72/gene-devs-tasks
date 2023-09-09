import { ITestData } from './passing-test.types';

export enum StoreDataAction {
  TO_ADD,
  TO_REMOVE,
  SET
}

export const storeTestData = (
  testData: ITestData, 
  setTestData: (value: React.SetStateAction<ITestData>) => void
) =>
  (questionId: string, optionId: string, action: StoreDataAction) => {
    const answer = testData.answers.find((item) => item.questionId === questionId);
    if (!answer && (action === StoreDataAction.TO_ADD || StoreDataAction.SET)) {
      return setTestData((prev) => ({
        answers: [
          ...prev.answers,
          { questionId, selected: [optionId] }
        ]
      }));
    } else if (!answer) return;
    return setTestData((prev) => ({
      answers: prev.answers.map((item) => item.questionId === answer.questionId
        ? { 
          ...item, 
          selected: 
            action === StoreDataAction.TO_REMOVE ? answer.selected.filter((item) => item !== optionId)
              : action === StoreDataAction.TO_ADD ? [...item.selected, optionId] : [optionId] 
        }
        : item
      )}));
  };

export const getAtLeastOneSelected = (testData: ITestData) => 
  testData.answers.find((answer) => answer.selected.length > 0) !== undefined;
