import React from 'react';
import PropTypes from 'prop-types';
import * as SC from './StyledComponents';
import * as Buttons from '../Buttons';
import InputAutocomplete from '../InputAutocomplete';


const INITIAL_STATE = {
  razonSocial: '',
  'OT/SOT/RUT': '',
  legajo: '',
  finalizado: {
    active: false,
    value: false,
  },
  presupuesto: {
    active: false,
    value: false,
  },
};

export default class Seeker extends React.Component {
  constructor(props) {
    super(props);

    this.state = INITIAL_STATE;

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleResetClick = this.handleResetClick.bind(this);
    this.handleAutoInputChange = this.handleAutoInputChange.bind(this);
  }

  handleResetClick() {
    this.setState(INITIAL_STATE);
  }

  handleInputChange(event) {
    const { target } = event;
    const { name } = target;
    if (target.type === 'checkbox') return;
    const { value } = target;
    this.setState({
      ...this.state,
      [name]: value,
    });
  }

  handleCheckChange(type) {
    return (e) => {
      const { target } = e;
      const { name } = target;
      const value = target.checked;
      if (type === 'checkbox') {
        this.setState({
          ...this.state,
          [name]: {
            ...this.state[name],
            value,
          },
        });
      } else if (type === 'switch') {
        this.setState({
          ...this.state,
          [name]: {
            ...this.state[name],
            active: value,
          },
        });
      }
    };
  }

  handleAutoInputChange(item, name) {
    this.setState({
      [name]: item,
    });
  }

  render() {
    return (
      <React.Fragment>
        <SC.FiltroTitle>Buscar trabajo</SC.FiltroTitle>

        <InputAutocomplete
          items={['apple', 'orange', 'carrot']}
          onChange={(selectedItem) => {
            this.handleAutoInputChange(selectedItem, 'razonSocial');
          }}
          opts={{
            name: 'razonSocial',
            label: 'Razón social',
          }}
        />
        <SC.FilterInput
          name="OT/SOT/RUT"
          label="OT/SOT/RUT"
          value={this.state['OT/SOT/RUT']}
          onChange={this.handleInputChange}
        />
        <SC.FilterInput
          label="Legajo N°"
          name="legajo"
          value={this.state.legajo}
          onChange={this.handleInputChange}
        />

        <SC.FilterToggleable
          name="presupuesto"
          value={this.state.presupuesto.value}
          onChangeSwitch={this.handleCheckChange('switch')}
          onChangeCheckbox={this.handleCheckChange('checkbox')}
          checkedSwitch={this.state.presupuesto.active}
          checkedCheckbox={this.state.presupuesto.value}
          labelText="Presupuesto aceptado"
        />

        <SC.FilterToggleable
          name="finalizado"
          value={this.state.finalizado.value}
          onChangeSwitch={this.handleCheckChange('switch')}
          onChangeCheckbox={this.handleCheckChange('checkbox')}
          checkedSwitch={this.state.finalizado.active}
          checkedCheckbox={this.state.finalizado.value}
          labelText="Trabajo finalizado"
        />

        <SC.ButtonContainer>
          <Buttons.SecondaryButton text="Reset" onClick={this.handleResetClick} />
          <Buttons.PrimaryButton text="Buscar" onClick={this.props.handleSearch} />
        </SC.ButtonContainer>

      </React.Fragment>
    );
  }
}


Seeker.propTypes = {
  handleSearch: PropTypes.func,
};

Seeker.defaultProps = {
  handleSearch: () => {},
};
