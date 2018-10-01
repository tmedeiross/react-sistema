import React from 'react';

import AppRoutes from './app-routes';
import Loading from './common/loading';
import ReloadState from './common/reload-state';

const App = () => (
  <div>
    <Loading />
    <ReloadState />
    <AppRoutes />
  </div>
);

export default App;
