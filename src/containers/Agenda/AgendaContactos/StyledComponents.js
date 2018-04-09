/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';
import Modal from 'react-modal';

import { adjustHexOpacity } from '../../../utils';

Modal.setAppElement('#root');

export const AgendaContactosWrapper = styled.div`
display: flex;
flex-direction: column;
text-align: center;

padding-top: 2rem;
`;
export const Title = styled.div`
font-weight: 300;
font-size: 1.75rem;
color: ${props => props.theme.palette.primary[300]};
margin-bottom: 1rem;
cursor: default;
`;
export const ListaContainer = styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;

margin-right: 10vw;
margin-left: 10vw;

@media only screen and (max-width: 1400px) {
  margin-left: 5vw;
  margin-right: 5vw;
}

@media only screen and (max-width: 768px) {
  margin-left: 3vw;
  margin-right: 3vw;
}
`;


function __Modal(props) {
  return (
    <Modal
      {...props}
      style={{ overlay: { backgroundColor: 'rgba(10, 10, 10, 0.75)', zIndex: 101 } }}
    >
      {props.children}
    </Modal>
  );
}

export const StyledModal = styled(__Modal)`
margin: 15vh 20vw;
padding-top: 2rem;
padding-right: 4rem;
padding-left: 4rem;
background-color: ${props => props.theme.background.primary};
box-shadow: 0px 5px 5px -3px rgba(0, 0, 0, 0.2), 0px 8px 10px 1px rgba(0, 0, 0, 0.14), 0px 3px 14px 2px rgba(0, 0, 0, 0.12);

outline: none;
border-color: ${props => adjustHexOpacity(props.theme.palette.primary[300], 0.25)};
border-width: 1px;
border-style: solid;

@media only screen and (max-width: 800px) {
  padding-left: 3rem;
  padding-right: 3rem;
  margin-left: 10vw;
  margin-right: 10vw;
}

@media only screen and (max-width: 800px) {
  padding-left: 2rem;
  padding-right: 2rem;
}

@media only screen and (max-width: 600px) {
  padding-left: 1rem;
  padding-right: 1rem;
}
`;
