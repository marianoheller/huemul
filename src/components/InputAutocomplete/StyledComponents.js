/* eslint-disable no-unused-vars */
import React from 'react';
import styled from 'styled-components';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import { adjustHexOpacity } from '../../utils';


export const InputWrapper = styled.div``;


export const StyledFormControl = styled(FormControl)`
  display: flex !important;
  align-items: center;
  justify-content: center;
`;

export const StyledInputLabel = styled(InputLabel)`
  color: ${props => props.theme.palette.secondary[300]} !important;
`;

/*
export const StyledInput = styled(Input)`
  color: white !important;
  font-weight: 300;

  &::before {
    background-color: ${props => props.theme.palette.secondary[300]} !important;
  }
`;
 */

export const StyledInput = styled(Input)`
  width: 100%;
  border-color: ${props => adjustHexOpacity(props.theme.palette.secondary[300], 0.25)};
  border-width: 1px;
  border-style: solid;
  color: white !important;
  font-weight: 300;

  & input {
    padding-left: 0.5rem;
  }
`;

export const ItemsContainerAnchor = styled.div`
  display: block;
  position: relative;
`;

export const ItemsContainer = styled.div`
  text-align: left;
  position: absolute;
  z-index: 99;
  top: 0;
  right: 0;
  left: 0;

  border: 1px solid ${props => adjustHexOpacity(props.theme.palette.primary[300], 0.2)};
  background-color: ${props => props.theme.background.primary};
`;

export const Item = styled.div`
  cursor: pointer;
  background-color: ${props => (props.highlighted ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0)')};
  font-weight: ${props => (props.selected ? 'bold' : 'normal')},
`;
