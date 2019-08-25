import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';

class ProtectedRoute extends Component {
  render() {
    const { component: Component, authenticated, ...props } = this.props
    return (
      <Route
        {...props}
        render={props => (
          !authenticated ?
            <Redirect to='/login' /> :
            <Component {...props} />
        )}
      />
    )
  }
}

export default ProtectedRoute;
