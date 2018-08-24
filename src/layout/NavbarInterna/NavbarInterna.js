import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { login, user, logout } from '../../services/auth';
import Logo from '../../assets/img/logo-white.png';

class NavbarInterna extends Component {
  handleLogout() {
    logout();
    this.props.history.push('/signin');
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
              <Link className="mdl-navigation__link" to="/lojas">
                Lista de lojas
              </Link>
              <Link className="mdl-navigation__link" to="/">
                Logado como&nbsp;
                {localStorage.getItem('id_user')}
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
