import React from 'react';
import Logo from '../assets/img/logo-white.png';

const Navbar = () => (
  <div className="mdl-layout mdl-layout--fixed-header">
    <header className="mdl-layout__header">
      <div className="mdl-layout__header-row">
        <span className="mdl-layout-title">
          <img className="nav-icon" src={Logo} alt="logo" />
        </span>
        <div className="mdl-layout-spacer" />
      </div>
    </header>
  </div>
);

export default Navbar;
