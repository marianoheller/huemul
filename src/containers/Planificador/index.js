import React from 'react';
import styled from 'styled-components';

import PertChart from '../../components/PertChart';
import GanttChart from '../../components/GanttChart';


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
  flex-direction: column;
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
`;

const GanttContainer = styled.div`
  width: 100%;
`;

export default function CalendarioAGH() {
  return (
    <PlanificadorContainer>
      <Title>Planificador</Title>
      <ContentContainer>
        <PertContainer>
          <PertChart />
        </PertContainer>
        <GanttContainer>
          <GanttChart />
        </GanttContainer>
      </ContentContainer>
    </PlanificadorContainer>
  );
}
