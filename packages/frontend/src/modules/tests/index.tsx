import React, { useState } from 'react';
import { Box, Button, Paper, Typography } from '@mui/material';
import { SPACES } from '../theme/spaces.const';
import { useGetTests } from '../common/queries/tests.query';
import { useQueryClient } from 'react-query';
import UserModel from '../common/services/user/user.model';
import { QUERY_KEYS } from '../common/constants/app-keys.constants';
import { Popup } from '../common/popup/popup.component';
import { TestFormComponent } from '../common/components/test-form/test-form.component';
import { ITestFormCreation, TestFormActions } from '../common/components/test-form/test-form.types';
import { testCreationFormInitialVariables } from '../common/components/test-form/test-form.constants';
import { useCreateTest } from '../common/mutations/tests/tests.mutation';
import { testFormValidate } from '../common/validators/test.validator';
import { MainLayoutComponent } from '../common/components/main-layout/main-layout.component';
import { TestListItemComponent } from '../common/components/test-list-item/test-list-item.component';
import { LoaderComponent } from '../common/components/loader/loader.component';
import { WEIGHTS } from '../theme/fonts.const';

export const TestsPageComponent = () => {
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData<UserModel>(QUERY_KEYS.USER);
  const { data, isLoading } = useGetTests();
  const [isTestCreationOpen, setIsTestCreationOpen] = useState(false);

  const onTestCreationClick = () => setIsTestCreationOpen(true);
  const closePopup = () => setIsTestCreationOpen(false);

  const mutation = useCreateTest(closePopup);
  const onSubmit = async (values: ITestFormCreation) => {
    mutation.mutate({ data: values });
  };

  return (
    <MainLayoutComponent>
      <Paper sx={{
        marginTop: SPACES.xxl,
      }}>
        <Box
          padding={SPACES.m}
          display='flex'
          justifyContent='space-between'
          flexDirection={{ sm: 'row', xs: 'column' }}
          gap={SPACES.m}
          zIndex={1}
        >
          <Typography 
            variant='h4' 
            alignSelf={{ sm: 'start', xs: 'center' }}
          >
            All the tests
          </Typography>
          {user && user.isAuth && (
            <Button variant='contained' onClick={onTestCreationClick}>
              Create test
            </Button>
          )}
        </Box>
      </Paper>
      {isLoading && (
        <LoaderComponent />
      )}
      {!isLoading && data && data.length !== 0 && (
        <Box marginTop={SPACES.xl} display="flex" flexDirection="column" gap={SPACES.m}>
          {data.map((test, index) => <TestListItemComponent key={index} test={test}/>)}
        </Box>
      )}
      {!isLoading && data && data.length === 0 && (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          position="absolute"
          width="100%"
          height="100%"
        >
          <Typography variant='h3' fontWeight={WEIGHTS.bold}>There are no any tests</Typography>
        </Box>
      )}
      <Popup 
        isOpen={isTestCreationOpen} 
        close={closePopup}
        title='Test creation'
        width={500}
      >
        <TestFormComponent 
          data={{
            type: TestFormActions.CREATION,
            initialValues: testCreationFormInitialVariables()
          }}
          onSubmit={onSubmit}
          validate={testFormValidate}
        />
      </Popup>
    </MainLayoutComponent>
  );
};
