import React, { useEffect } from 'react';
import gql from 'graphql-tag';
import { useHistory } from 'react-router-dom';
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
  const strings = queryString.parse(location.search);
  const [verifyEmail, { error, loading, data }] = useMutation<
    VerifyEmailMutation,
    VerifyEmailMutationVariables
  >(VERIFY_EMAIL);

  if (data?.verifyEmail?.access_token) {
    history.push('/login');
  }

  useEffect(() => {
    if (strings.token) {
      const token = Array.isArray(strings.token)
        ? strings.token[0]
        : strings.token;

      verifyEmail({
        variables: {
          input: {
            token: token,
          },
        },
      });
    }
  }, []);

  const close = () => history.push('/');

  return (
    <BlueBackground>
      <CenteredDivWithLogo>
        <img src="/images/logo.png" aria-hidden />
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
