import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import { ROUTE_PREFIX as PREFIX } from '../config/index';
import Home from './home';
import Login from './auth/login';
import Confirm from './auth/confirm';
import Signup from './auth/signup';
import Logout from './auth/logout';
import NotFound from './layout/not-found';
import PrivateRoute from './auth/private-route';
import Stores from './shop-list';
import Store from './shop';
import ClientsSummary from './clients-summary';
import ClientDetails from './client-details';
import SimpleRegistration from './simple-registration';
import Shop from './_shop';

const AppRoutes = () => (
  <Switch>
    <Redirect exact from="/" to={`${PREFIX}`} />
    <PrivateRoute exact path={`${PREFIX}`} component={Home} />
    <Route path={`${PREFIX}/auth/login`} component={Login} />
    <Route path={`${PREFIX}/auth/signup`} component={Signup} />
    <Route path={`${PREFIX}/auth/confirm`} component={Confirm} />
    <PrivateRoute path={`${PREFIX}/home`} component={Home} />
    <PrivateRoute path={`${PREFIX}/auth/logout`} component={Logout} />
    <PrivateRoute path={`${PREFIX}/stores`} component={Stores} />
    <PrivateRoute exact path={`${PREFIX}/store`} component={Store} />
    <PrivateRoute path={`${PREFIX}/store/:id`} component={Store} />
    <PrivateRoute path={`${PREFIX}/client/new/:customerName?`} component={SimpleRegistration} />
    <PrivateRoute path={`${PREFIX}/clients/:summaryType`} component={ClientsSummary} />
    <PrivateRoute path={`${PREFIX}/client/:id`} component={ClientDetails} />
    <PrivateRoute path={`${PREFIX}/shops`} component={Shop} />
    <PrivateRoute component={NotFound} />
  </Switch>
);

export default AppRoutes;

// Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhY2VydCIsImV4cCI6MTUzNzQ2NzYyMH0.ywLzHrXcWt3OUdecM_d62WLVELnmP5-ggDwac6RuJ-rMhJ8XOUGWVweLwRyv8S37n76Xp68rHbUZuvqWZAAA0g
// Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhY2VydCIsImV4cCI6MTUzNzQ3MDcxMX0.lHHSthzZN4W-8XfkCY83K-RWIDkEFvOIDlO-iskjQPm6YS8H8tIsJMjYTWTvef_liNdNf9vs2HduHyoTfIM8xw
