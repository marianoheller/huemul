import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Spring, config } from 'react-spring';
import { ArrowForward } from '@material-ui/icons';

import { adjustHexOpacity } from '../../utils';

const ResultMainContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
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

const IconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

/* eslint-disable-next-line react/prop-types */
const ArrowForwardWrapper = ({ style }) => {
  const { rotation, ...rest } = style;
  return (
    <div
      style={{ transform: `rotate(${rotation})` }}
      {...rest}
    >
      <ArrowForward />
    </div>
  );
};


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
      <ResultMainContainer onClick={onClick}>
        <IconContainer>
          <Spring
            to={{
              rotation: isActive ? '90deg' : '0deg',
            }}
          >
            {style => <ArrowForwardWrapper style={style} />}
          </Spring>
        </IconContainer>
        <Spring
          from={{}} /* Empty initial "from" so it starts at the right height */
          to={isActive ? { height: 'auto', opacity: 1 } : { height: 'auto', opacity: 1.1 }}
          config={config.gentle}
        >
          {/* Gotta disable eslint and do brackets cuz babel doesnt like ternary with arrow func */}
          {/* eslint-disable-next-line arrow-body-style */}
          {isActive ? (style) => {
            return (
              <ContentWrapper style={style}>
                <div>Legajo: {legajo}</div>
                <div>Nombre: {nombre}</div>
                <div>Fecha pedido: {fechaPedido}</div>
                <div>Clientes: {clientes.length}</div>
                <div>Contactos: {contactos.length}</div>
              </ContentWrapper>
            );
          }
          :
          /* eslint-disable-next-line arrow-body-style */
          (style) => {
            return (
              <ContentWrapper style={style}>
                <div>Legajo: {legajo}</div>
                <div>Nombre: {nombre}</div>
              </ContentWrapper>
            );
          }}
        </Spring>
      </ResultMainContainer>
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
