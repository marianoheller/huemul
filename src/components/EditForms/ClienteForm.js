import React from 'react';
import PropTypes from 'prop-types';

import EditForm from './EditForm';


export default class ClienteForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      razonSocial: props.razonSocial,
      telefono: props.telefono,
      fax: props.fax,
      domicilio: props.domicilio,
      localidad: props.localidad,
      provincia: props.provincia,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(name) {
    return (e) => {
      this.setState({ [name]: e.currentTarget.value });
    };
  }

  handleSubmit() {
    const { onSubmitEdit } = this.props;
    const {
      id,
      razonSocial,
      telefono,
      fax,
      domicilio,
      localidad,
      provincia,
    } = this.state;
    onSubmitEdit({
      id,
      razonSocial,
      telefono,
      fax,
      domicilio,
      localidad,
      provincia,
    });
  }

  render() {
    const {
      razonSocial,
      telefono,
      fax,
      domicilio,
      localidad,
      provincia,
    } = this.state;
    const { onCancel, updateStatus } = this.props;
    const textFields = [
      {
        name: 'razonSocial',
        label: 'Razón social',
        value: razonSocial,
        onChange: this.handleChange('razonSocial'),
      },
      {
        name: 'telefono',
        label: 'Telefono',
        value: telefono,
        onChange: this.handleChange('telefono'),
      },
      {
        name: 'fax',
        label: 'Fax',
        value: fax,
        onChange: this.handleChange('fax'),
      },
      {
        name: 'domicilio',
        label: 'Domicilio',
        value: domicilio,
        onChange: this.handleChange('domicilio'),
      },
      {
        name: 'localidad',
        label: 'Localidad',
        value: localidad,
        onChange: this.handleChange('localidad'),
      },
      {
        name: 'provincia',
        label: 'Provincia',
        value: provincia,
        onChange: this.handleChange('provincia'),
      },
    ];
    return (
      <EditForm
        updateStatus={updateStatus}
        textFields={textFields}
        onSubmit={this.handleSubmit}
        onCancel={onCancel}
      />
    );
  }
}


ClienteForm.propTypes = {
  updateStatus: PropTypes.shape({
    error: PropTypes.string,
    isUpdating: PropTypes.bool,
  }),
  razonSocial: PropTypes.string.isRequired,
  telefono: PropTypes.string,
  fax: PropTypes.string,
  domicilio: PropTypes.string,
  localidad: PropTypes.string,
  provincia: PropTypes.string,
  onSubmitEdit: PropTypes.func,
  onCancel: PropTypes.func,
};

ClienteForm.defaultProps = {
  updateStatus: {
    error: '',
    isUpdating: false,
  },
  telefono: '',
  fax: '',
  domicilio: '',
  localidad: '',
  provincia: '',
  onSubmitEdit: () => {},
  onCancel: () => {},
};

