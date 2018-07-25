import React from 'react';
import styled from 'styled-components';

import PertChart from '../../components/PertChart';


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
  font-weight: 200;
  color: ${props => props.theme.palette.primary[300]};
  font-size: 3rem;
  margin-top: 2rem;
  cursor: default;
`;

const PertContainer = styled.div`
  width: 100%;
  height: 800px;
`;

export default function CalendarioAGH() {
  return (
    <PlanificadorContainer>
      <Title>Planificador</Title>
      <ContentContainer>
        <PertContainer>
          <PertChart />
        </PertContainer>
      </ContentContainer>
    </PlanificadorContainer>
  );
}
