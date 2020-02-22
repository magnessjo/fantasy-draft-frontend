import React from 'react';
import styled from 'styled-components';
import CTA from './call-to-action';
import { Color } from 'scripts/variables';
import { ApolloError } from 'apollo-boost';

const LoaderContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.95);

  .headline {
    font-family: 'Playfair Display', serif;
    font-size: 18px;
    font-weight: 700;
  }

  & p {
    margin-bottom: 10px;
  }

  & img {
    position: relative;
    max-height: 100px;
    margin-top: 20px;
  }
`;

const CloseButton = styled(CTA)`
  display: block;
  background-color: ${Color.blue};
  color: ${Color.white};
`;

const Loader = ({
  errorCodes,
  close,
}: {
  errorCodes?: Array<string> | string | ApolloError;
  close?: () => void;
}) => {
  console.log(errorCodes);
  return (
    <LoaderContainer>
      <div>
        <p className="headline">Well, this is awkward!</p>
        <p>Some type of error has occured.</p>
        {Array.isArray(errorCodes) ||
          (typeof errorCodes === 'string' && (
            <p>What I know of the error is:</p>
          ))}
        {Array.isArray(errorCodes) && errorCodes.map(code => <p>{code}</p>)}
        {typeof errorCodes === 'string' && <p>{errorCodes}</p>}
        <img src="/images/helpers/oops.jpg" />
        <CloseButton as="button" type="button" onClick={close}>
          Close Error Notice
        </CloseButton>
      </div>
    </LoaderContainer>
  );
};

export default Loader;
