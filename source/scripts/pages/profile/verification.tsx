import React, { useEffect } from 'react';
import gql from 'graphql-tag';
import { useHistory, useLocation } from 'react-router-dom';
import queryString from 'query-string';
import { useMutation } from '@apollo/react-hooks';
import Loader from 'scripts/styles/loader';
import Error from 'scripts/styles/error';
import { BlueBackground, CenteredDivWithLogo } from './shared/styles';
import {
  VerifyEmailMutationVariables,
  VerifyEmailMutation,
} from 'scripts/generated/types';

const VERIFY_EMAIL = gql`
  mutation verifyEmail($input: VerifyEmailInput!) {
    verifyEmail(input: $input) {
      access_token
    }
  }
`;

const EmailVerification = () => {
  const history = useHistory();
  const location = useLocation();
  const { token } = queryString.parse(location.search);
  const [verifyEmail, { error, loading, data }] = useMutation<
    VerifyEmailMutation,
    VerifyEmailMutationVariables
  >(VERIFY_EMAIL);

  useEffect(() => {
    // Mutation

    if (typeof token === 'string') {
      verifyEmail({
        variables: {
          input: {
            token: token,
          },
        },
      });
    }

    // Sucess

    if (data?.verifyEmail?.access_token) {
      history.push('/login');
    }
  }, [data]);

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

export default EmailVerification;
