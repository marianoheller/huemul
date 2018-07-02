/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';
import Spinner from '../Spinner';

const SpinnerWrapper = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  margin-top: 3rem;
  & .tooltip {
    visibility: ${({ hover }) => (hover ? 'visible' : 'hidden')};
    transition: top .2s ease-out, left .2s ease-out;
  }
`;

const ErrorContainer = styled.div`
  margin-top: 2rem;
  font-weight: 300;
  display: flex;
  justify-content: center;
  font-style: italic;
  color: ${props => props.theme.palette.secondary[300]};
`;


const LoadingComponent = ({ pastDelay, error }) => {
  if (error) return <ErrorContainer>Sorry, there was a problem loading the page.</ErrorContainer>;
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
