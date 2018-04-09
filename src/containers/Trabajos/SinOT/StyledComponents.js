import styled from 'styled-components';

export const SinOTContainer = styled.div`
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

export const NoFoundContainer = styled.div`
  margin-top: 2rem;
  font-weight: 300;
  display: flex;
  justify-content: center;
  font-style: italic;
`;
