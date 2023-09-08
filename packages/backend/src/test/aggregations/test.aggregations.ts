import { ObjectId } from 'mongodb';

export const getAllTestsAgg = 
  () => (
    [
      {
        $lookup: {
          from: 'users',
          localField: 'createdBy',
          foreignField: '_id',
          as: 'createdBy'
        }
      },
      { $unwind: { path: '$createdBy' } },
      {
        $addFields: {
          createdBy: '$createdBy.email'
        }
      }
    ]
  );

export const getOneByIdAndQuestionTitleAgg =
  (questionTitle: string, testId: string) => (
    [
      {
        $match: {
          _id: new ObjectId(testId)
        }
      },
      {
        $lookup: {
          from: 'questions',
          localField: 'questions',
          foreignField: '_id',
          as: 'questions'
        }
      },
      { $unwind: { path: '$questions' } },
      {
        $match: {
          'questions.title': questionTitle
        }
      }
    ]
  );

export const getOneQuestionByTitleAndTestIdAgg = 
  (title: string, testId: string) => (
    [
      {
        $match: {
          _id: new ObjectId(testId)
        }
      },
      {
        $lookup: {
          from: 'questions',
          localField: 'questions',
          foreignField: '_id',
          as: 'questions'
        }
      },
      { $unwind: { path: '$questions' } },
      {
        $match: {
          'questions.title': title
        }
      }
    ]
  );

export const getOneTestWithOptionsByIdAgg = 
  (testId: string) => (
    [
      {
        $match: {
          _id: new ObjectId(testId)
        }
      },
      {
        $lookup: {
          from: 'questions',
          localField: 'questions',
          foreignField: '_id',
          as: 'questions'
        }
      },
      { 
        $unwind: { 
          path: '$questions',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $lookup: {
          from: 'options',
          localField: 'questions.options',
          foreignField: '_id',
          as: 'questions.options'
        }
      },
      { $unset: 'questions.answers' },
      {
        $project: {
          _id: 1,
          title: 1,
          description: 1,
          createdBy: 1,
          createdAt: 1,
          updatedAt: 1,
          questions: {
            $cond: {
              if: {
                $eq: [
                  {
                    $type: '$questions._id',
                  },
                  'missing',
                ],
              },
              then: '$empty',
              else: '$questions',
            },
          }
        }
      },
      {
        $group: {
          _id: '$_id',
          title: { $first: '$title' },
          description: { $first: '$description' },
          questions: { $push: '$questions' },
          createdBy: { $first: '$createdBy' },
          createdAt: { $first: '$createdAt' },
          updatedAt: { $first: '$updatedAt' }
        }
      },
      {
        $lookup: {
          from: 'users',
          localField: 'createdBy',
          foreignField: '_id',
          as: 'createdBy'
        }
      },
      { $unwind: { path: '$createdBy' } },
      {
        $addFields: {
          createdBy: '$createdBy.email'
        }
      }
    ]
  );

export const getOneTestForEditingByIdAgg = 
  (testId: string) => (
    [
      {
        $match: {
          _id: new ObjectId(testId)
        }
      },
      {
        $lookup: {
          from: 'questions',
          localField: 'questions',
          foreignField: '_id',
          as: 'questions'
        }
      },
      {
        $unwind: {
          path: '$questions',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $lookup: {
          from: 'options',
          localField: 'questions.options',
          foreignField: '_id',
          as: 'questions.options'
        }
      },
      {
        $addFields: {
          'questions.options': {
            $map: {
              input: '$questions.options',
              as: 'option',
              in: {
                $mergeObjects: [
                  '$$option',
                  {
                    isAnswer: {
                      $in: [
                        '$$option._id',
                        '$questions.answers'
                      ]
                    }
                  }
                ]
              }
            }
          }
        }
      },
      { $unset: 'questions.answers' },
      {
        $project: {
          _id: 1,
          title: 1,
          description: 1,
          createdBy: 1,
          createdAt: 1,
          updatedAt: 1,
          questions: {
            $cond: {
              if: {
                $eq: [
                  { $type: '$questions._id' },
                  'missing'
                ]
              },
              then: '$empty',
              else: '$questions'
            }
          }
        }
      },
      {
        $group: {
          _id: '$_id',
          title: { $first: '$title' },
          description: { $first: '$description' },
          questions: { $push: '$questions' },
          createdBy: { $first: '$createdBy' },
          createdAt: { $first: '$createdAt' },
          updatedAt: { $first: '$updatedAt' }
        }
      },
      {
        $lookup: {
          from: 'users',
          localField: 'createdBy',
          foreignField: '_id',
          as: 'createdBy'
        }
      },
      { $unwind: { path: '$createdBy' } }
    ]
  );

export const getTestWithQuestionOptionsAndAnswersIdsAgg =
  (testId: string) => (
    [
      {
        $match: {
          _id: new ObjectId(testId)
        }
      },
      {
        $lookup: {
          from: 'questions',
          localField: 'questions',
          foreignField: '_id',
          as: 'questions'
        }
      }
    ]
  );
