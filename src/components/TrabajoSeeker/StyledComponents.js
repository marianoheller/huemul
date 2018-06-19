/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Checkbox from '@material-ui/core/Checkbox';

import { adjustHexOpacity } from '../../utils';


export const TrabajoSeekerWrapper = styled.div`
display: block;
column-count: 1;
text-align: left;
padding: 1rem;
font-weight: 300;
color: white;
border: 1px solid;
border-radius: 2px;
background-color: ${props => props.theme.background.secondary};
border-color: ${props => adjustHexOpacity(props.theme.palette.primary[300], 0.4)};
box-shadow: 0px 5px 5px -3px rgba(0, 0, 0, 0.2), 0px 8px 10px 1px rgba(0, 0, 0, 0.14), 0px 3px 14px 2px rgba(0, 0, 0, 0.12);

& > div {
  margin-bottom: 0.85rem;
  margin-top: 0.85rem;
}
& > label {
  margin-top: 0.85rem;
}
`;

export const FiltroTitle = styled.div`
text-align: center;
font-weight: 300;
font-size: 1.25rem;
margin-bottom: 1rem;
user-select: none;
color: ${props => props.theme.palette.primary[300]};
`;

const FilterInputContainer = styled.div`
  display:  flex;
  width:  100%;
`;

export const StyledFormControl = styled(FormControl)`
display: flex !important;
align-items: center;
justify-content: center;
width: 100%;
`;

export const StyledInputLabel = styled(InputLabel)`
color: ${props => props.theme.palette.secondary[300]} !important;
`;


export const StyledInput = styled(Input)`
  /* color: ${props => props.theme.palette.secondary[300]} !important; */
  display: block !important;
  color: white !important;
  font-weight: 300;
  width: 100%;

  & input {
    width: 100%;
  }

  &::before {
    /* background-color: ${props => props.theme.palette.secondary[300]} !important; */
  }
`;


export function FilterInput(props) {
  return (
    <FilterInputContainer>
      <StyledFormControl>
        <StyledInputLabel>{props.label}</StyledInputLabel>
        <StyledInput
          fullWidth
          name={props.name}
          value={props.value}
          onChange={props.onChange}
        />
      </StyledFormControl>
    </FilterInputContainer>
  );
}

FilterInput.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
};

FilterInput.defaultProps = {
  label: '',
  value: '',
  name: '',
  onChange: () => {},
};

const FormControlSwitch = styled(FormControlLabel)`
  display: inline-flex;
  flex-direction: row-reverse;
  margin-left: 0px !important;
  margin-right: 0px !important;
  width: 100%;
  justify-content: space-between;
  max-width: 300px;
`;

const FormControlCheckbox = styled(FormControlLabel)`
  flex-direction: row;
  margin-left: 0px !important;
  margin-right: 0px !important;
  flex: 1;
`;

const CheckboxLabel = styled.div`
  user-select: none;
  text-align: right;
  font-weight: 300;
  color: ${props => (props.disabled ? 'rgba(0, 0, 0, 0.38)' : props.theme.palette.secondary[300])};
`;

const StyledCheckbox = styled(Checkbox)`
  & svg {
    fill: ${(props) => {
    if (props.disabled) { return 'rgba(0, 0, 0, 0.38)'; } else if (props.checked) { return props.theme.palette.primary[300]; }
    return props.theme.palette.secondary[300];
  }};
  }
`;

export function FilterToggleable(props) {
  return (
    <FormControlSwitch
      control={
        <Switch
          color="primary"
          name={props.name}
          value={props.value}
          checked={props.checkedSwitch}
          onChange={props.onChangeSwitch}
        />
      }
      label={
        <FormControlCheckbox
          label={
            <CheckboxLabel disabled={!props.checkedSwitch}>
              {props.labelText}
            </CheckboxLabel>
          }
          control={
            <StyledCheckbox
              disabled={!props.checkedSwitch}
              color="primary"
              name={props.name}
              value={props.value}
              checked={props.checkedCheckbox}
              onChange={props.onChangeCheckbox}
            />
          }
        />
      }
    />
  );
}


FilterToggleable.propTypes = {
  labelText: PropTypes.string,
  value: PropTypes.bool,
  name: PropTypes.string,
  checkedSwitch: PropTypes.bool,
  checkedCheckbox: PropTypes.bool,
  onChangeSwitch: PropTypes.func,
  onChangeCheckbox: PropTypes.func,
};

FilterToggleable.defaultProps = {
  labelText: '',
  value: '',
  name: '',
  checkedSwitch: false,
  checkedCheckbox: false,
  onChangeSwitch: () => {},
  onChangeCheckbox: () => {},
};

export const ButtonContainer = styled.div`
  margin-top: 3rem !important;
  text-align: right;
`;
