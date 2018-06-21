import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import NuevoTrabajo from '../../../components/NuevoTrabajo';
import * as actions from '../../../actions/trabajos';
import * as SC from './StyledComponents';


class NuevoTrabajoContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      trabajo: {
        nombre: '',
        tipoTrabajo: '',
        fechaPedido: new Date(),
        clientes: [],
        contactos: [],
      },
    };

    this.handleChangeTrabajo = this.handleChangeTrabajo.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
  }

  handleChangeTrabajo(name) {
    switch (name) {
      case 'contactos':
        return (val) => {
          const { contactosTodos } = this.props;
          const target = contactosTodos.find(c => c.nombre === val);
          this.setState({
            ...this.state,
            trabajo: {
              ...this.state.trabajo,
              [name]: [...this.state.trabajo[name], target],
            },
          });
        };
      case 'clientes':
        return (val) => {
          const { clientesTodos } = this.props;
          const target = clientesTodos.find(c => c.razonSocial === val);
          this.setState({
            ...this.state,
            trabajo: {
              ...this.state.trabajo,
              [name]: [...this.state.trabajo[name], target],
            },
          });
        };
      case 'fechaPedido':
        return date => this.setState({
          trabajo: {
            ...this.state,
            [name]: date.toDate(),
          },
        });
      case 'nombre':
      case 'tipoTrabajo':
        return val => (
          this.setState({
            ...this.state,
            trabajo: {
              ...this.state.trabajo,
              [name]: val,
            },
          })
        );
      default:
        return () => {};
    }
  }

  handleRemove(name) {
    if (name === 'clientes' || name === 'contactos') {
      return id => () => (this.setState({
        ...this.state,
        trabajo: {
          ...this.state.trabajo,
          [name]: this.state.trabajo[name].filter(e => e.id !== id),
        },
      }));
    }
    return () => {};
  }

  render() {
    const { trabajo } = this.state;
    const { crearTrabajo, contactosTodos, clientesTodos } = this.props;
    return (
      <SC.NuevoTrabajoContainer>
        <SC.Title>Generar trabajo</SC.Title>
        <NuevoTrabajo
          crearTrabajo={crearTrabajo}
          trabajo={trabajo}
          tiposTrabajos={[
            { value: 'asd', text: 'qqqqq' },
            { value: '2asd', text: '2qqqqq' },
          ]}
          contactos={contactosTodos}
          clientes={clientesTodos}
        />
      </SC.NuevoTrabajoContainer>
    );
  }
}

NuevoTrabajoContainer.propTypes = {
  crearTrabajo: PropTypes.func,
  contactosTodos: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    nombre: PropTypes.string,
  })),
  clientesTodos: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    razonSocial: PropTypes.string,
  })),
};

NuevoTrabajoContainer.defaultProps = {
  crearTrabajo: () => {},
  contactosTodos: [],
  clientesTodos: [],
};

const mapStateToProps = ({ contactos, clientes }) => ({
  contactosTodos: contactos.data,
  clientesTodos: clientes.todos.data,
});

const mapDispatchToProps = dispatch => ({
  crearTrabajo: (data) => {
    const keys = [
      'fechaPedido',
      'nombre',
      'tipoTrabajo',
      'clientes',
      'contactos',
    ];
    // eslint-disable-next-line no-prototype-builtins
    if (keys.some(k => !data.hasOwnProperty(k))) return;
    dispatch(actions.trabajoNuevo.request(data));
  },
});


export default connect(mapStateToProps, mapDispatchToProps)(NuevoTrabajoContainer);
