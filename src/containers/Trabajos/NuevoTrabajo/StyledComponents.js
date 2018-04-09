import styled from 'styled-components';

export const NuevoTrabajoContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 3rem;
  margin-left: 25vw;
  margin-right: 25vw;

  
  @media only screen and (max-width: 1400px) {
    margin-left: 20vw;
    margin-right: 20vw;
  }
  @media only screen and (max-width: 768px) {
    margin-left: 10vw;
    margin-right: 10vw;
  }
  @media only screen and (max-width: 400px) {
    margin-left: 5vw;
    margin-right: 5vw;
  }
`;

export const Title = styled.div`
  font-weight: 300;
  font-size: 2rem;
  color: ${props => props.theme.palette.primary[300]};
  margin-bottom: 2rem;
`;

export const Error = styled.div`
  color: ${props => props.theme.status.danger[300]};
  width: 100%;
  text-align: center;
  font-size: 0.75rem;
  margin-top: 0.5rem;
`;

export const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 0.5rem;
`;
