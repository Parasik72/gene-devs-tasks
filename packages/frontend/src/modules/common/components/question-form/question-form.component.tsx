import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { FormikFormComponent } from '../formik-form/formik-form.component';
import { FormikFormInputComponent } from '../formik-form-input/formik-form-input.component';
import { FormikFormInputTypes } from '../formik-form-input/formik-form-input.types';
import { IQuestionFormComponent, QuestionFormActions, QuestionFormType } from './question-form.types';
import { SPACESNUMBER } from '../../../theme/spaces.const';

export function QuestionFormComponent<T extends QuestionFormType>({
  data,
  onSubmit,
  validate,
  onFileUpload,
  isFileUploaded,
  hasImage
}: IQuestionFormComponent<T>) {
  return (
    <Box>
      <FormikFormComponent
        initialValues={data.initialValues}
        onSubmit={onSubmit}
        validate={validate}
        secondBtn={{
          show: false,
          text: '',
          onClick: () => {
            // emtpy
          }
        }}
      >
        <FormikFormInputComponent
          title="Title"
          htmlFor="title"
          name="title"
          id="title"
          placeholder="Enter title"
          type={FormikFormInputTypes.text}
        />
        {data.type === QuestionFormActions.EDITING && hasImage && (
          <FormikFormInputComponent
            title="Remove current image"
            htmlFor="removeImage"
            name="removeImage"
            id="removeImage"
            placeholder=""
            type={FormikFormInputTypes.checkbox}
          />
        )}
        <Box display='flex' gap={SPACESNUMBER.s} mb={SPACESNUMBER.xxs}>
          <Typography variant='h6'>Image </Typography>
          <Button
            variant="contained"
            component="label"
            color={isFileUploaded ? 'success' : 'warning'}
          >
            {isFileUploaded ? 'Image uploaded' : 'Upload Image' }
            <input
              type="file"
              onChange={onFileUpload}
              accept=".jpg, .jpeg, .png"
              hidden
            />
          </Button>
        </Box>
      </FormikFormComponent>
    </Box>
  );
}
