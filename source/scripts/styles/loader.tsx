import React from 'react';
import styled from 'styled-components';

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

  .loader {
    width: 80px;
    display: flex;
    justify-content: space-between;
  }

  .loader > div {
    width: 18px;
    height: 18px;
    background-color: rgba(10, 10, 10, 1);
    border-radius: 100%;
    display: block;
    animation: bounce 1.4s infinite ease-in-out both;
  }

  .loader > div:first-of-type {
    animation-delay: -0.32s;
  }

  .loader > div:nth-of-type(2n) {
    animation-delay: -0.16s;
  }

  @keyframes bounce {
    0%,
    80%,
    100% {
      transform: scale(0);
    }
    40% {
      transform: scale(1);
    }
  }
`;

const Loader = () => (
  <LoaderContainer>
    <div className="loader">
      <div></div>
      <div></div>
      <div></div>
    </div>
  </LoaderContainer>
);

export default Loader;
