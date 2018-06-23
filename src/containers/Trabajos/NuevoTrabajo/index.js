import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import CircularProgress from '@material-ui/core/CircularProgress';

import NuevoTrabajo from '../../../components/NuevoTrabajo';
import * as actions from '../../../actions/trabajos';
import * as SC from './StyledComponents';


function NuevoTrabajoContainer(props) {
  const {
    crearTrabajo,
    contactosTodos,
    clientesTodos,
    error,
    isFetching,
  } = props;
  return (
    <SC.NuevoTrabajoContainer>
      <SC.Title>Generar trabajo</SC.Title>
      <NuevoTrabajo
        crearTrabajo={crearTrabajo}
        error={error}
        tiposTrabajos={[
          { value: 'asd', text: 'qqqqq' },
          { value: '2asd', text: '2qqqqq' },
        ]}
        contactos={contactosTodos}
        clientes={clientesTodos}
      />
      {Boolean(error) && <SC.Error>{error}</SC.Error>}
      { Boolean(isFetching) &&
        <SC.SpinnerContainer>
          <CircularProgress color="primary" size={40} />
        </SC.SpinnerContainer>
      }
    </SC.NuevoTrabajoContainer>
  );
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
  error: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({}),
  ]),
  isFetching: PropTypes.bool,
};

NuevoTrabajoContainer.defaultProps = {
  crearTrabajo: () => {},
  contactosTodos: [],
  clientesTodos: [],
  error: null,
  isFetching: false,
};

const mapStateToProps = ({ contactos, clientes, trabajos }) => ({
  contactosTodos: contactos.data,
  clientesTodos: clientes.todos.data,
  error: trabajos.nuevo.error,
  isFetching: trabajos.nuevo.isFetching,
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
