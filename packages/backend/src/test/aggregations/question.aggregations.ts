import { ObjectId } from 'mongodb';

export const getOneQuestionByIdAndOptionTitleAgg = 
  (questionId: string, optionTitle: string) => (
    [
      {
        $match: {
          _id: new ObjectId(questionId)
        }
      },
      {
        $lookup: {
          from: 'options',
          localField: 'options',
          foreignField: '_id',
          as: 'options'
        }
      },
      { $unwind: { path: '$options' } },
      {
        $match: {
          'options.text': optionTitle
        }
      }
    ]
  );
