import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import history from './utils/history';
import './config/reactotron';
import './config/js';
import './styles/global';

import App from './components/app';
import store from './redux-flow/configure-store';

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <Router history={history}>
        <App />
      </Router>
    </Provider>
  </BrowserRouter>,
  document.getElementById('root'),
);
