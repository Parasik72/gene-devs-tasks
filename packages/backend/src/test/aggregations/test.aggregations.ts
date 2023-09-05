import { ObjectId } from 'mongodb';

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

export const getOneTestByIdAgg = 
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
      { $unwind: { path: '$questions' } },
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
        $group: {
          _id: '$_id',
          title: { $first: '$title' },
          description: { $first: '$description' },
          questions: { $push: '$questions' },
          createdBy: { $first: '$createdBy' },
          createdAt: { $first: '$createdAt' },
          updatedAt: { $first: '$updatedAt' }
        }
      }
    ]
  );
