import React, { Component } from 'react';

import AppRoutes from './app-routes';
import NavBar from './layout/nav-bar';
import Loading from './common/loading';
import ReloadState from './common/reload-state';

class App extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <Loading />
        <ReloadState />
        <div className="container-fluid content">
          <AppRoutes />
        </div>
      </div>
    );
  }
}

export default App;
