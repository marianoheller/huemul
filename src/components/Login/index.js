import React from 'react';
import propTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { Visibility, VisibilityOff } from '@material-ui/icons';

import * as SC from './StyledComponents';
import Spinner from '../Spinner';


export default class LoginComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showPassword: false,
      input: {
        usuario: '',
        clave: '',
      },
    };
    this.handleClickShowPassword = this.handleClickShowPassword.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleIngresarClick = this.handleIngresarClick.bind(this);
  }

  componentWillUnmount() {
    const { clearErrors } = this.props;
    clearErrors();
  }

  handleClickShowPassword() {
    this.setState({ showPassword: !this.state.showPassword });
  }

  handleInputChange(event) {
    const { target } = event;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const { name } = target;

    this.setState({
      ...this.state,
      input: {
        ...this.state.input,
        [name]: value,
      },
    });
  }

  handleIngresarClick() {
    const { login } = this.props;
    login({
      usuario: this.state.input.usuario,
      clave: this.state.input.clave,
    });
  }

  render() {
    const { isAuthenticated, isFetching, errors } = this.props;

    if (isAuthenticated) return <Redirect to="/" />;

    return (
      <SC.LoginContainer>
        <SC.StyledForm noValidate autoComplete="off">
          <SC.StyledFormControl
            error={Boolean(errors.usuario)}
            classes={{
            root: 'violet',
          }}
          >
            <SC.StyledInputLabel>Usuario</SC.StyledInputLabel>
            <SC.StyledInput
              fullWidth
              label="Usuario"
              value={this.state.input.username}
              onChange={this.handleInputChange}
              autoFocus
              name="usuario"
              onKeyDown={(e) => {
                if (e.keyCode === 13) this.handleIngresarClick();
              }}
            />
            <SC.StyledFormHelperText>{errors.usuario}</SC.StyledFormHelperText>
          </SC.StyledFormControl>

          <SC.StyledFormControl error={Boolean(errors.clave)}>
            <SC.StyledInputLabel>Clave</SC.StyledInputLabel>
            <SC.StyledInput
              type={this.state.showPassword ? 'text' : 'password'}
              fullWidth
              name="clave"
              value={this.state.input.password}
              onChange={this.handleInputChange}
              onKeyDown={(e) => {
                if (e.keyCode === 13) this.handleIngresarClick();
              }}
              endAdornment={
                <SC.StyledInputAdornment position="end">
                  <SC.StyledIconButton
                    aria-label="Toggle visibility"
                    onClick={this.handleClickShowPassword}
                  >
                    {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                  </SC.StyledIconButton>
                </SC.StyledInputAdornment>
              }
            />
            <SC.StyledFormHelperText>{errors.clave}</SC.StyledFormHelperText>
          </SC.StyledFormControl>

          <SC.StyledButtonFormControl>
            <SC.StyledButton
              color="primary"
              onClick={this.handleIngresarClick}
              disabled={isFetching}
            >
              Ingresar
            </SC.StyledButton>
          </SC.StyledButtonFormControl>

          { isFetching &&
          <SC.StyledFormControl>
            <Spinner message="Ingresando al sistema..." />
          </SC.StyledFormControl>
          }

          <SC.StyledFormControl>
            <SC.StyledError>{errors.request}</SC.StyledError>
          </SC.StyledFormControl>

        </SC.StyledForm>
      </SC.LoginContainer>
    );
  }
}


LoginComponent.propTypes = {
  clearErrors: propTypes.func,
  login: propTypes.func,
  isAuthenticated: propTypes.bool,
  isFetching: propTypes.bool,
  errors: propTypes.shape({}),
};

LoginComponent.defaultProps = {
  clearErrors: () => {},
  login: () => {},
  isAuthenticated: false,
  isFetching: false,
  errors: {},
};
