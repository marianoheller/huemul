import styled from 'styled-components';


export const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Title = styled.div`
  margin-top: 4rem;
  font-size: 5rem;
  font-weight: 200;
  color: ${props => props.theme.palette.primary[300]};
  cursor: default;
`;

export const Subtitle = styled.div`
  margin-top: 0rem;
  font-size: 1.6rem;
  font-weight: 200;
  color: ${props => props.theme.palette.primary[300]};
  cursor: default;
`;

export const Description = styled.div`
  margin-top: 2rem;
  font-size: 1rem;
  font-weight: 300;
  text-align: center;
  color: ${props => props.theme.palette.secondary[300]};
  cursor: default;
`;
