import React, { Component } from 'react';
import { connect } from 'react-redux';
import Spinner from 'react-spinkit';

import './signup.css';
import { Card } from './style';

import If from '../../common/if';
import * as AuthAPI from '../../../api/auth';
// import * as StoreAPI from '../../../api/store';
import { ROUTE_PREFIX as PREFIX } from '../../../config';
import { addShops, addShop } from '../../../redux-flow/reducers/shops/action-creators';
import { setAuth } from '../../../redux-flow/reducers/auth/action-creators';

export class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // trocar pelo parametro token da URL enviada no email
      token: 'bbe8c808-850e-4500-ab1e-f4d553c52dad',
      isLoading: false,
      errorMessage: '',
      segundosRestantes: 5,
    };
    this.confirm = this.confirm.bind(this);
    this.passouSegundo = this.passouSegundo.bind(this);
  }

  componentDidMount() {
    this.interval = setInterval(this.passouSegundo, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  passouSegundo() {
    const segundos = this.state.segundosRestantes - 1;

    if (this.state.segundosRestantes === 0) {
      this.setState.segundosRestantes = 0;
      this.redirectToLogin();
    }

    this.setState({ segundosRestantes: segundos });
  }

  confirm() {
    const resetState = { errors: {}, errorMessage: '', isLoading: true };
    this.setState(resetState);
    const { token } = this.state;
    AuthAPI.confirmUser(token)
      .then(() => {
        this.setState({ ...resetState });
      })
      .catch((err) => {
        this.setState({
          isLoading: false,
          errorMessage: err.data.message,
        });
      });
  }

  // setTimeout(() => this.props.history.push(`${PREFIX}/auth/login`), 500);
  redirectToLogin() {
    return this.props.history.push(`${PREFIX}/auth/login`);
  }

  render() {
    const { isLoading, errorMessage, segundosRestantes } = this.state;

    return (
      <Card>
        <div className="mdl-card mdl-shadow--2dp">
          <div className="mdl-card__title bg-primary">
            <h2 className="mdl-card__title-text mdl-typography--text-center w100">BEM VINDO</h2>
          </div>
          <div className="mdl-card__supporting-text w100 text-center">
            <h4>Sua conta foi confirmada com sucesso</h4>
            <h6>
              Você será redirecionado para a página de Login em &nbsp;
              {segundosRestantes}
.
            </h6>
            <If test={isLoading}>
              <div className="loading">
                <Spinner name="ball-pulse-sync" fadeIn="none" />
              </div>
            </If>
            <If test={errorMessage}>
              <div className="alert alert-warning msg-error-login text-center" role="alert">
                Clique aqui para reenviar o email de confirmação.
              </div>
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
