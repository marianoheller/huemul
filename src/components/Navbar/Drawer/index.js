import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import List from '@material-ui/core/List';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Tooltip from '@material-ui/core/Tooltip';
import {
  ArrowBack, Event, Dvr,
  PermIdentity, Business,
  Work, Group, Settings,
  Alarm, TrendingUp, Home,
} from '@material-ui/icons';

import * as SC from './StyledComponents';
import CustomDrawer from './CustomDrawer';

const icons = {
  calendario: <Event />,
  planificador: <Dvr />,
  trabajos: <Work />,
  agenda: <Group />,
  contactos: <PermIdentity />,
  clientes: <Business />,
  preferencias: <Settings />,
  deadlines: <Alarm />,
  markers: <TrendingUp />,
  home: <Home />,
};

class Drawer extends React.Component {
  constructor() {
    super();
    this.state = {
      tooltipOpen: false,
    };
    this.handleTooltipClose = this.handleTooltipClose.bind(this);
    this.handleTooltipOpen = this.handleTooltipOpen.bind(this);
  }

  componentDidMount() {
    /* eslint-disable-next-line react/prop-types */
    const { pathname } = this.props.location;
    if (pathname === '/') setTimeout(this.handleTooltipOpen, 1500);
  }

  handleTooltipClose() {
    this.setState({ tooltipOpen: false });
  }

  handleTooltipOpen(e) {
    // Filter out focus event (it triggers automatically for some reason)
    if (e && e.type === 'focus') return;
    this.setState({ tooltipOpen: true });
  }

  render() {
    const {
      isOpen,
      onClose,
      onClick,
      name,
      items,
    } = this.props;

    const { tooltipOpen } = this.state;
    return (
      <SC.LeftMenuContainer>
        <Tooltip
          enterDelay={500}
          onClose={this.handleTooltipClose}
          onOpen={this.handleTooltipOpen}
          open={tooltipOpen}
          placement="bottom"
          title="Clickear acá para ver menú"
        >
          <IconButton
            aria-owns={isOpen ? `drawer-menu-${name}` : null}
            aria-haspopup="true"
            aria-label="Navigation menu"
            onClick={!isOpen ? onClick : onClose}
            color="inherit"
          >
            { !isOpen ?
              <MenuIcon color="secondary" />
              :
              <ArrowBack color="secondary" />
            }
          </IconButton>
        </Tooltip>

        <CustomDrawer
          onClose={onClose}
          isOpen={isOpen}
        >
          <List>
            {items.map((item, i) => {
              switch (item.type) {
                case 'item': {
                  const {
                    route,
                    icon,
                    text,
                    disabled,
                    ...rest
                  } = item;
                  return (
                    <SC.StyledNavLink exact to={route} key={`${route}${i}`} disabled={disabled} {...rest}>
                      <SC.StyledListItem button>
                        <ListItemIcon>
                          {icons[icon] || <MenuIcon /> }
                        </ListItemIcon>
                        <ListItemText primary={text} />
                      </SC.StyledListItem>
                    </SC.StyledNavLink>
                  );
                }
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


export default withRouter(Drawer);
