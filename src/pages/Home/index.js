import React, { Component, Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import TextField from '@material-ui/core/TextField';
import NavbarInterna from '../../layout/NavbarInterna/NavbarInterna';

// import PropTypes from 'prop-types';
import * as AddUser from '../../store/actions/account';

import { login, user, logout } from '../../services/auth';
import api from '../../services/api';

import '../../styles/global';
import './styles.css';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '',
      profile: '',
    };
  }

  handleLogout = (e) => {
    logout();
    this.props.history.push('/signin');
  };

  render() {
    return (
      <Fragment>
        <div className="ui">
          <NavbarInterna />
          <nav className="navbar app" />
          <div className="lists">
            <div className="list">
              <header>
                Pedido
                <i className="material-icons filter_list">filter_list</i>
              </header>
              <ul>
                <li>
                  <i className="material-icons more_vert">more_vert</i>
                  <p className="number">203.002</p>
                  <p className="name">Nome Nome</p>
                  <p className="date">jul,09</p>
                  <div className="footer">Store: Amazing NY</div>
                </li>
                <li>
                  <i className="material-icons more_vert">more_vert</i>
                  <p className="number">203.002</p>
                  <p className="name">Nome Nome</p>
                  <p className="date">jul,09</p>
                  <div className="footer">Store: Amazing NY</div>
                </li>
                <li>
                  <i className="material-icons more_vert">more_vert</i>
                  <p className="number">203.002</p>
                  <p className="name">Nome Nome</p>
                  <p className="date">jul,09</p>
                  <div className="footer">Store: Amazing NY</div>
                </li>
                <li>
                  <i className="material-icons more_vert">more_vert</i>
                  <p className="number">203.002</p>
                  <p className="name">Nome Nome</p>
                  <p className="date">jul,09</p>
                  <div className="footer">Store: Amazing NY</div>
                </li>
                <li>
                  <i className="material-icons more_vert">more_vert</i>
                  <p className="number">203.002</p>
                  <p className="name">Nome Nome</p>
                  <p className="date">jul,09</p>
                  <div className="footer">Store: Amazing NY</div>
                </li>
                <li>
                  <i className="material-icons more_vert">more_vert</i>
                  <p className="number">203.002</p>
                  <p className="name">Nome Nome</p>
                  <p className="date">jul,09</p>
                  <div className="footer">Store: Amazing NY</div>
                </li>
                <li>
                  <i className="material-icons more_vert">more_vert</i>
                  <p className="number">203.002</p>
                  <p className="name">Nome Nome</p>
                  <p className="date">jul,09</p>
                  <div className="footer">Store: Amazing NY</div>
                </li>
                <li>
                  <i className="material-icons more_vert">more_vert</i>
                  <p className="number">203.002</p>
                  <p className="name">Nome Nome</p>
                  <p className="date">jul,09</p>
                  <div className="footer">Store: Amazing NY</div>
                </li>
                <li>
                  <i className="material-icons more_vert">more_vert</i>
                  <p className="number">203.002</p>
                  <p className="name">Nome Nome</p>
                  <p className="date">jul,09</p>
                  <div className="footer">Store: Amazing NY</div>
                </li>
              </ul>
            </div>

            <div className="list">
              <header>
                Estoque
                <i className="material-icons filter_list">filter_list</i>
              </header>
              <ul>
                <li>
                  <i className="material-icons more_vert">more_vert</i>
                  <p className="number">203.002</p>
                  <p className="name">Nome Nome</p>
                  <p className="date">jul,09</p>
                  <div className="footer">Store: Amazing NY</div>
                </li>
              </ul>
            </div>

            <div className="list">
              <header>
                Laboratório de montagem
                <i className="material-icons filter_list">filter_list</i>
              </header>
              <ul>
                <li>
                  <i className="material-icons more_vert">more_vert</i>
                  <p className="number">203.002</p>
                  <p className="name">Nome Nome</p>
                  <p className="date">jul,09</p>
                  <div className="footer">Store: Amazing NY</div>
                </li>
              </ul>
            </div>

            <div className="list">
              <header>
                Loja
                <i className="material-icons filter_list">filter_list</i>
              </header>
              <ul>
                <li>
                  <i className="material-icons more_vert">more_vert</i>
                  <p className="number">203.002</p>
                  <p className="name">Nome Nome</p>
                  <p className="date">jul,09</p>
                  <div className="footer">Store: Amazing NY</div>
                </li>
              </ul>
            </div>

            <div className="list">
              <header>
                Entregue
                <i className="material-icons filter_list">filter_list</i>
              </header>
              <ul>
                <li>
                  <i className="material-icons more_vert">more_vert</i>
                  <p className="number">203.002</p>
                  <p className="name">Nome Nome</p>
                  <p className="date">jul,09</p>
                  <div className="footer">Store: Amazing NY</div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}
export default withRouter(Home);
