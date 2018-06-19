import React from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import List from '@material-ui/core/List';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { ArrowBack, Event, Dvr, PermIdentity, Business, Work, Group } from '@material-ui/icons';

import * as SC from './StyledComponents';
import CustomDrawer from './CustomDrawer';

const icons = {
  calendario: <Event />,
  planificador: <Dvr />,
  trabajos: <Work />,
  agenda: <Group />,
  contactos: <PermIdentity />,
  clientes: <Business />,
};

export default function Drawer(props) {
  const {
    isOpen,
    onClose,
    onClick,
    name,
    items,
  } = props;

  return (
    <SC.LeftMenuContainer>
      <IconButton
        aria-owns={isOpen ? `drawer-menu-${name}` : null}
        aria-haspopup="true"
        onClick={!isOpen ? onClick : onClose}
        color="inherit"
      >
        { !isOpen ?
          <MenuIcon color="secondary" />
          :
          <ArrowBack color="secondary" />
        }
      </IconButton>
      <CustomDrawer
        onClose={onClose}
        isOpen={isOpen}
      >
        <List>
          {items.map((item, i) => {
            switch (item.type) {
              case 'item':
              return (
                <SC.StyledNavLink to={item.route} key={`${item.route}${i}`}>
                  <SC.StyledListItem button>
                    <ListItemIcon>
                      {icons[item.icon] || <MenuIcon /> }
                    </ListItemIcon>
                    <ListItemText primary={item.text} />
                  </SC.StyledListItem>
                </SC.StyledNavLink>
              );
              case 'divider':
              return <SC.StyledDivider key={`${item.type}${i}`} />;
              default:
              return null;
            }
          })}
        </List>
      </CustomDrawer>
    </SC.LeftMenuContainer>
  );
}

Drawer.propTypes = {
  onClose: PropTypes.func,
  onClick: PropTypes.func,
  isOpen: PropTypes.bool,
  name: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.shape({})),
};

Drawer.defaultProps = {
  onClose: () => {},
  onClick: () => {},
  isOpen: false,
  name: '',
  items: [],
};
