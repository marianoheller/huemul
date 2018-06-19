import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Login from '../../components/Login';
import * as actions from '../../actions/login';
import * as SC from './StyledComponents';

function LoginContainer(props) {
  const {
    clearErrors, login, isAuthenticated, errors, isFetching,
  } = props;
  return (
    <SC.StyledContainer>
      <SC.Title>Ingresar al sistema</SC.Title>
      <Login
        clearErrors={clearErrors}
        login={login}
        isAuthenticated={isAuthenticated}
        errors={errors}
        isFetching={isFetching}
      />
    </SC.StyledContainer>
  );
}


const mapStateToProps = ({ login, user }) => ({
  isAuthenticated: user.isAuthenticated,
  errors: login.errors,
  isFetching: login.isFetching,
});


const mapDispatchToProps = dispatch => ({
  clearErrors: () => dispatch(actions.clearErrors()),
  login: (loginData) => {
    // Frontend Validation
    const { usuario, clave } = loginData;
    const newErrors = {};
    if (!usuario || !usuario.length) {
      newErrors.usuario = 'Campo requerido';
    }
    if (!clave || !clave.length) {
      newErrors.clave = 'Campo requerido';
    }

    if (Object.keys(newErrors).length) {
      dispatch(actions.login.failure(newErrors));
    } else {
      dispatch(actions.login.request(loginData));
    }
  },
});


LoginContainer.propTypes = {
  clearErrors: PropTypes.func,
  login: PropTypes.func,
  isAuthenticated: PropTypes.bool,
  isFetching: PropTypes.bool,
  errors: PropTypes.shape({}),
};

LoginContainer.defaultProps = {
  clearErrors: () => {},
  login: () => {},
  isAuthenticated: false,
  isFetching: false,
  errors: {},
};


export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);
