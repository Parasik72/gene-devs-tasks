import { useMutation, useQueryClient } from 'react-query';
import { 
  AddAnswerSending, 
  AddOptionSending, 
  AddQuestionSending, 
  ITestCreationSending, 
  ITestUpdateSending, 
  RemoveAnswerSending, 
  RemoveOptionSending, 
  RemoveQuestionSending,
  RemoveTestSending, 
  SubmitTestSending, 
  UpdateQuestionSending 
} from './tests.mutation.types';
import { testsService } from '../../services/tests/tests.service';
import { AssessmentReceivingDto, TestsReceivingDto } from '../../services/tests/dto/tests-from-server.dto';
import { QUERY_KEYS } from '../../constants/app-keys.constants';
import { onErrorAlert } from '../on-error.alert';

export const useCreateTest = (callback?: () => void) => {
  const queryClient = useQueryClient();
  const creationFunc = (dto: ITestCreationSending) => testsService.createTest(dto.data);
  const onSuccess = (data: TestsReceivingDto) => {
    queryClient.invalidateQueries([QUERY_KEYS.TESTS]);
    if (callback) callback();
  };
  return useMutation(creationFunc, { onSuccess, onError: onErrorAlert });
};

export const useEditTest = (callback?: () => void) => {
  const queryClient = useQueryClient();
  const updatingFunc = (dto: ITestUpdateSending) => testsService.updateTest(dto.testId, dto.data);
  const onSuccess = () => {
    queryClient.invalidateQueries([QUERY_KEYS.EDIT_TEST]);
    if (callback) callback();
  };
  return useMutation(updatingFunc, { onSuccess, onError: onErrorAlert });
};

export const useAddAnswer = (callback?: () => void) => {
  const addAnswerFunc = (dto: AddAnswerSending) => 
    testsService.addAnswer(dto.questionId, { optionId: dto.optionId });
  const onSuccess = () => {
    if (callback) callback();
  };
  return useMutation(addAnswerFunc, { onSuccess, onError: onErrorAlert });
};

export const useRemoveAnswer = (callback?: () => void) => {
  const removeAnswerFunc = (dto: RemoveAnswerSending) => 
    testsService.removeAnswer(dto.answerId);
  const onSuccess = () => {
    if (callback) callback();
  };
  return useMutation(removeAnswerFunc, { onSuccess, onError: onErrorAlert });
};

export const useAddQuestion = (callback?: () => void) => {
  const queryClient = useQueryClient();
  const addQuestionFunc = (dto: AddQuestionSending) => 
    testsService.addQuestion(dto.testId, { title: dto.title });
  const onSuccess = () => {
    queryClient.invalidateQueries([QUERY_KEYS.EDIT_TEST]);
    if (callback) callback();
  };
  return useMutation(addQuestionFunc, { onSuccess, onError: onErrorAlert });
};

export const useUpdateQuestion = (callback?: () => void) => {
  const queryClient = useQueryClient();
  const updateQuestionFunc = (dto: UpdateQuestionSending) => 
    testsService.updateQuestion(dto.questionId, { title: dto.title });
  const onSuccess = () => {
    queryClient.invalidateQueries([QUERY_KEYS.EDIT_TEST]);
    if (callback) callback();
  };
  return useMutation(updateQuestionFunc, { onSuccess, onError: onErrorAlert });
};

export const useAddOption = (callback?: () => void) => {
  const queryClient = useQueryClient();
  const addOptionFunc = (dto: AddOptionSending) => 
    testsService.addOption(dto.questionId, { text: dto.text });
  const onSuccess = () => {
    queryClient.invalidateQueries([QUERY_KEYS.EDIT_TEST]);
    if (callback) callback();
  };
  return useMutation(addOptionFunc, { onSuccess, onError: onErrorAlert });
};

export const useRemoveOption = (callback?: () => void) => {
  const queryClient = useQueryClient();
  const removeOptionFunc = (dto: RemoveOptionSending) => 
    testsService.removeOption(dto.optionId);
  const onSuccess = () => {
    queryClient.invalidateQueries([QUERY_KEYS.EDIT_TEST]);
    if (callback) callback();
  };
  return useMutation(removeOptionFunc, { onSuccess, onError: onErrorAlert });
};

export const useRemoveQuestion = (callback?: () => void) => {
  const queryClient = useQueryClient();
  const removeQuestionFunc = (dto: RemoveQuestionSending) => 
    testsService.removeQuestion(dto.questionId);
  const onSuccess = () => {
    queryClient.invalidateQueries([QUERY_KEYS.EDIT_TEST]);
    if (callback) callback();
  };
  return useMutation(removeQuestionFunc, { onSuccess, onError: onErrorAlert });
};

export const useRemoveTest = (callback?: () => void) => {
  const queryClient = useQueryClient();
  const removeTestFunc = (dto: RemoveTestSending) => 
    testsService.removeTest(dto.testId);
  const onSuccess = () => {
    queryClient.invalidateQueries([QUERY_KEYS.TESTS]);
    if (callback) callback();
  };
  return useMutation(removeTestFunc, { onSuccess, onError: onErrorAlert });
};

export const useSubmitTest = (callback?: (assessmentId: string) => void) => {
  const submitTestFunc = (dto: SubmitTestSending) => 
    testsService.submitTest(dto.testId, { answers: dto.answers });
  const onSuccess = (data: AssessmentReceivingDto) => {
    if (callback) callback(data._id);
  };
  return useMutation(submitTestFunc, { onSuccess, onError: onErrorAlert });
};
