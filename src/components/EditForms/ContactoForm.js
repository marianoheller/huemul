import React from 'react';
import PropTypes from 'prop-types';

import EditForm from './EditForm';


export default class ContactoForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nombre: props.nombre,
      mail: props.mail,
      clientes: props.clientes,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleRemoveCliente = this.handleRemoveCliente.bind(this);
    this.handleAddCliente = this.handleAddCliente.bind(this);
  }

  handleChange(name) {
    return (e) => {
      this.setState({ [name]: e.currentTarget.value });
    };
  }

  handleAddCliente(clienteNuevo, cb) {
    if (!clienteNuevo) return;
    const { clientesTodos } = this.props;
    const clienteObj = clientesTodos.find(c => c.razonSocial === clienteNuevo);
    if (!clienteObj) return;
    if (this.state.clientes.find(c => clienteObj.id === c.id)) return;
    this.setState({
      clientes: [
        ...this.state.clientes,
        clienteObj,
      ],
    }, () => { if (cb) cb(); });
  }

  handleRemoveCliente(id) {
    return () => {
      this.setState({
        clientes: this.state.clientes.filter(c => c.id !== id),
      });
    };
  }

  handleSubmit() {
    const { onSubmitEdit } = this.props;
    const { nombre, mail, clientes } = this.state;
    onSubmitEdit({
      nombre,
      mail,
      clientes,
    });
  }

  render() {
    const { nombre, mail, clientes } = this.state;
    const { onCancel, clientesTodos, updateStatus } = this.props;
    const textFields = [
      {
        name: 'nombre',
        label: 'Nombre',
        value: nombre,
        onChange: this.handleChange('nombre'),
      },
      {
        name: 'mail',
        label: 'Email',
        value: mail,
        onChange: this.handleChange('mail'),
      },
    ];
    const table = {
      headers: [
        { text: 'Razón social', prop: 'razonSocial' },
        { text: 'Telefono', prop: 'telefono' },
      ],
      data: clientes,
      buttons: [
        { type: 'delete', handlerFactory: this.handleRemoveCliente },
      ],
    };
    const autocompleteOpts = {
      name: 'razonSocial',
      placeholder: 'Agregar cliente',
      disableUnderline: true,
    };
    return (
      <EditForm
        updateStatus={updateStatus}
        textFields={textFields}
        onSubmit={this.handleSubmit}
        onCancel={onCancel}
        table={table}
        autocomplete={{
          items: clientesTodos.map(c => c.razonSocial),
          onAdd: this.handleAddCliente,
          opts: autocompleteOpts,
        }}
      />
    );
  }
}


ContactoForm.propTypes = {
  updateStatus: PropTypes.shape({
    error: PropTypes.string,
    isUpdating: PropTypes.bool,
  }),
  nombre: PropTypes.string,
  mail: PropTypes.string,
  clientes: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    razonSocial: PropTypes.string.isRequired,
    telefono: PropTypes.string,
    fax: PropTypes.string,
    domicilio: PropTypes.string,
    localidad: PropTypes.string,
    provincia: PropTypes.string,
  })),
  onSubmitEdit: PropTypes.func,
  onCancel: PropTypes.func,
  clientesTodos: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
  })),
};

ContactoForm.defaultProps = {
  updateStatus: {
    error: '',
    isUpdating: false,
  },
  nombre: '',
  mail: '',
  clientes: [],
  onSubmitEdit: () => {},
  onCancel: () => {},
  clientesTodos: [],
};

