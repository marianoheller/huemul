import React from 'react';
import { connect } from 'react-redux';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import Login from './containers/Login';
import Landing from './containers/Landing';
import Trabajos from './containers/Trabajos';


import Navbar from './components/Navbar';

import * as userActions from './actions/user';


// non-default export of component required due to redux testing problem.
// Problem: testing the default exported component fails due to undefined store
// Solution: testing the actual component and not the Connect component exported(default)

// Had to rename App to AppComponent cuz the linter didnt like to have the
// default export called the same as an export.
// It was either rename component or disable linter when using the default export
export class AppComponent extends React.Component {
  componentDidMount() {
    const { userCheckin } = this.props;
    userCheckin();
  }

  render() {
    const { user, userLogout } = this.props;

    return (
      <div className="App">
        <Navbar user={user} />
        <React.Fragment>
          <Switch>
            <Route path="/login" component={Login} />
            { user.isAuthenticated &&
              <Route path="/trabajos" component={Trabajos} />
            }
            <Route
              path="/logout"
              render={() => {
              userLogout();
              return <Redirect to="/" />;
            }}
            />
            <Route path="/" exact component={Landing} />
            <Route
              path="/*"
              render={() => <Redirect to="/" />}
            />
          </Switch>
        </React.Fragment>
      </div>
    );
  }
}


AppComponent.propTypes = {
  user: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  userCheckin: PropTypes.func,
  userLogout: PropTypes.func,
};

AppComponent.defaultProps = {
  user: {},
  userCheckin: () => {},
  userLogout: () => {},
};

// Maps the state or parts of it to props
// Disabled linter next line because of the unused variable rule.
// eslint-disable-next-line
const mapStateToProps = state => ({
  user: state.user,
});


// Maps dispatch(Actions) to props
const mapDispatchToProps = dispatch => ({
  userCheckin: () => dispatch(userActions.userCheckin()),
  userLogout: () => dispatch(userActions.userRequestLogout()),
});


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AppComponent));
