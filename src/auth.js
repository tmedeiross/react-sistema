import React from 'react';
import { Route, Redirect } from 'react-router-dom';

// export const isAuthenticated = sessionStorage.getItem('isAuthenticated');
export const isAuthenticated = true;
// localStorage

export const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => (isAuthenticated ? (
      <Component {...props} />
    ) : (
      <Redirect to={{ pathname: '/signin', state: { from: props.location } }} />
    ))
    }
  />
);
