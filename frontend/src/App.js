import React, { Component } from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import jwt_decode from 'jwt-decode';
import setAuthToken from './setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authentication';
import { connect } from 'react-redux';
import Navbar from './components/Navbar';
import Register from './components/Register';
import Login from './components/Login';
import Home from './components/Home';
import NewThread from './components/NewThread';
import ProtectedRoute from './modules/routeComponent/ProtectedRoute';

import 'bootstrap/dist/css/bootstrap.min.css';

if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
  const decoded = jwt_decode(localStorage.jwtToken);
  store.dispatch(setCurrentUser(decoded));

  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    window.location.href = '/login'
  }
}

class App extends Component {
  render() {
    const { isAuthenticated, user } = this.props.auth;
    return (

      <BrowserRouter>
        <div>
          <Navbar />
          <Switch>
            <div className="container">
              <ProtectedRoute exact authenticated={isAuthenticated} path="/newthread" component={NewThread} />
              <ProtectedRoute authenticated={isAuthenticated} exact path="/" component={Home} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
            </div>
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth
})

export default connect(mapStateToProps)(App);
