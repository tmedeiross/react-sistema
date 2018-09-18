import React from 'react';

import AppRoutes from './app-routes';
import NavBar from './layout/nav-bar';
import Loading from './common/loading';
import ReloadState from './common/reload-state';

const App = () => (
  <div>
    <NavBar />
    <Loading />
    <ReloadState />
    <AppRoutes />
  </div>
);

export default App;
