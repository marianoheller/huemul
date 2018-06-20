import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import CustomFilter from '../../../components/CustomFilter';
import ListaAgenda from '../../../components/ListaAgenda';
import * as clientesActions from '../../../actions/clientes';
import * as SC from './StyledComponents';
import { filterAgenda } from '../../../utils';

const SEARCH_PARAMS = ['razonSocial', 'telefono', 'cuit', 'domicilio', 'localidad', 'provincia'];

class AgendaClientes extends React.Component {
  constructor() {
    super();

    this.state = {
      filter: '',
    };
    this.handleFilterChange = this.handleFilterChange.bind(this);
  }

  componentDidMount() {
    const { getClientesTodos } = this.props;
    getClientesTodos();
  }

  handleFilterChange(filter) {
    this.setState({ filter });
  }

  render() {
    const { clientesTodos, isActive } = this.props;
    const { filter } = this.state;
    if (!isActive) return null;
    return (
      <SC.AgendaClientesWrapper>
        <SC.Title>Clientes</SC.Title>
        <SC.ListaContainer>
          <CustomFilter
            placeholder="Buscar clientes"
            filter={filter}
            onFilterChange={this.handleFilterChange}
          />
          <ListaAgenda
            items={
              filter.length ?
              filterAgenda(filter, clientesTodos, SEARCH_PARAMS)
              : clientesTodos
            }
            fieldNameMap={{
              razonSocial: 'Razon social',
              telefono: 'Telefono',
              fax: 'Fax',
              domicilio: 'Domicilio',
              localidad: 'Localidad',
              provincia: 'Provincia',
            }}
          />
        </SC.ListaContainer>
      </SC.AgendaClientesWrapper>
    );
  }
}


const mapStateToProps = ({ clientes }) => ({
  clientesActivos: clientes.activos.data,
  clientesTodos: clientes.activos.data,
});

const mapDispatchToProps = dispatch => ({
  getClientesTodos: () => dispatch(clientesActions.clientesTodos.request()),
});

AgendaClientes.propTypes = {
  clientesTodos: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    razonSocial: PropTypes.string,
    telefono: PropTypes.string,
    fax: PropTypes.string,
    domicilio: PropTypes.string,
    localidad: PropTypes.string,
    provincia: PropTypes.string,
  })),
  getClientesTodos: PropTypes.func,
  isActive: PropTypes.bool,
};

AgendaClientes.defaultProps = {
  clientesTodos: [],
  getClientesTodos: () => {},
  isActive: true,
};


export default connect(mapStateToProps, mapDispatchToProps)(AgendaClientes);
