import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import Spinner from 'react-spinkit';
import swal from 'sweetalert';
import Footer from '../../layout/footer';

import './signup.css';
import { Card } from './style';
import NavBar from '../../layout/nav-bar';

import If from '../../common/if';
import ValidateForm from './validator';
import FormSignup from './form';
import * as AuthAPI from '../../../api/auth';
// import * as StoreAPI from '../../../api/store';
import { ROUTE_PREFIX as PREFIX } from '../../../config';
import { addShops, addShop } from '../../../redux-flow/reducers/shops/action-creators';
import { setAuth } from '../../../redux-flow/reducers/auth/action-creators';

export class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      confirmpassword: '',
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

    const { name, email, password } = this.state;

    AuthAPI.user({
      name,
      email,
      password,
    })
      .then((response) => {
        localStorage.setItem('shop', email);
        localStorage.setItem('user', email);
        this.setState({ ...resetState });
        swal(
          'Atenção',
          `Um email de ativação foi enviado para ${email}. Por favor, verifique seu email e clique no link para ativar sua conta.`,
          'success',
        ).then(() => this.redirectToHome());
      })
      .catch((err) => {
        if (err.status === 404) {
          if (err.data.message === 'E-mail already in use!') {
            this.setState({
              isLoading: false,
              errorMessage: 'Este email já está em uso.',
            });
          } else {
            this.setState({
              isLoading: false,
              errorMessage: err.data.message,
            });
          }
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
      errors, name, email, password, confirmpassword, isLoading, errorMessage,
    } = this.state;

    return (
      <Fragment>
        <NavBar />
        <Card>
          <div className="mdl-card mdl-shadow--2dp">
            <div className="mdl-card__title bg-primary">
              <h2 className="mdl-card__title-text mdl-typography--text-center w100">CADASTRE-SE</h2>
            </div>
            <div className="mdl-card__supporting-text w100">
              <FormSignup
                handleSubmit={this.handleSubmit}
                handleChange={this.handleChange}
                name={name}
                email={email}
                password={password}
                confirmpassword={confirmpassword}
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
        <Footer />
      </Fragment>
    );
  }
}

export default connect(
  null,
  { addShops, addShop, setAuth },
)(Login);
