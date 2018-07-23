import React from 'react';
import PropTypes from 'prop-types';
import { withFormik } from 'formik';

import AssocEdiTable from '../AssocTable/AssocEdiTable';
import * as Buttons from '../Buttons';
import * as SC from './StyledComponents';

const createMockEvent = ({ value, type, name }) => ({
  persist: () => {},
  target: {
    type,
    name,
    value,
  },
});

/* eslint-disable react/prop-types */
const InnerForm = ({
  values,
  errors,
  touched,
  handleChange,
  handleBlur,
  handleSubmit,
}) => {
  const tableClientes = {
    headers: [
      { text: 'Razón social', prop: 'razonSocial' },
      { text: 'Telefono', prop: 'telefono' },
    ],
    data: values.clientes,
    buttons: [
      {
        type: 'delete',
        handlerFactory: id => () => {
          handleChange(createMockEvent({
            name: 'clientes',
            value: values.clientes.filter(c => c.id !== id),
            type: 'clientes',
          }));
        },
      },
    ],
  };
  const tableContactos = {
    headers: [
      { text: 'Nombre', prop: 'nombre' },
      { text: 'Mail', prop: 'mail' },
    ],
    data: values.contactos,
    buttons: [
      {
        type: 'delete',
        handlerFactory: id => () => {
          handleChange(createMockEvent({
            name: 'contactos',
            value: values.contactos.filter(c => c.id !== id),
            type: 'contactos',
          }));
        },
      },
    ],
  };
  return (
    <form onSubmit={handleSubmit}>
      <SC.NuevoTrabajoContainer>
        <SC.CustomDatePicker
          name="fechaPedido"
          value={values.fechaPedido}
          onBlur={handleBlur}
          onChange={d => handleChange(createMockEvent({
            name: 'fechaPedido',
            value: d.toDate(),
            type: 'date',
          }))}
        />
        <SC.TextField
          name="nombre"
          label="Nombre"
          value={values.nombre}
          onChange={handleChange}
          onBlur={handleBlur}
          margin="normal"
          fullWidth
          autoComplete="off"
        />
        {touched.nombre && errors.nombre && <SC.Error data-cy-type="inputError">{errors.nombre}</SC.Error>}

        <SC.CustomSelect
          label="Tipo de trabajo"
          name="tipoTrabajo"
          value={values.tipoTrabajo}
          onChange={handleChange}
          items={values.tiposTrabajos}
        />
        {touched.tipoTrabajo && errors.tipoTrabajo && <SC.Error data-cy-type="inputError">{errors.tipoTrabajo}</SC.Error>}

        <SC.SectionTitle>Clientes</SC.SectionTitle>
        <AssocEdiTable
          assocTableProps={tableClientes}
          autocompleteProps={{
            items: values.clientesTodos.map(c => c.razonSocial),
            opts: {
              name: 'razonSocial',
              placeholder: 'Agregar cliente',
              disableUnderline: true,
            },
          }}
          onAdd={(val) => {
            const target = values.clientesTodos.find(c => c.razonSocial === val);
            if (!target) return;
            handleChange(createMockEvent({
              name: 'clientes',
              value: [...values.clientes, target],
              type: 'clientes',
            }));
          }}
        />

        <SC.SectionTitle>Contactos</SC.SectionTitle>
        <AssocEdiTable
          assocTableProps={tableContactos}
          autocompleteProps={{
            items: values.contactosTodos.map(c => c.nombre),
            opts: {
              name: 'nombre',
              placeholder: 'Agregar contacto',
              disableUnderline: true,
            },
          }}
          onAdd={(val) => {
            const target = values.contactosTodos.find(c => c.nombre === val);
            if (!target) return;
            handleChange(createMockEvent({
              name: 'contactos',
              value: [...values.contactos, target],
              type: 'contactos',
            }));
          }}
        />

        <SC.Buttonera>
          <Buttons.MainButton
            text="Generar"
            type="submit"
          />
        </SC.Buttonera>
      </SC.NuevoTrabajoContainer>
    </form>
  );
};
/* eslint-enable react/prop-types */

// Wrap our form with the using withFormik HoC
const NuevoTrabajo = withFormik({
  // Transform outer props into form values
  mapPropsToValues: props => ({
    nombre: '',
    fechaPedido: new Date(),
    tipoTrabajo: '',
    clientes: [],
    contactos: [],
    tiposTrabajos: props.tiposTrabajos,
    clientesTodos: props.clientes,
    contactosTodos: props.contactos,
  }),
  // Add a custom validation function (this can be async too!)
  validate: (values) => {
    const errors = {};
    if (!values.nombre) {
      errors.nombre = 'Required';
    }
    if (!values.tipoTrabajo) {
      errors.tipoTrabajo = 'Required';
    }
    return errors;
  },
  // Submission handler
  handleSubmit: (
    values,
    { setSubmitting, props },
  ) => {
    props.crearTrabajo({
      fechaPedido: values.fechaPedido,
      nombre: values.nombre,
      tipoTrabajo: values.tipoTrabajo,
      clientes: values.clientes,
      contactos: values.contactos,
    });
    setSubmitting(false);
  },
})(InnerForm);


NuevoTrabajo.propTypes = {
  crearTrabajo: PropTypes.func.isRequired,
  clientes: PropTypes.arrayOf(PropTypes.shape({
    razonSocial: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
  })).isRequired,
  contactos: PropTypes.arrayOf(PropTypes.shape({
    nombre: PropTypes.string.isRequired,
    mail: PropTypes.string.isRequired,
  })).isRequired,
};


export default NuevoTrabajo;
