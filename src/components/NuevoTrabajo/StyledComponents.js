import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import 'moment/locale/es';
import MomentUtils from 'material-ui-pickers/utils/moment-utils';
import MuiPickersUtilsProvider from 'material-ui-pickers/utils/MuiPickersUtilsProvider';
import DatePicker from 'material-ui-pickers/DatePicker';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import styled from 'styled-components';
import __TextField from '@material-ui/core/TextField';
import { ArrowBack, ArrowForward, Event } from '@material-ui/icons';

import { adjustHexOpacity } from '../../utils';

moment.locale('es');

export const NuevoTrabajoContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const Error = styled.div`
  color: ${props => props.theme.status.danger[300]};
  width: 100%;
  text-align: center;
  font-size: 0.75rem;
`;

export const SectionTitle = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1.5rem;
  font-size: 1.25rem;
  font-weight: 300;
  color: ${props => adjustHexOpacity(props.theme.palette.primary[300], 0.75)};
  user-select: none;
`;


export const TextField = styled(__TextField)`
  margin-top: 0.8rem !important;
  margin-bottom: 0 !important;
  
  & > div {
    margin-top: 0.8rem !important
  }
  
  & label {
    color: ${props => props.theme.palette.secondary[300]};
  }

  & input {
    color: ${props => props.theme.palette.secondary[200]};
  }

  & label + div::before {
    border-color: ${props => props.theme.palette.secondary[300]} !important;
    transition: border-bottom-color 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms !important;
  }
  & label + div::after {
    transition: transform 500ms cubic-bezier(0.4, 0, 0.2, 1) 0ms !important;
  }
`;

export const Buttonera = styled.div`
  flex-direction: row;
  margin-top: 2rem;
`;

const __CustomDatePicker = props => (
  <MuiPickersUtilsProvider
    utils={MomentUtils}
    moment={moment}
    locale="es"
  >
    <DatePicker
      label="Fecha de pedido"
      leftArrowIcon={<ArrowBack />}
      rightArrowIcon={<ArrowForward />}
      keyboardIcon={<Event />}
      format="LL"
      {...props}
    />
  </MuiPickersUtilsProvider>
);

export const CustomDatePicker = styled(__CustomDatePicker)`
  & input {
    color: ${props => props.theme.palette.secondary[100]};
    font-weight: 300;
    cursor: pointer;
  }
  & label {
    color: ${props => props.theme.palette.secondary[300]} !important;
  }
  & label + div::before {
    border-color: ${props => props.theme.palette.secondary[300]} !important;
    transition: border-bottom-color 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms !important;
  }
  & label + div::after {
    transition: transform 500ms cubic-bezier(0.4, 0, 0.2, 1) 0ms !important;
  }
`;

const __CustomSelect = props => (
  <FormControl className={props.className}>
    <InputLabel htmlFor={`select-${props.name}`}>{props.label}</InputLabel>
    <Select
      name={props.name}
      value={props.value}
      onChange={props.onChange}
      inputProps={{
        name: props.name,
        id: `select-${props.name}`,
      }}
    >
      <MenuItem key="itemSelect0" value=""><em>Seleccione un trabajo</em></MenuItem>
      {props.items.map((item, i) => <MenuItem key={`itemSelect${i + 1}`} value={item.value}>{item.text}</MenuItem>)}
    </Select>
  </FormControl>
);

export const CustomSelect = styled(__CustomSelect)`
  margin-top: 0.8rem !important;

  & label+div > div > div {
    color: ${props => props.theme.palette.secondary[100]};
    font-weight: 300;
    text-align: left;
  }
  & label+div > div > svg {
    color: ${props => props.theme.palette.secondary[100]};
  }
  & input {
    color: ${props => props.theme.palette.secondary[100]};
    font-weight: 300;
    cursor: pointer;
  }
  & label {
    color: ${props => props.theme.palette.secondary[300]} !important;
    font-weight: 300;
  }
  & label + div::before {
    border-color: ${props => props.theme.palette.secondary[300]} !important;
    transition: border-bottom-color 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms !important;
  }
  & label + div::after {
    transition: transform 500ms cubic-bezier(0.4, 0, 0.2, 1) 0ms !important;
  }
`;

__CustomSelect.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
  items: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string,
    text: PropTypes.string,
  })),
};

__CustomSelect.defaultProps = {
  className: '',
  label: '',
  value: '',
  name: '',
  onChange: () => {},
  items: [],
};
