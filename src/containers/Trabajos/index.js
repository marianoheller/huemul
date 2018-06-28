import React from 'react';
import AppBar from '@material-ui/core/AppBar';

import NuevoTrabajoContainer from './NuevoTrabajo';
import TrabajosContainer from './Trabajos';
import SinOT from './SinOT';
import * as SC from './StyledComponents';

export default class Trabajos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tabIndex: 1,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event, tabIndex) {
    this.setState({ tabIndex });
  }

  render() {
    return (
      <SC.MainContainer>
        <AppBar position="static" color="default">
          <SC.StyledTabs
            value={this.state.tabIndex}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
            fullWidth
            centered
          >
            <SC.StyledTab label="Crear nuevo" />
            <SC.StyledTab label="Trabajos" />
            <SC.StyledTab label="Sin OT/SOT/RUT" />
          </SC.StyledTabs>
        </AppBar>
        <SC.StyledSwipeableViews
          animateHeight
          index={this.state.tabIndex}
          /* Commenting next line disables changing tabs by slinding on mobile */
          /* But solves a problem with initial index */
          /* onChangeIndex={this.handleChangeIndex} */
        >
          <SC.TabContainer>
            <NuevoTrabajoContainer />
          </SC.TabContainer>
          <SC.TabContainer>
            <TrabajosContainer />
          </SC.TabContainer>
          <SC.TabContainer>
            <SinOT />
          </SC.TabContainer>
        </SC.StyledSwipeableViews>
      </SC.MainContainer>
    );
  }
}

