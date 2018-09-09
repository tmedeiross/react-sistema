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
  constructor(...props) {
    super(...props);
    this.state = {
      shop: '',
      userData: [],
    };
    this.getUser = this.getUser.bind(this);
  }

  componentDidMount() {
    if (isAuthenticated) {
      // this.getUser();
    }
  }

  getUser() {
    const email = localStorage.getItem('user');
    AuthAPI.getUser(email)
      .then((response) => {
        const userData = response.data;
        this.setState({ userData });
        console.log(userData);
      })
      .catch((err) => {
        console.log(err.data.message);
      });
  }

  render() {
    const { shop, userData } = this.state;
    return (
      <div className="mdl-layout mdl-layout--fixed-header">
        <header className="mdl-layout__header">
          <div className="mdl-layout__header-row">
            <Link to={`${PREFIX}/`} className="nav-link">
              <span className="mdl-layout-title">
                <img className="nav-icon" src={Logo} alt="logo" />
              </span>
            </Link>
            <form autoComplete="off">
              <div className="mdl-grid">
                <div className="mdl-cell mdl-cell--3-col">
                  <Input type="text" name="search" id="search" placeholder="Procurar" />
                </div>
              </div>
            </form>
            <div className="mdl-layout-spacer" />
            <nav className="mdl-navigation mdl-layout--large-screen-only">
              {/* <form>
              <div className="mdl-textfield mdl-js-textfield mdl-textfield--expandable">
                <label className="mdl-button mdl-js-button mdl-button--icon" forHTML="sample6">
                  <i className="material-icons">search</i>
                </label>
                <div className="mdl-textfield__expandable-holder">
                  <input className="mdl-textfield__input" type="text" id="sample6" />
                  <label className="mdl-textfield__label" forHTML="sample-expandable">
                    Expandable Input
                  </label>
                </div>
              </div>
            </form> */}

              {/* <Link className="mdl-navigation__link" to={/}>
            Dashboard
          </Link> */}
              <If test={isAuthenticated}>
                <span className="avatar">T</span>
                <p>{userData.name}</p>
                <Link to={`${PREFIX}/stores`} className="nav-link">
                  <i className="fa fa-shopping-bag" />
                  {shop.name}
                </Link>
                <If test={Object.keys(shop).length} />
                <Link to={`${PREFIX}/auth/logout`} className="nav-link btn-logout">
                  Logout
                </Link>
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
