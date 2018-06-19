import React from 'react';
import PropTypes from 'prop-types';

import AssocEdiTable from '../AssocTable/AssocEdiTable';
import * as Buttons from '../Buttons';
import * as SC from './StyledComponents';


export default function NuevoTrabajo(props) {
  const {
    crearTrabajo,
    handleChange,
    handleRemove,
    trabajo,
    clientes,
    contactos,
  } = props;

  const tableClientes = {
    headers: [
      { text: 'Razón social', prop: 'razonSocial' },
      { text: 'Telefono', prop: 'telefono' },
    ],
    data: trabajo.clientes,
    buttons: [
      { type: 'delete', handlerFactory: handleRemove('clientes') },
    ],
  };

  const tableContactos = {
    headers: [
      { text: 'Nombre', prop: 'nombre' },
      { text: 'Mail', prop: 'mail' },
    ],
    data: trabajo.contactos,
    buttons: [
      { type: 'delete', handlerFactory: handleRemove('contactos') },
    ],
  };
  return (
    <SC.NuevoTrabajoContainer>
      <SC.CustomDatePicker
        value={trabajo.fechaPedido}
        onChange={handleChange('fechaPedido')}
      />
      <SC.TextField
        id="name"
        label="Nombre"
        value={trabajo.nombre}
        onChange={handleChange('nombre')}
        margin="normal"
        fullWidth
      />
      <SC.CustomSelect
        label="Tipo de trabajo"
        name="tipoTrabajo"
        value={trabajo.tipoTrabajo}
        onChange={handleChange('tipoTrabajo')}
        items={[
          { value: 'asd', text: 'qqqqq' },
          { value: '2asd', text: '2qqqqq' },
        ]}
      />

      <SC.SectionTitle>Clientes</SC.SectionTitle>
      <AssocEdiTable
        assocTableProps={tableClientes}
        autocompleteProps={{
          items: clientes.map(c => c.razonSocial),
          opts: {
            name: 'razonSocial',
            placeholder: 'Agregar cliente',
            disableUnderline: true,
          },
        }}
        onAdd={handleChange('clientes')}
      />

      <SC.SectionTitle>Contactos</SC.SectionTitle>
      <AssocEdiTable
        assocTableProps={tableContactos}
        autocompleteProps={{
          items: contactos.map(c => c.nombre),
          opts: {
            name: 'nombre',
            placeholder: 'Agregar contacto',
            disableUnderline: true,
          },
        }}
        onAdd={handleChange('contactos')}
      />

      <SC.Buttonera>
        <Buttons.MainButton
          text="Generar"
          onClick={() => crearTrabajo(trabajo)}
        />
      </SC.Buttonera>
    </SC.NuevoTrabajoContainer>
  );
}

NuevoTrabajo.propTypes = {
  crearTrabajo: PropTypes.func,
  handleChange: PropTypes.func,
  handleRemove: PropTypes.func,
  trabajo: PropTypes.shape({
    fechaPedido: PropTypes.instanceOf(Date),
    nombre: PropTypes.string,
    tipoTrabajo: PropTypes.string,
    clientes: PropTypes.array,
    contactos: PropTypes.array,
  }),
  clientes: PropTypes.arrayOf(PropTypes.shape({
    razonSocial: PropTypes.string,
    id: PropTypes.number,
  })),
  contactos: PropTypes.arrayOf(PropTypes.shape({
    nombre: PropTypes.string,
    mail: PropTypes.string,
  })),
};

NuevoTrabajo.defaultProps = {
  crearTrabajo: () => {},
  handleChange: () => {},
  handleRemove: () => {},
  trabajo: {
    fechaPedido: new Date(),
    nombre: '',
    tipoTrabajo: '',
    clientes: [],
    contactos: [],
  },
  clientes: [],
  contactos: [],
};
