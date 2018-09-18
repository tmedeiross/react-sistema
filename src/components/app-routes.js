import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import { ROUTE_PREFIX as PREFIX } from '../config/index';
import Home from './home';
import Login from './auth/login';
import Logout from './auth/logout';
import Confirm from './auth/confirm';
import Signup from './auth/signup';
import NotFound from './layout/not-found';
import PrivateRoute from './auth/private-route';
import Shops from './shop-list';
import Shop from './shop';

const AppRoutes = () => (
  <Switch>
    <Redirect exact from="/" to={`${PREFIX}`} />
    <PrivateRoute exact path={`${PREFIX}`} component={Home} />
    <Route path={`${PREFIX}/auth/login`} component={Login} />
    <Route path={`${PREFIX}/auth/signup`} component={Signup} />
    <Route path={`${PREFIX}/auth/confirm`} component={Confirm} />
    <PrivateRoute path={`${PREFIX}/home`} component={Home} />
    <PrivateRoute path={`${PREFIX}/auth/logout`} component={Logout} />
    <PrivateRoute path={`${PREFIX}/shops`} component={Shops} />
    <PrivateRoute exact path={`${PREFIX}/shop`} component={Shop} />
    <PrivateRoute path={`${PREFIX}/shop/:id`} component={Shop} />
    <PrivateRoute component={NotFound} />
  </Switch>
);

export default AppRoutes;
