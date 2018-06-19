import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';


export const MenuContainer = styled.div`
& > button {
  width: unset;
}
`;

export const UsernameField = styled.div`
  margin-left: 0.25rem;
  font-size: 0.75rem;
  font-weight: 300;
  color: white;
`;


export const StyledMenu = styled(Menu)`
  & > div {
    border-radius: 0px;
  }
  & ul {
    background-color: #3e464c !important;
  }
`;


const WrappedMenuItem = props => (
  <NavLink
    to={props.to}
    activeClassName={props.activeClassName || 'active'}
    className={props.className}
  >
    <MenuItem onClick={props.onClose}>
      {props.name}
    </MenuItem>
  </NavLink>
);


export const StyledMenuItem = styled(WrappedMenuItem)`
    text-decoration: none !important;
    & > li {
      background-color: #3e464c !important;
      color: white !important;
      font-weight: 300;
    }
    
    & > li:hover {
      background-color: ${props => props.theme.palette.primary[300]} !important;
    }
  
    &:focus {
      outline: none;
    }
  `;


WrappedMenuItem.propTypes = {
  to: PropTypes.string,
  name: PropTypes.string,
  className: PropTypes.string,
  activeClassName: PropTypes.string,
  onClose: PropTypes.func,
};

WrappedMenuItem.defaultProps = {
  to: '',
  name: '',
  className: '',
  activeClassName: '',
  onClose: () => {},
};

