import React, { useEffect, useState } from 'react';
import gql from 'graphql-tag';
import { useHistory, useLocation } from 'react-router-dom';
import queryString from 'query-string';
import { useMutation } from '@apollo/react-hooks';
import { Loader } from 'scripts/styles/loader';
import { Error } from 'scripts/styles/error';
import { BlueBackground, CenteredDivWithLogo } from './shared/styles';
import {
  VerifyEmailMutationVariables,
  VerifyEmailMutation,
} from 'scripts/generated/types';

const VERIFY_EMAIL = gql`
  mutation verifyEmail($input: VerifyEmailInput!) {
    verifyEmail(input: $input) {
      user {
        id
      }
    }
  }
`;

export const EmailVerification = () => {
  const history = useHistory();
  const location = useLocation();
  const { token } = queryString.parse(location.search);
  const [submitting, setSubmitting] = useState(false);
  const [verifyEmail, { error, loading, data }] = useMutation<
    VerifyEmailMutation,
    VerifyEmailMutationVariables
  >(VERIFY_EMAIL);

  useEffect(() => {
    if (typeof token === 'string' && !submitting) {
      verifyEmail({
        variables: {
          input: {
            token: token,
          },
        },
      });
      setSubmitting(true);
    }

    if (data?.verifyEmail?.user?.id) {
      history.push('/login');
    }
  }, [data, submitting, setSubmitting]);

  const close = () => history.push('/');

  return (
    <BlueBackground>
      <CenteredDivWithLogo>
        <img src="/images/logo.png" aria-hidden />
        {loading && <Loader />}
        {error && <Error errorCodes={error} close={close} />}
        {!error && (
          <div>
            <p>We are verifying your email</p>
            <Loader />
          </div>
        )}
      </CenteredDivWithLogo>
    </BlueBackground>
  );
};
