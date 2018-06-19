import styled from 'styled-components';


export const CSAContainer = styled.div`
display: flex;
flex-direction: column;

align-items: center;
justify-content: center;

width: 80vw;
margin-left: 10vw;

@media only screen and (max-width: 14<00px) {
  width: 90vw;
  margin-left: 5vw;
}

@media only screen and (max-width: 768px) {
  width: 94vw;
  margin-left: 3vw;
}
`;

export const Title = styled.div`
font-weight: 100;
color: ${props => props.theme.palette.primary[300]};
font-size: 3rem;
margin-top: 2rem;
cursor: default;
`;
