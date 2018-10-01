import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Spinner from 'react-spinkit';

import './login.css';

import { bindActionCreators } from 'redux';
import { Card } from './login';
import If from '../../common/if';
import ValidateForm from './validator';
import LoginForm from './form';
import * as AuthAPI from '../../../api/auth';
import Footer from '../../layout/footer';
// import * as StoreAPI from '../../../api/store';
import { Creators as LoginActions } from '../../../redux-flow/ducks/auth';
import { setToken } from '../../../utils/services/auth';
import { ROUTE_PREFIX as PREFIX } from '../../../config';
// import { addShops, addShop } from '../../../redux-flow/reducers/shops/action-creators';
// import { setAuth } from '../../../redux-flow/reducers/auth/action-creators';

export class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      idUser: '',
      errors: {},
      isLoading: false,
      errorMessage: '',
      stores: '',
      userData: [],
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();

    if (!this.isValid()) return;

    const resetState = { errors: {}, errorMessage: '' };
    this.setState(resetState);

    const { username, password } = this.state;

    AuthAPI.login({ username, password })
      .then((response) => {
        this.setState({ ...resetState });
        setToken(response.data.token);
        localStorage.setItem('user', username);
        // this.props.setAuth(true);

        AuthAPI.getUser(localStorage.getItem('user'))
          .then((response) => {
            AuthAPI.getShopUser(response.data.id)
              .then((response) => {
                const userStore = !!response.data.content[0];
                console.log(userStore);
                if (userStore === false) {
                  // this.redirectToStores();
                } else {
                  // localStorage.setItem('user', username);
                  // this.redirectToHome();
                }
              })
              .catch((err) => {
                console.log(err);
              });
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
        // if (err.status === 404) {
        //   this.setState({
        //     errorMessage: err.message,
        //   });
        // } else if (err.data.message === 'Usuário desabilitado') {
        //   this.setState({
        //     errorMessage: 'Por favor, consulte seu email para ativar o cadastro.',
        //   });
        // } else if (err.data.status === 401) {
        //   this.setState({
        //     errorMessage: 'Usuário inexistente ou senha inválida.',
        //   });
        // }
      });
  }

  redirectToHome() {
    return this.props.history.push(`${PREFIX}`);
  }

  redirectToStores() {
    return this.props.history.push(`${PREFIX}/shops`);
  }

  isValid() {
    const { errors, isValid } = ValidateForm(this.state);
    if (!isValid) {
      this.setState({ errors });
    }
    return isValid;
  }

  render() {
    const {
      errors, username, password, isLoading, errorMessage,
    } = this.state;
    return (
      <Fragment>
        <Card>
          <div className="mdl-card mdl-shadow--2dp">
            <div className="mdl-card__title bg-primary">
              <h2 className="mdl-card__title-text mdl-typography--text-center w100">ENTRAR</h2>
            </div>
            <div className="mdl-card__supporting-text w100">
              <LoginForm
                handleSubmit={this.handleSubmit}
                handleChange={this.handleChange}
                username={username}
                password={password}
                isLoading={isLoading}
                errors={errors}
              />
              <If test={isLoading}>
                <div className="loading">
                  <Spinner name="ball-pulse-sync" fadeIn="none" />
                </div>
              </If>
              <If test={errorMessage}>
                <div className="alert alert-danger msg-error-login text-center" role="alert">
                  {errorMessage}
                </div>
              </If>
              <Link to="/app/auth/recover" className="mdl-js-ripple-effect" color="primary">
                Esqueci a senha
              </Link>
            </div>
          </div>
        </Card>
        <Footer />
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  authData: state.authData,
});

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(LoginActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  // { addShops, addShop, setAuth },
)(Login);