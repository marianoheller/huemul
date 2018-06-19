import styled from 'styled-components';
import { FormControl, IconButton, Button, FormHelperText } from '@material-ui/core';
import InputAdornment from '@material-ui/core/InputAdornment';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';


export const LoginContainer = styled.div`
color: ${props => props.theme.palette.primary[300]};
margin-top: 2rem;
max-width: 300px;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
`;

export const StyledForm = styled.form`
display: block;
column-count: 1;

& > div {
  margin: 0.5rem 0;
  display: block;
}
`;


export const StyledFormControl = styled(FormControl)`
display: flex !important;
align-items: center;
justify-content: center;
`;

export const StyledButtonFormControl = styled(FormControl)`
display: flex !important;
align-items: center;
justify-content: center;
`;

export const StyledInputLabel = styled(InputLabel)`
color: ${props => props.theme.palette.secondary[300]} !important;
`;

export const StyledIconButton = styled(IconButton)`
color: ${props => props.theme.palette.secondary[300]} !important;
`;

export const StyledError = styled(FormHelperText)`
color: ${props => props.theme.status.danger[300]} !important;
font-size: 0.85rem !important;
text-align: center !important;
`;

export const StyledInput = styled(Input)`
color: ${props => props.theme.palette.secondary[200]} !important;

&::after {
  transition: transform 500ms cubic-bezier(0.4, 0, 0.2, 1) 0ms !important;
}

&::before {
  border-color: ${props => props.theme.palette.secondary[300]} !important;
  transition: border-bottom-color 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms !important;
}
`;


export const StyledButton = styled(Button)``;

export const StyledInputAdornment = styled(InputAdornment)``;

export const StyledFormHelperText = styled(FormHelperText)``;
