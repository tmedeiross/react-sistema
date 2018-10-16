import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isAuthenticated } from "Util/services/auth";
import { PREFIX } from "Constants/defaultValues";

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated() === true ? (
        <Component {...props} />
      ) : (
        <Redirect to={`${PREFIX}/login`} />
      )
    }
  />
);

export default PrivateRoute;
