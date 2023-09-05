import { ObjectId } from 'mongodb';

export const getAssessmentByTestIdAgg =
  (testId: string) => (
    [
      {
        $match: {
          test: new ObjectId(
            testId
          )
        }
      },
      {
        $lookup: {
          from: 'users',
          localField: 'candidate',
          foreignField: '_id',
          as: 'candidate'
        }
      },
      { $unwind: { path: '$candidate' } },
      { $unset: 'candidate.password' }
    ]
  );

export const getAssessmentByTestIdAndUserIdAgg =
  (testId: string, userId: string) => (
    [
      {
        $match: {
          test: new ObjectId(
            testId
          ),
          candidate: new ObjectId(
            userId
          )
        }
      },
      {
        $lookup: {
          from: 'users',
          localField: 'candidate',
          foreignField: '_id',
          as: 'candidate'
        }
      },
      { $unwind: { path: '$candidate' } },
      { $unset: 'candidate.password' }
    ]
  );
