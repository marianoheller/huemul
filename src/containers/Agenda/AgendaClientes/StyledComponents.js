import styled from 'styled-components';


export const AgendaClientesWrapper = styled.div`
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
