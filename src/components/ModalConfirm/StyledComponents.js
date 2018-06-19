/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';
import Modal from 'react-modal';

import { adjustHexOpacity } from '../../utils';

Modal.setAppElement('#root');


export const Title = styled.div`
  font-size: 1.5rem;
  font-weight: 300;
  color: ${props => props.theme.palette.primary[300]};
`;

export const Message = styled.div`
  font-weight: 300;
  color: ${props => props.theme.palette.secondary[300]};
`;

export const BottomContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 1rem;
`;

export const StatusContainer = styled.div`
  color: ${props => props.theme.status.danger[300]};
  font-size: 0.75rem;
  font-weight: 300;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Buttonera = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`;

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 1rem;
`;

function __Modal({ children, ...rest }) {
  return (
    <Modal
      {...rest}
      style={{ overlay: { backgroundColor: 'rgba(10, 10, 10, 0.75)', zIndex: 101 } }}
    >
      {children}
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
