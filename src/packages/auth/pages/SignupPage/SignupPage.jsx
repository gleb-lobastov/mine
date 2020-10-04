import React from 'react';
import { Formik } from 'formik';
import { useQueryFilter } from 'core/context/QueryFilterContext';
import { useRequest } from 'core/connection';
import SignupForm from './SignupForm';

export default function SignupPage() {
  const { queryFilter } = useQueryFilter();
  const [submit, provision] = useRequest({
    domain: 'signupPage',
    modelName: 'users',
    method: 'POST',
  });

  const { invite, reset } = queryFilter || {};

  return (
    <Formik
      initialValues={{}}
      onSubmit={values =>
        submit({
          query: {
            body: {
              ...values,
              inviteCode: invite,
              reset: Boolean(reset),
            },
          },
        })
      }
      validator={() => ({})}
    >
      {formikProps => (
        <SignupForm
          formikProps={formikProps}
          provision={provision}
          isReset={Boolean(reset)}
        />
      )}
    </Formik>
  );
}
SignupPage.propTypes = {};

SignupPage.defaultProps = {};
