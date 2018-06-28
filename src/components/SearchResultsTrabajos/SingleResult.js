import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Spring, config } from 'react-spring';

import { adjustHexOpacity } from '../../utils';

const ResultContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 0.5rem 1rem;
  text-align: left;
  cursor: pointer;
  user-select: none;
  overflow: hidden;

  border-color: ${props => adjustHexOpacity(props.theme.palette.primary[300], 0.5)};
  border-width: 1px;
  border-style: solid;

  &:not(:last-child) {
    margin-bottom: 0.5rem;
  }

  &:hover {
    background-color: ${props => props.theme.palette.primary[300]};
    color: white;
  }

  & > div {
    position: relative;
    top: 0;
    right: 0;
    left: 0;
  }
`;

export default class SingleResult extends React.Component {
  constructor() {
    super();
    this.renderCount = 0;
  }
  componentDidMount() {
    this.renderCount = this.renderCount + 1;
  }

  componentDidUpdate() {
    this.renderCount = this.renderCount + 1;
  }

  render() {
    const {
      isActive,
      onClick,
      legajo,
      nombre,
      fechaPedido,
      clientes,
      contactos,
    } = this.props;
    return (
      <ResultContainer onClick={onClick}>
        <Spring
          from={this.renderCount === 0 ? {} : { height: 0, opacity: 0 }}
          to={isActive ? { height: 'auto', opacity: 1 } : { height: 'auto', opacity: 1.1 }}
          config={config.gentle}
        >
          {/* eslint-disable-next-line arrow-body-style */}
          {isActive ? (style) => {
            return (
              <div style={style}>
                <div>Legajo: {legajo}</div>
                <div>Nombre: {nombre}</div>
                <div>Fecha pedido: {fechaPedido}</div>
                <div>Clientes: {clientes.length}</div>
                <div>Contactos: {contactos.length}</div>
              </div>
            );
          }
          :
          /* eslint-disable-next-line arrow-body-style */
          (style) => {
            return (
              <div style={style}>
                <div>Legajo: {legajo}</div>
                <div>Nombre: {nombre}</div>
              </div>
            );
          }}
        </Spring>
      </ResultContainer>
    );
  }
}

SingleResult.propTypes = {
  isActive: PropTypes.bool,
  onClick: PropTypes.func,
  legajo: PropTypes.string.isRequired,
  nombre: PropTypes.string.isRequired,
  fechaPedido: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.instanceOf(Date),
  ]).isRequired,
  clientes: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  contactos: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

SingleResult.defaultProps = {
  isActive: false,
  onClick: () => {},
};
