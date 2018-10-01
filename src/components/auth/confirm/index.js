import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import Spinner from 'react-spinkit';

import './signup.css';
import qs from 'query-string';
import { Card } from './style';
import NavBar from '../../layout/nav-bar';

import If from '../../common/if';
import * as AuthAPI from '../../../api/auth';
import { ROUTE_PREFIX as PREFIX } from '../../../config';
import { addShops, addShop } from '../../../redux-flow/reducers/shops/action-creators';
import { setAuth } from '../../../redux-flow/reducers/auth/action-creators';

export class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // trocar pelo parametro token da URL enviada no email
      // token: 'bbe8c808-850e-4500-ab1e-f4d553c52dad',
      token: '',
      isLoading: false,
      errorMessage: '',
      segundosRestantes: 5,
      isConfirmed: false,
    };
    this.confirm = this.confirm.bind(this);
    this.passouSegundo = this.passouSegundo.bind(this);
  }

  componentDidMount() {
    this.interval = setInterval(this.passouSegundo, 1000);
    this.existToken();
    setTimeout(() => {
      this.confirm();
    }, 500);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  existToken() {
    const { location } = this.props;
    const params = qs.parse(location.search);

    if (params.token) {
      const resetState = { token: params.token, isConfirmed: true };
      this.setState({ ...resetState });
    } else {
      this.redirectToLogin();
    }
  }

  passouSegundo() {
    const { segundosRestantes } = this.state;
    const segundos = segundosRestantes - 1;

    if (segundosRestantes === 1) {
      this.setState.segundosRestantes = 0;
      this.redirectToLogin();
      clearInterval(this.interval);
    }

    this.setState({ segundosRestantes: segundos });
  }

  confirm() {
    const resetState = { errors: {}, errorMessage: '', isLoading: false };
    this.setState(resetState);
    const { token } = this.state;
    AuthAPI.confirmUser(token)
      .then(() => {
        this.setState({ ...resetState });
      })
      .catch((err) => {
        console.log(err);
        this.setState({
          isLoading: false,
          errorMessage: 'Acesso nao confirmado',
        });
      });
  }

  redirectToLogin() {
    return this.props.history.push(`${PREFIX}/auth/login`);
  }

  render() {
    const {
      isLoading, errorMessage, segundosRestantes, isConfirmed,
    } = this.state;

    return (
      <Fragment>
        <NavBar />
        <Card>
          <div className="mdl-card mdl-shadow--2dp">
            <div className="mdl-card__title bg-primary">
              <h2 className="mdl-card__title-text mdl-typography--text-center w100">BEM VINDO</h2>
            </div>
            <div className="mdl-card__supporting-text w100 text-center">
              <If test={isConfirmed}>
                <h4>Sua conta foi confirmada com sucesso</h4>
                <h6>
                  Você será redirecionado para a página de Login em &nbsp;
                  {segundosRestantes}
.
                </h6>
              </If>

              <If test={isLoading}>
                <div className="loading">
                  <Spinner name="ball-pulse-sync" fadeIn="none" />
                </div>
              </If>
              <If test={errorMessage}>
                {/* <div className="alert alert-warning msg-error-login text-center" role="alert">
                Clique aqui para reenviar o email de confirmação.
              </div> */}
                <div className="alert alert-danger msg-error-login text-center" role="alert">
                  {errorMessage}
                </div>
              </If>
            </div>
          </div>
        </Card>
      </Fragment>
    );
  }
}

export default connect(
  null,
  { addShops, addShop, setAuth },
)(Login);
