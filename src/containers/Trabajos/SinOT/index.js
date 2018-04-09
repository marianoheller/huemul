import React from 'react';
import PropTypes from 'prop-types';

import CustomFilter from '../../../components/CustomFilter';
import * as SC from './StyledComponents';

export default class SinOT extends React.Component {
  constructor() {
    super();

    this.state = {
      searchInput: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  handleChange(name) {
    return input => this.setState({ [name]: input });
  }

  handleSearch() {
    const { searchInput } = this.state;
    return searchInput;
  }

  render() {
    const { searchInput } = this.state;
    const { sinOT } = this.props;

    return (
      <SC.SinOTContainer>
        <SC.Title>Sin OT/SOT/RUT</SC.Title>
        <CustomFilter
          autoFocus
          onFilterChange={this.handleChange('searchInput')}
          filter={searchInput}
          placeholder="Filtrar"
        />
        <div>
          {sinOT.length !== 0 ?
          sinOT
          :
          <SC.NoFoundContainer>
            No se han encontrado registros
          </SC.NoFoundContainer>
          }
        </div>
      </SC.SinOTContainer>
    );
  }
}

SinOT.propTypes = {
  sinOT: PropTypes.arrayOf(PropTypes.shape({})),
};

SinOT.defaultProps = {
  sinOT: [],
};
