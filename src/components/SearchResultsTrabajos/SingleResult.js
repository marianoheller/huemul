import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Transition, animated } from 'react-spring';

import { adjustHexOpacity } from '../../utils';

const ResultContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 0.5rem 1rem;
  text-align: left;
  cursor: pointer;
  user-select: none;

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
`;

export default function SingleResult(props) {
  const {
    isActive,
    onClick,
    legajo,
    nombre,
    fechaPedido,
    clientes,
    contactos,
  } = props;
  return (
    <ResultContainer onClick={onClick}>
      <Transition
        from={{ opacity: 0, height: 0 }}
        enter={{ opacity: 1, height: 20 }}
        leave={{ opacity: 0, height: 0 }}
      >
        {isActive ?
          // Gotta use brackets cuz babel doesn't like terneary + arrow functions wo parenthesis
          // Fixed in babel 7
          /* eslint-disable arrow-body-style */
          (style) => {
            return (
              <animated.div style={style}>
                <div>Legajo: {legajo}</div>
                <div>Nombre: {nombre}</div>
                <div>Fecha pedido: {fechaPedido}</div>
                <div>Clientes: {clientes.length}</div>
                <div>Contactos: {contactos.length}</div>
              </animated.div>
            );
          }
        :
          /* eslint-disable arrow-body-style */
          (style) => {
            return (
              <animated.div style={style}>
                <div>Legajo: {legajo}</div>
                <div>Nombre: {nombre}</div>
              </animated.div>
            );
          }
        }
      </Transition>
    </ResultContainer>
  );
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
