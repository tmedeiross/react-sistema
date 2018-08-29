import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import { ROUTE_PREFIX as PREFIX } from '../config/index';
import Home from './home';
import Login from './auth/login';
import Signup from './auth/signup';
import Logout from './auth/logout';
import NotFound from './layout/not-found';
import PrivateRoute from './auth/private-route';
import Stores from './store-list';
import Store from './store';
import ClientsSummary from './clients-summary';
import ClientDetails from './client-details';
import SimpleRegistration from './simple-registration';
import Shop from './shop';

const AppRoutes = () => (
  <Switch>
    <Redirect exact from="/" to={`${PREFIX}`} />
    <PrivateRoute exact path={`${PREFIX}`} component={Home} />
    <Route path={`${PREFIX}/auth/login`} component={Login} />
    <Route path={`${PREFIX}/auth/signup`} component={Signup} />
    <PrivateRoute path={`${PREFIX}/home`} component={Home} />
    <PrivateRoute path={`${PREFIX}/auth/logout`} component={Logout} />
    <PrivateRoute path={`${PREFIX}/stores`} component={Stores} />
    <PrivateRoute path={`${PREFIX}/store`} component={Store} />
    <PrivateRoute path={`${PREFIX}/client/new/:customerName?`} component={SimpleRegistration} />
    <PrivateRoute path={`${PREFIX}/clients/:summaryType`} component={ClientsSummary} />
    <PrivateRoute path={`${PREFIX}/client/:id`} component={ClientDetails} />
    <PrivateRoute path={`${PREFIX}/shops`} component={Shop} />
    <PrivateRoute component={NotFound} />
  </Switch>
);

export default AppRoutes;
