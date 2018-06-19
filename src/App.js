import React from 'react';
import { connect } from 'react-redux';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import Login from './containers/Login';
import Logout from './containers/Logout';
import Landing from './containers/Landing';
import Planificador from './containers/Planificador';
import CalendarioCSA from './containers/CalendarioCSA';
import Trabajos from './containers/Trabajos';
import Agenda from './containers/Agenda';

import Navbar from './components/Navbar';

import * as userActions from './actions/user';


export class AppComponent extends React.Component {
  componentDidMount() {
    const { getVersion } = this.props;
    getVersion();
  }

  componentDidUpdate(prevProps) {
    if (this.props.isAuthenticated && !prevProps.isAuthenticated) {
      this.props.getUserInfo(this.props.userId);
    }
  }

  render() {
    const {
      isAuthenticated, buildVersion, username,
    } = this.props;

    return (
      <div className="App">
        <Navbar isAuthenticated={isAuthenticated} buildVersion={buildVersion} username={username} />
        <React.Fragment>
          <Switch>
            <Route path="/login" component={Login} />
            <Route
              path="/planificador"
              render={() =>
              /* if(!isAuthenticated) return <Redirect to="/" /> */
                <Planificador />
            }
            />
            <Route
              path="/calendarioCSA"
              render={() =>
              /* if(!isAuthenticated) return <Redirect to="/" /> */
                <CalendarioCSA />
            }
            />
            <Route
              path="/trabajos"
              render={() =>
              /* if(!isAuthenticated) return <Redirect to="/" /> */
                <Trabajos />
            }
            />
            <Route
              path="/agenda"
              render={() =>
              /* if(!isAuthenticated) return <Redirect to="/" /> */
                <Agenda />
            }
            />
            <Route path="/logout" component={Logout} />
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
  isAuthenticated: PropTypes.bool,
  buildVersion: PropTypes.string,
  username: PropTypes.string,
  userId: PropTypes.oneOfType([
    PropTypes.object, // eslint-disable-line no-bitwise
    PropTypes.number,
  ]),
  getUserInfo: PropTypes.func,
  getVersion: PropTypes.func,
};

AppComponent.defaultProps = {
  isAuthenticated: false,
  buildVersion: '',
  username: '',
  userId: null,
  getUserInfo: () => {},
  getVersion: () => {},
};

// Maps the state or parts of it to props
// Disabled linter next line because of the unused variable rule.
// eslint-disable-next-line
const mapStateToProps = ({user}) => ({
  isAuthenticated: user.isAuthenticated,
  buildVersion: user.buildVersion,
  username: user.username,
  userId: user.userId,
});


// Maps dispatch(Actions) to props
const mapDispatchToProps = dispatch => ({
  getUserInfo: id => dispatch(userActions.userInfo.get(id)),
  getVersion: () => dispatch(userActions.version.get()),
});


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AppComponent));
