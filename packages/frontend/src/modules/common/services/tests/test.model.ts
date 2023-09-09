import { TestForEditReceivingDto, TestForPassingReceivingDto, TestsReceivingDto } from './dto/tests-from-server.dto';

export interface IQuestionType {
  _id: string;
  text: string;
}

export interface IOption {
  _id: string;
  text: string;
  isAnswer?: boolean;
}

export interface IQuestion {
  _id: string;
  title: string;
  options: IOption[];
  questionType: IQuestionType;
  image: string | null
}

class TestModel {
  constructor(
    public _id: string,
    public title: string,
    public description: string,
    public questions: IQuestion[] | string[],
    public createdBy: string,
    public createdAt: Date,
    public updatedAt: Date
  ) {
    // empty
  }
}

const createTestModel = (
  testFromServer: TestsReceivingDto | TestForEditReceivingDto | TestForPassingReceivingDto
) =>
  new TestModel(
    testFromServer._id,
    testFromServer.title,
    testFromServer.description,
    testFromServer.questions,
    testFromServer.createdBy,
    testFromServer.createdAt,
    testFromServer.updatedAt
  );

export { createTestModel };

export default TestModel;
