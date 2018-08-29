import React, { Component } from 'react';
import { connect } from 'react-redux';
import Spinner from 'react-spinkit';

import './login.css';

import { Card } from './login';
import If from '../../common/if';
import ValidateForm from './validator';
import LoginForm from './form';
import * as AuthAPI from '../../../api/auth';
// import * as StoreAPI from '../../../api/store';
import { setToken } from '../../../utils/services/auth';
import { ROUTE_PREFIX as PREFIX } from '../../../config';
import { addShops, addShop } from '../../../redux-flow/reducers/shops/action-creators';
import { setAuth } from '../../../redux-flow/reducers/auth/action-creators';

export class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      errors: {},
      isLoading: false,
      errorMessage: '',
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

    const resetState = { errors: {}, errorMessage: '', isLoading: true };
    this.setState(resetState);

    const { username, password } = this.state;

    AuthAPI.login({ username, password })
      .then((response) => {
        this.setState({ ...resetState });
        setToken(response.data.token);
        localStorage.setItem('shop', username);
        localStorage.setItem('user', username);
        this.props.setAuth(true);

        return this.redirectToHome();
        // const shop = JSON.parse(localStorage.getItem('shop'));
        // if (shop) {
        //   this.props.addShop(shop);
        // }
        // StoreAPI.getShops()
        //   .then((response) => {
        //     const stores = response.data.content;

        //     if (!stores || stores.length === 0) {
        //       return this.redirectToHome();
        //     }
        //     this.props.addShops(stores);

        //     setTimeout(() => this.props.history.push(`${PREFIX}/shops`), 500);
        //   })
        //   .catch((response) => {
        //     this.setState({ isLoading: false });
        //     return this.redirectToHome();
        //   });
      })
      .catch((err) => {
        console.log(err);
        if (err.status === 404) {
          this.setState({
            isLoading: false,
            errorMessage: err.message,
          });
        } else if (err.data.status === 401) {
          this.setState({
            isLoading: false,
            errorMessage: 'Usuário inexistente ou senha inválida.',
          });
        }
      });
  }

  redirectToHome() {
    return this.props.history.push(`${PREFIX}`);
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
          </div>
        </div>
      </Card>
    );
  }
}

export default connect(
  null,
  { addShops, addShop, setAuth },
)(Login);
