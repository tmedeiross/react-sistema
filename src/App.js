import React from 'react';
import styled from 'styled-components';
import './styles/global';

const App = () => (
  <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header">
    <header className="mdl-layout__header">
      <div className="mdl-layout__header-row">
        <span className="mdl-layout-title">
Title
        </span>
        <div className="mdl-layout-spacer" />
      </div>
    </header>
    <main className="mdl-layout__content">
      <div className="page-content">
        <h1>
Dashboard
        </h1>
      </div>
    </main>
  </div>
);

export default App;
