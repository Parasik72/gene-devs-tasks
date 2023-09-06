import React from 'react';
import { Form, Formik } from 'formik';
import { Button, Grid } from '@mui/material';
import { IFormikForm } from './formik-form.interfaces';
import { SIZESNUMBER } from '../../../theme/sizes.const';
import { SPACES } from '../../../theme/spaces.const';

export function FormikFormComponent<T extends Object>({
  initialValues,
  onSubmit,
  validate,
  secondBtn,
  children
}: IFormikForm<T>) {
  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit} validate={validate}>
      <Form>
        <>{children}</>
        <Grid container spacing={SPACES.s}>
          <Grid item xs={secondBtn.show ? SIZESNUMBER.l : SIZESNUMBER.xxl}>
            <Button type="submit" variant="contained" fullWidth>
              Submit
            </Button>
          </Grid>
          {secondBtn.show && (
            <Grid item xs={SIZESNUMBER.l}>
              <Button variant="contained" onClick={secondBtn.onClick} fullWidth>
                {secondBtn.text}
              </Button>
            </Grid>
          )}
        </Grid>
      </Form>
    </Formik>
  );
}
