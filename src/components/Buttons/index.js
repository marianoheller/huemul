import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Button } from '@material-ui/core';


const __PrimaryButton = props => (
  <Button
    {...props}
    color="primary"
  >
    {props.text}
  </Button>
);


const __SecondaryButton = props => (
  <Button
    {...props}
    color="secondary"
  >
    {props.text}
  </Button>
);

const __MainButton = props => (
  <Button
    {...props}
    color="primary"
    size="large"
  >
    {props.text}
  </Button>
);


export const PrimaryButton = styled(__PrimaryButton)``;
export const SecondaryButton = styled(__SecondaryButton)``;
export const MainButton = styled(__MainButton)``;


__PrimaryButton.propTypes = {
  text: PropTypes.string,
};

__PrimaryButton.defaultProps = {
  text: '',
};

__SecondaryButton.propTypes = {
  text: PropTypes.string,
};

__SecondaryButton.defaultProps = {
  text: '',
};

__MainButton.propTypes = {
  text: PropTypes.string,
};

__MainButton.defaultProps = {
  text: '',
};

