import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
// import { PrivateRoute } from './auth';
import Signin from './pages/auth/Signin';
import Signup from './pages/auth/Signup';
import Pwforget from './pages/auth/Pwforget';
import Account from './pages/auth/Account';
import Home from './pages/Home';
import Login from './pages/auth/Login';

const Routes = () => (
  <Router>
    <div>
      <Route exact path="/login" component={Login} />
      <Route exact path="/signin" component={Signin} />
      <Route exact path="/signin" component={Account} />
      <Route exact path="/signup" component={Signup} />
      <Route exact path="/pwforget" component={Pwforget} />
      <Route exact path="/account" component={Account} />
      <Route exact path="/" component={Home} />
    </div>
  </Router>
);

export default Routes;
