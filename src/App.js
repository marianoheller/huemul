import React from 'react';
import { connect } from 'react-redux';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import Loadable from 'react-loadable';

import Loading from './components/Loading';
import * as userActions from './actions/user';


const Login = Loadable({
  loader: () => import('./containers/Login'),
  loading: Loading,
  delay: 500,
});
const Logout = Loadable({
  loader: () => import('./containers/Logout'),
  loading: Loading,
  delay: 500,
});
const Landing = Loadable({
  loader: () => import('./containers/Landing'),
  loading: Loading,
  delay: 500,
});
const Planificador = Loadable({
  loader: () => import('./containers/Planificador'),
  loading: Loading,
  delay: 500,
});
const CalendarioAGH = Loadable({
  loader: () => import('./containers/CalendarioAGH'),
  loading: Loading,
  delay: 500,
});
const Trabajos = Loadable({
  loader: () => import('./containers/Trabajos'),
  loading: Loading,
  delay: 500,
});
const Agenda = Loadable({
  loader: () => import('./containers/Agenda'),
  loading: Loading,
  delay: 500,
});
const Navbar = Loadable({
  loader: () => import('./components/Navbar'),
  loading: () => null,
  delay: 500,
});

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
            <Route path="/planificador" component={Planificador} />
            <Route path="/calendarioAGH" component={CalendarioAGH} />
            <Route path="/trabajos" component={Trabajos} />
            <Route path="/agenda" component={Agenda} />
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
    PropTypes.object,
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
