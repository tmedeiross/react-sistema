import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter, Switch, Route, Link,
} from 'react-router-dom';
import App from './App';
import Login from './components/Login';
import Cadastro from './components/Cadastro';

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path="/" exact component={App} />
      <Route path="/login" exact component={Login} />
      <Route path="/cadastro" exact component={Cadastro} />
    </Switch>
  </BrowserRouter>,
  document.getElementById('root'),
);
