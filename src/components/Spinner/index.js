import React from 'react';
import styled, { withTheme } from 'styled-components';
import CircularProgress from '@material-ui/core/CircularProgress';


const SpinnerContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

const LoaderContainer = styled.div`
    display: flex;
    justify-content: center;
`;

const Loader = props => <LoaderContainer><CircularProgress {...props} color="primary" size={50} /></LoaderContainer>;

const StyledLoader = styled(Loader)`
    display: flex;
    justify-content: center;
`;

const Message = styled.div`
    color: ${props => props.theme.palette.secondary[300]};
    font-weight: 300;
    text-align: center;
    margin-top: 0.25rem;
`;

export default withTheme(props => (
  <SpinnerContainer id="spijnnerContainer">
    <StyledLoader />
    <Message>{props.message}</Message>
  </SpinnerContainer>
));

