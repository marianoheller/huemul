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
    const { tabIndex } = this.state;
    return (
      <SC.MainContainer>
        <AppBar position="static" color="default">
          <SC.StyledTabs
            value={tabIndex}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
            fullWidth
            centered
            data-cy-type="tabs"
            data-cy-index={tabIndex}
          >
            <SC.StyledTab data-cy-type="tab" label="Crear nuevo" />
            <SC.StyledTab data-cy-type="tab" label="Trabajos" />
            <SC.StyledTab data-cy-type="tab" label="Sin OT/SOT/RUT" />
          </SC.StyledTabs>
        </AppBar>
        <SC.StyledSwipeableViews
          animateHeight
          index={tabIndex}
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

