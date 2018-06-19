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
font-family: "Roboto";
font-weight: 100;
color: ${props => props.theme.palette.primary[300]};
cursor: default;
`;

export const Subtitle = styled.div`
margin-top: 0rem;
font-size: 2rem;
font-family: "Roboto";
font-weight: 100;
color: ${props => props.theme.palette.primary[300]};
cursor: default;
`;
