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
      { $unset: 'candidate.password' },
      {
        $lookup: {
          from: 'tests',
          localField: 'test',
          foreignField: '_id',
          as: 'test'
        }
      },
      { $unwind: { path: '$test' } },
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
      { $unset: 'candidate.password' },
      {
        $lookup: {
          from: 'tests',
          localField: 'test',
          foreignField: '_id',
          as: 'test'
        }
      },
      { $unwind: { path: '$test' } }
    ]
  );

export const getAssessmentByIdAgg =
  (assessmentId: string) => (
    [
      {
        $match: {
          _id: new ObjectId(assessmentId)
        }
      },
      {
        $lookup: {
          from: 'tests',
          localField: 'test',
          foreignField: '_id',
          as: 'test'
        }
      },
      { $unwind: { path: '$test' } },
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
