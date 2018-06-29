/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';
import Spinner from '../Spinner';

const SpinnerWrapper = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  display: inline-block;
  margin-top: 3rem;
  & .tooltip {
    visibility: ${({ hover }) => (hover ? 'visible' : 'hidden')};
    transition: top .2s ease-out, left .2s ease-out;
  }
`;

const LoadingComponent = ({ pastDelay, error }) => {
  if (error) return <div>Sorry, there was a problem loading the page.</div>;
  else if (pastDelay) {
    return (
      <SpinnerWrapper>
        <Spinner message="Loading..." />
      </SpinnerWrapper>
    );
  }
  return null;
};

export default LoadingComponent;
