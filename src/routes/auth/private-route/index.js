import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isAuthenticated } from "Util/services/auth";
import { defaultStartPathLogin } from "Constants/defaultValues";

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated() === true ? (
        <Component {...props} />
      ) : (
        <Redirect to={`${defaultStartPathLogin}`} />
      )
    }
  />
);

export default PrivateRoute;
