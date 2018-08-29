import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isAuthenticated } from '../../../utils/services/auth';
import { ROUTE_PREFIX as PREFIX } from '../../../config';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => (isAuthenticated() === true ? (
      <Component {...props} />
    ) : (
      <Redirect to={`${PREFIX}/auth/login`} />
    ))
    }
  />
);

export default PrivateRoute;
