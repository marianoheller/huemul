import React from 'react';
import styled from 'styled-components';

import TrabajoSeeker from '../../components/TrabajoSeeker';
import Calendar from '../../components/Calendar';


const PlanificadorContainer = styled.div`
  display: flex;
  flex-direction: column;
  
  align-items: center;
  justify-content: center;

  width: 90vw;
  margin-left: 5vw;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;

  & > div {
    margin-right: 1rem;
  }
  & > div:last-child {
    margin-right: 0;
  }
`;

const Title = styled.div`
  font-weight: 100;
  color: ${props => props.theme.palette.primary[300]};
  font-size: 3rem;
  margin-top: 2rem;
  cursor: default;
`;

export default function CalendarioAGH() {
  return (
    <PlanificadorContainer>
      <Title>Planificador</Title>
      <ContentContainer>
        <TrabajoSeeker />
        <Calendar
          spinnerMessage="Cargando planificador..."
          hasFilter={false}
        />
      </ContentContainer>
    </PlanificadorContainer>
  );
}
