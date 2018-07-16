import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import debounce from 'lodash.debounce';

import ModalConfirm from '../../../components/ModalConfirm';
import CustomFilter from '../../../components/CustomFilter';
import ListaAgenda from '../../../components/ListaAgenda';
import ContactoForm from '../../../components/EditForms/ContactoForm';
import * as SC from './StyledComponents';
import * as actions from '../../../actions/contactos';
import { filterAgenda } from '../../../utils';


const SEARCH_PARAMS = ['nombre', 'mail'];


class AgendaContactos extends React.Component {
  constructor() {
    super();
    this.state = {
      // Delete contacto
      deleteModalIsOpen: false,
      currentDeleteIdContacto: null,

      // Edit form
      editModalIsOpen: false,
      currentEditContacto: null,

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
    const { getContactosTodos } = this.props;
    getContactosTodos();
  }

  componentWillReceiveProps(nextProps) {
    const { updateStatus } = nextProps;
    if (!updateStatus.isUpdating &&
      !updateStatus.error.length &&
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

  openEditModal(contacto) {
    this.setState({
      editModalIsOpen: true,
      currentEditContacto: contacto,
    });
  }

  closeEditModal() {
    const { updateStatus, clearUpdateErrors } = this.props;
    if (updateStatus.isUpdating) return;
    this.setState({
      editModalIsOpen: false,
      currentEditContacto: null,
    });
    clearUpdateErrors();
  }

  openDeleteModal(id) {
    this.setState({
      deleteModalIsOpen: true,
      currentDeleteIdContacto: id,
    });
  }

  closeDeleteModal() {
    const { deleteStatus, clearDeleteErrors } = this.props;
    if (deleteStatus.isDeleting) return;
    this.setState({
      deleteModalIsOpen: false,
      currentDeleteIdContacto: null,
    });
    clearDeleteErrors();
  }

  handleSubmitEdit(originalContacto) {
    return (newContacto) => {
      const { updateContacto } = this.props;
      updateContacto({
        ...originalContacto,
        ...newContacto,
      });
    };
  }

  handleFilterChange(filter) {
    this.setState({ filter });
    this.setActiveFilter(filter);
  }

  render() {
    const {
      clientesTodos,
      contactosTodos,
      isActive,
      deleteContacto,
      updateStatus,
      deleteStatus,
    } = this.props;
    const {
      currentDeleteIdContacto,
      deleteModalIsOpen,
      currentEditContacto,
      editModalIsOpen,
      itemsPerPage,
      filter,
      activeFilter,
      isFiltering,
    } = this.state;
    if (!isActive) return null;
    return (
      <SC.AgendaContactosWrapper>
        <SC.Title data-type="title">Contactos</SC.Title>

        <SC.ListaContainer>
          <CustomFilter
            placeholder="Buscar contactos"
            filter={filter}
            onFilterChange={this.handleFilterChange}
            isLoading={isFiltering}
          />
          <ListaAgenda
            itemsPerPage={itemsPerPage}
            items={
              activeFilter.length ?
              filterAgenda(activeFilter, contactosTodos, SEARCH_PARAMS)
              : contactosTodos
            }
            fieldNameMap={{
              nombre: 'Nombre y apellido',
              mail: 'Email',
            }}
            tableDataField="clientes"
            tableHeaders={[
              { text: 'Razón social', prop: 'razonSocial' },
              { text: 'Telefono', prop: 'telefono' },
            ]}
            onEditContacto={this.openEditModal}
            onDeleteContacto={this.openDeleteModal}
          />
        </SC.ListaContainer>

        { Boolean(editModalIsOpen) &&
          <SC.StyledModal
            isOpen={editModalIsOpen}
            onRequestClose={this.closeEditModal}
          >
            <ContactoForm
              updateStatus={updateStatus}
              nombre={currentEditContacto.nombre}
              mail={currentEditContacto.mail}
              clientes={currentEditContacto.clientes}
              onSubmitEdit={this.handleSubmitEdit(currentEditContacto)}
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
            onAccept={() => deleteContacto(currentDeleteIdContacto)}
            onClose={this.closeDeleteModal}
            isLoading={deleteStatus.isDeleting}
            error={deleteStatus.error}
          />
        }
      </SC.AgendaContactosWrapper>
    );
  }
}


const mapStateToProps = ({ contactos, clientes }) => ({
  deleteStatus: contactos.delete,
  updateStatus: contactos.update,
  contactosTodos: contactos.data,
  clientesTodos: clientes.todos.data,
});

const mapDispatchToProps = dispatch => ({
  getContactosTodos: () => dispatch(actions.contactosTodos.request()),
  updateContacto: contacto => dispatch(actions.contactoUpdate.request(contacto)),
  clearUpdateErrors: () => dispatch(actions.contactoUpdate.clearErrors()),
  deleteContacto: id => dispatch(actions.contactoDelete.request(id)),
  clearDeleteErrors: () => dispatch(actions.contactoDelete.clearErrors()),
});

AgendaContactos.propTypes = {
  deleteStatus: PropTypes.shape({
    error: PropTypes.string,
    isDeleting: PropTypes.bool,
  }),
  updateStatus: PropTypes.shape({
    error: PropTypes.string,
    isUpdating: PropTypes.bool,
  }),
  contactosTodos: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    nombre: PropTypes.string,
    mail: PropTypes.string,
    clientes: PropTypes.arrayOf(PropTypes.shape({})),
  })),
  clientesTodos: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
  })),
  getContactosTodos: PropTypes.func,
  updateContacto: PropTypes.func,
  clearUpdateErrors: PropTypes.func,
  deleteContacto: PropTypes.func,
  clearDeleteErrors: PropTypes.func,
  isActive: PropTypes.bool,
};

AgendaContactos.defaultProps = {
  deleteStatus: {
    error: null,
    isDeleting: false,
  },
  updateStatus: {
    error: null,
    isUpdating: false,
  },
  contactosTodos: [],
  clientesTodos: [],
  getContactosTodos: () => {},
  updateContacto: () => {},
  clearUpdateErrors: () => {},
  deleteContacto: () => {},
  clearDeleteErrors: () => {},
  isActive: true,
};


export default connect(mapStateToProps, mapDispatchToProps)(AgendaContactos);
