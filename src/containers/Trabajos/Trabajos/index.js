import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import SearchResultsTrabajos from '../../../components/SearchResultsTrabajos';
import CustomFilter from '../../../components/CustomFilter';
import * as SC from './StyledComponents';

import * as trabajosActions from '../../../actions/trabajos';

const SEARCH_FIELDS = [
  { value: 'numero', text: 'Legajo' },
  { value: 'nombre', text: 'Nombre' },
  { value: 'ot', text: 'OT/SOT/RUT' },
  { value: 'cliente', text: 'Clientes' },
  { value: 'contacto', text: 'Contactos' },
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

  componentDidMount() {
    const { buscarTrabajo } = this.props;
    buscarTrabajo(' ', 'nombre');
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
    const { trabajos, isFetching } = this.props;
    const selectOptions = SEARCH_FIELDS;

    return (
      <SC.TrabajosContainer>
        <SC.Title data-cy-type="title">Buscar</SC.Title>
        <CustomFilter
          /* TODO: fix autofocus not working */
          autoFocus
          onFilterChange={this.handleChange('searchInput')}
          filter={searchInput}
          placeholder="Legajo, OT, SOT, RUT, etc..."
          isLoading={isFetching}

          hasSelect
          selectOptions={selectOptions}
          selectValue={selectOptions.find(o => o.value === searchField).value}
          handleSelectChange={this.handleSeachFieldChange}

          handleCommit={this.handleSearch}
        />
        <SearchResultsTrabajos results={trabajos} />
      </SC.TrabajosContainer>
    );
  }
}

Trabajos.propTypes = {
  trabajos: PropTypes.arrayOf(PropTypes.shape({})),
  buscarTrabajo: PropTypes.func,
  isFetching: PropTypes.bool,
};

Trabajos.defaultProps = {
  trabajos: [],
  buscarTrabajo: () => {},
  isFetching: false,
};


const mapStateToProps = ({ trabajos }) => ({
  trabajos: trabajos.buscar.data,
  isFetching: trabajos.buscar.isFetching,
});

const mapDispatchToProps = dispatch => ({
  buscarTrabajo: (searchInput, searchField) => {
    if (!searchInput.length) return;
    dispatch(trabajosActions.trabajosBuscar.request({ [searchField]: searchInput }));
  },
});


export default connect(mapStateToProps, mapDispatchToProps)(Trabajos);

