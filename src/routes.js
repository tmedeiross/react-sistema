import React from 'react';
import {
  BrowserRouter, Route, Switch, Redirect,
} from 'react-router-dom';

import { isAuthenticated } from './services/auth';

import Signin from './pages/auth/Signin';
import Signup from './pages/auth/Signup';
import Pwforget from './pages/auth/Pwforget';
import Account from './pages/auth/Account';
import Cadastro from './pages/Cadastro';
import Lojas from './pages/Lojas';
import Home from './pages/Home';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => (isAuthenticated() ? (
      <Component {...props} />
    ) : (
      <Redirect to={{ pathname: '/signin', state: { from: props.location } }} />
    ))
    }
  />
);

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/signin" component={Signin} />
      <Route exact path="/signup" component={Signup} />
      <Route exact path="/pwforget" component={Pwforget} />
      <Route exact path="/account" component={Account} />
      <Route exact path="/register" component={Cadastro} />
      <Route exact path="/lojas" component={Lojas} />
      <PrivateRoute exact path="/" component={Home} />
      <Route path="*" component={() => <h1>Desculpe, esta página não existe</h1>} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
