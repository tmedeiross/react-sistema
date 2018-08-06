import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Signin from './pages/auth/Signin';
import Signup from './pages/auth/Signup';
import Pwforget from './pages/auth/Pwforget';
import Account from './pages/auth/Account';
import Home from './pages/Home';

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/signin" component={Signin} />
      <Route exact path="/signin" component={Account} />
      <Route exact path="/signup" component={Signup} />
      <Route exact path="/pwforget" component={Pwforget} />
      <Route exact path="/account" component={Account} />
      <Route exact path="/" component={Home} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
