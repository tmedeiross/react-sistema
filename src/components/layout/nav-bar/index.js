import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Input from '../../common/form/input';

import './nav-bar.css';

import If from '../../common/if';
import { ROUTE_PREFIX as PREFIX } from '../../../config';
import Logo from '../../../assets/img/logo-white.png';
import { isAuthenticated } from '../../../utils/services/auth';
import * as AuthAPI from '../../../api/auth';

export class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shop: '',
      userData: [],
      firstLetter: '',
    };
    this.getUser = this.getUser.bind(this);
    this.getFirstLetter = this.getFirstLetter.bind(this);
    this.logout = this.logout.bind(this);
  }

  componentDidMount() {
    if (isAuthenticated()) {
      this.getUser();
    }
    if (!isAuthenticated()) {
      this.logout();
    }
  }

  componentDidUpdate() {}

  getUser() {
    const email = localStorage.getItem('user');
    AuthAPI.getUser(email)
      .then((response) => {
        const userData = response.data;
        this.setState({ userData });
        // console.log(userData);
        this.getFirstLetter();
      })
      .catch((err) => {
        console.log(err.data.message);
      });
  }

  getFirstLetter() {
    const { userData } = this.state;
    const letter = userData.name;
    const setFirstLetter = letter.substring(0, 1).toUpperCase();
    this.setState({ firstLetter: setFirstLetter });
  }

  logout() {
    const userData = [];
    this.setState({ userData });
    // const resetState = { userData: [], firstLetter: '', shop: '' };
    // this.setState({ resetState });
  }

  redirectToHome() {
    return this.props.history.push(`${PREFIX}`);
  }

  render() {
    const { shop, userData, firstLetter } = this.state;
    return (
      <div className="mdl-layout mdl-layout--fixed-header">
        <header className="mdl-layout__header">
          <div className="mdl-layout__header-row">
            <Link to={`${PREFIX}/`} className="nav-link">
              <span className="mdl-layout-title">
                <img className="nav-icon" src={Logo} alt="logo" />
              </span>
            </Link>
            <If test={isAuthenticated()}>
              <form autoComplete="off">
                <div className="mdl-grid">
                  <div className="mdl-cell mdl-cell--3-col">
                    <Input type="text" name="search" id="search" placeholder="Procurar" />
                  </div>
                </div>
              </form>
            </If>
            <div className="mdl-layout-spacer" />
            <nav className="mdl-navigation mdl-layout--large-screen-only">
              <If test={isAuthenticated()}>
                <If test={Object.keys(shop).length} />

                <nav className="navbar navbar-expand-lg ">
                  <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarNavAltMarkup"
                    aria-controls="navbarNavAltMarkup"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                  >
                    <span className="navbar-toggler-icon" />
                  </button>
                  <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                      <span className="avatar">{firstLetter}</span>
                      <li className="nav-item dropdown">
                        <a
                          className="nav-link dropdown-toggle"
                          id="navbarDropdownMenuLink"
                          role="button"
                          data-toggle="dropdown"
                          aria-haspopup="true"
                          aria-expanded="false"
                        >
                          {userData.name}
                        </a>
                        <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                          <Link to={`${PREFIX}/shops`} className="dropdown-item">
                            Minhas Lojas
                          </Link>
                          <Link to={`${PREFIX}/auth/logout`} className="dropdown-item">
                            Minha conta
                          </Link>
                          <Link to={`${PREFIX}/auth/logout`} className="dropdown-item btn-logout">
                            Sair
                          </Link>
                        </div>
                      </li>
                    </div>
                  </div>
                </nav>
              </If>
            </nav>
          </div>
        </header>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  shop: state.shops.selectedShop,
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(NavBar);
