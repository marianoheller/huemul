import React from 'react';
import PropTypes from 'prop-types';
import AccountCircle from '@material-ui/icons/AccountCircle';
import IconButton from '@material-ui/core/IconButton';

import * as SC from './StyledComponents';


export default function RightSideMenu(props) {
  const {
    anchorEl,
    onClose,
    onClick,
    name,
    username,
  } = props;
  const loginOpen = Boolean(anchorEl);
  return (
    <SC.MenuContainer>
      <IconButton
        aria-owns={loginOpen ? `navbar-menu-${name}` : null}
        aria-haspopup="true"
        onClick={onClick}
        color="inherit"
      >
        <AccountCircle color="primary" />
        <SC.UsernameField>
          {username || 'USERNAME'}
        </SC.UsernameField>
      </IconButton>
      <SC.StyledMenu
        id={`navbar-menu-${name}`}
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        getContentAnchorEl={null}
        open={loginOpen}
        onClose={onClose}
      >
        <SC.StyledMenuItem
          to="/logout"
          name="Salir"
          onClose={onClose}
        />
      </SC.StyledMenu>
    </SC.MenuContainer>
  );
}

RightSideMenu.propTypes = {
  anchorEl: PropTypes.instanceOf(Element),
  onClose: PropTypes.func,
  onClick: PropTypes.func,
  name: PropTypes.string,
  username: PropTypes.string,
};

RightSideMenu.defaultProps = {
  anchorEl: '',
  onClose: () => {},
  onClick: () => {},
  name: '',
  username: '',
};
