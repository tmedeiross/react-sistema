import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import Spinner from 'react-spinkit';

import './recover.css';

import { Card } from './recover';
import If from '../../common/if';
import ValidateForm from './validator';
import LoginForm from './form';
import * as AuthAPI from '../../../api/auth';
import Footer from '../../layout/footer';
import { ROUTE_PREFIX as PREFIX } from '../../../config';
import { addShops, addShop } from '../../../redux-flow/reducers/shops/action-creators';
import { setAuth } from '../../../redux-flow/reducers/auth/action-creators';

export class RecuperarSenha extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      errors: {},
      isLoading: false,
      errorMessage: '',
      successMessage: '',
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

    const resetState = { errors: {}, errorMessage: '', successMessage: '' };
    this.setState(resetState);

    const { email } = this.state;

    AuthAPI.forgetPassword(email)
      .then((response) => {
        this.setState({ ...resetState });
        this.setState({
          successMessage: 'Senha enviada com sucesso, por favor verifique seu email.',
        });

        setTimeout(() => {
          this.setState({
            successMessage: '',
          });
          return this.redirectToHome();
        }, 3000);
      })
      .catch((err) => {
        if (err.status === 404) {
          this.setState({
            errorMessage: 'Usuário não encontrado.',
          });
        } else {
          this.setState({
            errorMessage: err.message,
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
      errors, email, isLoading, errorMessage, successMessage,
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
                email={email}
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
              <If test={successMessage}>
                <div className="alert alert-success msg-success-login text-center" role="alert">
                  {successMessage}
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
)(RecuperarSenha);
