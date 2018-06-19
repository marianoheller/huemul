import React from 'react';
import PropTypes from 'prop-types';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

import UserMenu from './Menus/UserMenu';
import Drawer from './Drawer';
import * as SC from './StyledComponents';

export default class ButtonAppBar extends React.Component {
  constructor() {
    super();

    this.state = {
      drawer: {
        isOpen: false,
      },
      login: {
        anchorEl: null,
      },
    };
    this.handleMenu = this.handleMenu.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleDrawer(val) {
    return () => {
      this.setState({
        drawer: {
          ...this.state.drawer,
          isOpen: val,
        },
      });
    };
  }

  handleMenu(menu) {
    return (event) => {
      this.setState({
        ...this.state,
        [menu]: {
          ...this.state[menu],
          anchorEl: event.currentTarget,
        },
      });
    };
  }

  handleClose(menu) {
    return () => {
      this.setState({
        ...this.state,
        [menu]: {
          ...this.state[menu],
          anchorEl: null,
        },
      });
    };
  }

  render() {
    const { isAuthenticated, buildVersion, username } = this.props;
    const { login, drawer } = this.state;

    const drawerItems = [
      {
        type: 'item', icon: 'planificador', text: 'Planificador', route: '/planificador',
      },
      {
        type: 'item', icon: 'calendario', text: 'Calendario CSA', route: '/calendarioCSA',
      },
      { type: 'divider' },
      {
        type: 'item', icon: 'trabajos', text: 'Trabajos', route: '/trabajos',
      },
      { type: 'divider' },
      {
        type: 'item', icon: 'agenda', text: 'Agenda', route: '/agenda',
      },
    ];

    return (
      <SC.NavbarContainer>
        <SC.CustomAppBar position="static">
          <Toolbar>
            <Drawer
              name="general"
              onClick={this.handleDrawer(true)}
              onClose={this.handleDrawer(false)}
              isOpen={drawer.isOpen}
              items={drawerItems}
            />
            <SC.LogoContainer to="/">
              <SC.Logo id="home-nav-link">
                  Tracer
                <SC.Version active={Boolean(buildVersion)}>v{buildVersion || '0.00'}</SC.Version>
              </SC.Logo>
            </SC.LogoContainer>
            <SC.Spacer />

            { !isAuthenticated ?
              <SC.StyledNavLink
                to="/login"
                activeClassName="active"
              >
                <Button color="primary" id="ingresar-nav-button">Ingresar</Button>
              </SC.StyledNavLink>
              :
              <UserMenu
                name="login"
                onClick={this.handleMenu('login')}
                onClose={this.handleClose('login')}
                anchorEl={login.anchorEl}
                username={username}
              />
            }
          </Toolbar>
        </SC.CustomAppBar>
      </SC.NavbarContainer>
    );
  }
}


ButtonAppBar.propTypes = {
  isAuthenticated: PropTypes.bool,
  buildVersion: PropTypes.string,
  username: PropTypes.string,
};

ButtonAppBar.defaultProps = {
  isAuthenticated: false,
  buildVersion: '',
  username: '',
};

