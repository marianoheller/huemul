import React from 'react';
import AppBar from '@material-ui/core/AppBar';

import AgendaClientes from './AgendaClientes';
import AgendaContactos from './AgendaContactos';
import * as SC from './StyledComponents';


export default class Trabajos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tabIndex: 0,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeIndex = this.handleChangeIndex.bind(this);
  }

  handleChange(event, tabIndex) {
    this.setState({ tabIndex });
  }

  handleChangeIndex(index) {
    this.setState({ tabIndex: index });
  }

  render() {
    const { tabIndex } = this.state;
    return (
      <SC.AgendaContainer>
        <AppBar position="static" color="default">
          <SC.StyledTabs
            value={tabIndex}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
            fullWidth
            centered
            data-type="tabs"
            data-index={tabIndex}
          >
            <SC.StyledTab label="Contactos" data-type="tab" data-index={0} />
            <SC.StyledTab label="Clientes" data-type="tab" data-index={1} />
          </SC.StyledTabs>
        </AppBar>
        <SC.StyledSwipeableViews
          index={tabIndex}
          onChangeIndex={this.handleChangeIndex}
        >
          <SC.TabContainer>
            <AgendaContactos isActive={tabIndex === 0} />
          </SC.TabContainer>
          <SC.TabContainer>
            <AgendaClientes isActive={tabIndex === 1} />
          </SC.TabContainer>
        </SC.StyledSwipeableViews>
      </SC.AgendaContainer>
    );
  }
}

