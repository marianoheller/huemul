import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Delete, Edit, SupervisorAccount } from '@material-ui/icons';

import { adjustHexOpacity } from '../../utils';


export const ListaContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 1rem;
`;

export const ListaItemContainer = styled.div`
  position: relative;
  padding: 1rem;
  margin: 1rem 0;
  background-color: ${props => props.theme.background.secondary};
  border-style: solid;
  border-width: 1px;
  border-color: ${props => adjustHexOpacity(props.theme.palette.primary[300], 0.25)};
  box-shadow: 0px 5px 5px -3px rgba(0, 0, 0, 0.2), 0px 8px 10px 1px rgba(0, 0, 0, 0.14), 0px 3px 14px 2px rgba(0, 0, 0, 0.12);

  &:first-child {
    margin-top: 1.5rem;
  }
  &:last-child {
    margin-bottom: 2rem;
  }

  @media only screen and (max-width: 400px) {
    padding: 0.5rem;
  }
`;

export const Field = styled.div`
  display: flex;
  flex-direction: row;
  color: ${props => props.theme.palette.secondary[300]};
`;

export const FieldName = styled.div`
  font-weight: 300;
  margin-right: 0.5rem;
  color: ${props => props.theme.palette.secondary[300]};
`;

export const FieldValue = styled.div`
  font-weight: 300;
  color: white;
`;


export const Buttonera = styled.div`
  position: absolute;
  display: flex;
  flex-direction: row;
  top: 0.5rem;
  right: 0.5rem;


  @media only screen and (max-width: 400px) {
    position: inherit;
    justify-content: space-between;
    top: 0;
    right: 0;
    margin-bottom: 0.75rem;
  }
`;

function __Button(props) {
  const iconMap = {
    delete: <Delete color="secondary" />,
    edit: <Edit color="secondary" />,
    associate: <SupervisorAccount color="secondary" />,
  };

  return (
    <div {...props} >
      {iconMap[props.type]}
    </div>
  );
}


export const Button = styled(__Button)`
  width: 1.1rem;
  height: 1.1rem;
  padding: 0.1rem;
  margin: 0 0.25rem;

  border-radius: 0.25rem;
  border-style: solid;
  border-width: 1px;
  border-color: ${props => props.theme.palette.primary[300]};
  cursor: pointer;

  & svg {
    width: 1rem;
    height: 1rem;
  }

  &:hover {
    background-color: ${props => props.theme.palette.primary[300]};
    & svg {
      fill: white;
    }
  }
`;

export const ButtonDanger = Button.extend`
  &:hover {
    border-color: ${props => props.theme.status.danger[900]};
    background-color: ${props => props.theme.status.danger[900]};
    & svg {
      fill: white;
    }
  }
`;

__Button.propTypes = {
  className: PropTypes.string,
  type: PropTypes.string,
};

__Button.defaultProps = {
  className: '',
  type: '',
};

