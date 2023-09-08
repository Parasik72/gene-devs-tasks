import UserModel from '../user/user.model';
import { AssessmentReceivingDto } from './dto/tests-from-server.dto';
import TestModel from './test.model';

class AssessmentModel {
  constructor(
    public _id: string,
    public test: string | TestModel,
    public candidate: string | UserModel,
    public score: number,
    public createdAt: string,
    public updatedAt: string
  ) {}
}

const createAssessmentModel = (
  assessmentFromServer: AssessmentReceivingDto
) =>
  new AssessmentModel(
    assessmentFromServer._id,
    assessmentFromServer.test, 
    assessmentFromServer.candidate,
    assessmentFromServer.score,
    assessmentFromServer.createdAt,
    assessmentFromServer.updatedAt
  );

export { createAssessmentModel };

export default AssessmentModel;
