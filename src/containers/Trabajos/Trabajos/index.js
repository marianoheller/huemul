import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import CustomFilter from '../../../components/CustomFilter';
import * as SC from './StyledComponents';

import * as trabajosActions from '../../../actions/trabajos';

const SEARCH_FIELDS = [
  { value: 'numero.numero', text: 'Legajo' },
  { value: 'n', text: 'Nombre' },
  { value: 'o', text: 'OT/SOT/RUT' },
  { value: 'cl', text: 'Clientes' },
  { value: 'co', text: 'Contactos' },
];

class Trabajos extends React.Component {
  constructor() {
    super();

    this.state = {
      searchInput: '',
      searchField: SEARCH_FIELDS[0].value,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleSeachFieldChange = this.handleSeachFieldChange.bind(this);
  }

  handleChange(name) {
    return input => this.setState({ [name]: input });
  }

  handleSearch() {
    const { buscarTrabajo } = this.props;
    const { searchInput, searchField } = this.state;
    buscarTrabajo(searchInput, searchField);
  }

  handleSeachFieldChange(newVal) {
    this.setState({ searchField: newVal });
  }

  render() {
    const { searchInput, searchField } = this.state;
    const { trabajos } = this.props;
    const selectOptions = SEARCH_FIELDS;

    return (
      <SC.TrabajosContainer>
        <SC.Title>Buscar</SC.Title>
        <CustomFilter
          autoFocus
          onFilterChange={this.handleChange('searchInput')}
          filter={searchInput}
          placeholder="Legajo, OT, SOT, RUT, etc..."

          hasSelect
          selectOptions={selectOptions}
          selectValue={selectOptions.find(o => o.value === searchField).value}
          handleSelectChange={this.handleSeachFieldChange}

          handleCommit={this.handleSearch}
        />
        <div>
          {trabajos}
        </div>
      </SC.TrabajosContainer>
    );
  }
}

Trabajos.propTypes = {
  trabajos: PropTypes.arrayOf(PropTypes.shape({})),
  buscarTrabajo: PropTypes.func,
};

Trabajos.defaultProps = {
  trabajos: [],
  buscarTrabajo: () => {},
};


const mapStateToProps = ({ trabajos }) => ({
  trabajos: trabajos.trabajos.data,
});

const mapDispatchToProps = dispatch => ({
  buscarTrabajo: (searchInput, searchField) => (
    dispatch(trabajosActions.trabajosBuscar.request({ [searchField]: searchInput }))
  ),
});


export default connect(mapStateToProps, mapDispatchToProps)(Trabajos);

