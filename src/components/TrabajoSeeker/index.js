import React from 'react';
import * as SC from './StyledComponents';
import Seeker from './Seeker';


export default class TrabajoSeeker extends React.Component {
  constructor(props) {
    super(props);

    this.handleSearch = this.handleSearch.bind(this);
  }

  handleSearch() {
    console.log('"SEACRHINGG"', this.state);
  }


  render() {
    return (
      <SC.TrabajoSeekerWrapper>
        <Seeker handleSearch={this.handleSearch} />
      </SC.TrabajoSeekerWrapper>
    );
  }
}
