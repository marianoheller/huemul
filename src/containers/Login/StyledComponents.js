import styled from 'styled-components';

export const StyledContainer = styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
`;


export const Title = styled.div`
font-size: 1.5rem;
font-weight: 300;
margin-top: 4rem;
color: ${props => props.theme.palette.primary[300]};
`;
