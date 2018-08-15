import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
// import * as routes from '../../../constants/routes';
import Logo from '../../assets/img/logo-white.png';

import AuthService from '../../components/AuthService';
import withAuth from '../../components/withAuth';

const Auth = new AuthService();
class NavbarInterna extends Component {
  handleLogout() {
    Auth.logout();
    this.props.history.replace('/signin');
  }

  render() {
    return (
      <nav className="navbar app">
        <header className="mdl-layout__header">
          <div className="mdl-layout__header-row">
            <span className="mdl-layout-title" />
            <div className="page-content">
              <nav className="mdl-navigation mdl-layout--large-screen-only">
                <Link className="mdl-navigation__link" to="/">
                  <img className="nav-icon" src={Logo} alt="logo" />
                </Link>
              </nav>
            </div>
            <div className="mdl-layout-spacer" />
            <nav className="mdl-navigation mdl-layout--large-screen-only">
              <Link className="mdl-navigation__link" to="/register">
                Add new client
              </Link>
              <Link className="mdl-navigation__link" to="/">
                Logado como&nbsp; Nome
              </Link>
              <Link className="mdl-navigation__link" to="/" onClick={this.handleLogout.bind(this)}>
                Logout
              </Link>
            </nav>
          </div>
        </header>
      </nav>
    );
  }
}
export default NavbarInterna;
