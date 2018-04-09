import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import debounce from 'lodash.debounce';

import ModalConfirm from '../../../components/ModalConfirm';
import CustomFilter from '../../../components/CustomFilter';
import ListaAgenda from '../../../components/ListaAgenda';
import ClienteForm from '../../../components/EditForms/ClienteForm';
import * as clientesActions from '../../../actions/clientes';
import * as SC from './StyledComponents';
import { filterAgenda } from '../../../utils';

const SEARCH_PARAMS = ['razonSocial', 'telefono', 'cuit', 'domicilio', 'localidad', 'provincia'];

class AgendaClientes extends React.Component {
  constructor() {
    super();

    this.state = {
      // Delete cliente
      deleteModalIsOpen: false,
      currentDeleteIdCliente: null,

      // Edit form
      editModalIsOpen: false,
      currentEditCliente: null,

      // Pagination & Filtering
      itemsPerPage: 5,
      filter: '',
      activeFilter: '',
      isFiltering: false,
    };

    // Deleting
    this.openDeleteModal = this.openDeleteModal.bind(this);
    this.closeDeleteModal = this.closeDeleteModal.bind(this);

    // Filtering
    this.openEditModal = this.openEditModal.bind(this);
    this.closeEditModal = this.closeEditModal.bind(this);
    this.handleSubmitEdit = this.handleSubmitEdit.bind(this);
    this.handleFilterChange = this.handleFilterChange.bind(this);
    this.setActiveFilter = this.setActiveFilter.bind(this);
    this.setActiveFilter = debounce(this.setActiveFilter, 500);
  }

  componentDidMount() {
    const { getClientesTodos } = this.props;
    getClientesTodos();
  }

  componentWillReceiveProps(nextProps) {
    const { updateStatus } = nextProps;
    if (!updateStatus.isUpdating &&
      !updateStatus.error &&
      this.props.updateStatus.isUpdating
    ) {
      this.closeEditModal();
    }
  }

  setActiveFilter(activeFilter) {
    this.setState({ activeFilter, isFiltering: true }, () => {
      this.setState({ isFiltering: false });
    });
  }

  openEditModal(cliente) {
    this.setState({
      editModalIsOpen: true,
      currentEditCliente: cliente,
    });
  }

  closeEditModal() {
    const { clearUpdateErrors } = this.props;
    // if (updateStatus.isUpdating) return;
    this.setState({
      editModalIsOpen: false,
      currentEditCliente: null,
    });
    clearUpdateErrors();
  }

  openDeleteModal(id) {
    this.setState({
      deleteModalIsOpen: true,
      currentDeleteIdCliente: id,
    });
  }

  closeDeleteModal() {
    const { deleteStatus, clearDeleteErrors } = this.props;
    if (deleteStatus.isDeleting) return;
    this.setState({
      deleteModalIsOpen: false,
      currentDeleteIdCliente: null,
    });
    clearDeleteErrors();
  }

  handleSubmitEdit(originalCliente) {
    return (newCliente) => {
      const { updateCliente } = this.props;
      Object.keys(newCliente).forEach((k) => {
        // eslint-disable-next-line no-param-reassign
        if (!newCliente[k]) delete newCliente[k];
      });
      updateCliente({
        ...originalCliente,
        ...newCliente,
      });
    };
  }

  handleFilterChange(filter) {
    this.setState({ filter });
  }

  render() {
    const {
      clientesTodos,
      isActive,
      deleteCliente,
      updateStatus,
      deleteStatus,
    } = this.props;
    const {
      currentDeleteIdCliente,
      deleteModalIsOpen,
      currentEditCliente,
      editModalIsOpen,
      itemsPerPage,
      filter,
      activeFilter,
      isFiltering,
    } = this.state;
    if (!isActive) return null;

    return (
      <SC.AgendaClientesWrapper>
        <SC.Title>Clientes</SC.Title>
        <SC.ListaContainer>
          <CustomFilter
            placeholder="Buscar clientes"
            filter={filter}
            onFilterChange={this.handleFilterChange}
            isLoading={isFiltering}
          />
          <ListaAgenda
            itemsPerPage={itemsPerPage}
            items={
              activeFilter.length ?
              filterAgenda(activeFilter, clientesTodos, SEARCH_PARAMS)
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
            onEditContacto={this.openEditModal}
            onDeleteContacto={this.openDeleteModal}
          />
        </SC.ListaContainer>

        { Boolean(editModalIsOpen) &&
          <SC.StyledModal
            isOpen={editModalIsOpen}
            onRequestClose={this.closeEditModal}
          >
            <ClienteForm
              updateStatus={updateStatus}
              razonSocial={currentEditCliente.razonSocial}
              telefono={currentEditCliente.telefono}
              fax={currentEditCliente.fax}
              domicilio={currentEditCliente.domicilio}
              localidad={currentEditCliente.localidad}
              provincia={currentEditCliente.provincia}
              onSubmitEdit={this.handleSubmitEdit(currentEditCliente)}
              onCancel={this.closeEditModal}
              clientesTodos={clientesTodos}
            />
          </SC.StyledModal>
        }

        { Boolean(deleteModalIsOpen) &&
          <ModalConfirm
            isOpen={deleteModalIsOpen}
            title="Eliminar contacto"
            message="¿Esta seguro que desea eliminar el contacto?"
            onAccept={() => deleteCliente(currentDeleteIdCliente)}
            onClose={this.closeDeleteModal}
            isLoading={deleteStatus.isDeleting}
            error={deleteStatus.error}
          />
        }
      </SC.AgendaClientesWrapper>
    );
  }
}


const mapStateToProps = ({ clientes }) => ({
  deleteStatus: clientes.delete,
  updateStatus: clientes.update,
  clientesTodos: clientes.todos.data,
});

const mapDispatchToProps = dispatch => ({
  getClientesTodos: () => dispatch(clientesActions.clientesTodos.request()),
  updateCliente: cliente => dispatch(clientesActions.clientesUpdate.request(cliente)),
  clearUpdateErrors: () => dispatch(clientesActions.clientesUpdate.clearErrors()),
  deleteCliente: id => dispatch(clientesActions.clientesDelete.request(id)),
  clearDeleteErrors: () => dispatch(clientesActions.clientesDelete.clearErrors()),
});


AgendaClientes.propTypes = {
  deleteStatus: PropTypes.shape({
    error: PropTypes.string,
    isDeleting: PropTypes.bool,
  }).isRequired,
  updateStatus: PropTypes.shape({
    error: PropTypes.string,
    isUpdating: PropTypes.bool,
  }).isRequired,
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
  updateCliente: PropTypes.func,
  clearUpdateErrors: PropTypes.func,
  deleteCliente: PropTypes.func,
  clearDeleteErrors: PropTypes.func,
  isActive: PropTypes.bool,
};

AgendaClientes.defaultProps = {
  clientesTodos: [],
  getClientesTodos: () => {},
  updateCliente: () => {},
  clearUpdateErrors: () => {},
  deleteCliente: () => {},
  clearDeleteErrors: () => {},
  isActive: true,
};


export default connect(mapStateToProps, mapDispatchToProps)(AgendaClientes);
