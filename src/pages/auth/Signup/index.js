import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import styled from 'styled-components';

// import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import * as AddUser from '../../../store/actions/account';

import { login, user } from '../../../services/auth';
import api from '../../../services/api';
import Navbar from '../../../layout/Navbar/Navbar';

import '../../../styles/global';

const Card = styled.header`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding-top: 150px;
`;

class Signup extends Component {
  constructor(account, addUserDetails) {
    super(account, addUserDetails);

    this.handleChange = this.handleChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.state = {
      title: 'Cadastre-se',
      btnLogin: 'JÁ TENHO CONTA',
      bntCadastrar: 'CRIAR CONTA',
      formData: {},
      emailValid: false,
      passwordValid: false,
      formValid: false,
      validate: '',
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!this.state.formData.name) {
      this.setState({ error: 'Por favor, preencha o nome para continuar.' });
    } else if (!this.state.formData.email) {
      this.setState({ error: 'Por favor, preencha o email para continuar.' });
    } else if (!this.state.formData.password) {
      this.setState({ error: 'Por favor, preencha a senha para continuar.' });
    } else if (!this.state.formData.confirmPassword) {
      this.setState({ error: 'Por favor, preencha a confirmação de senha para continuar.' });
    } else {
      try {
        const response = await api.post('/user', this.state.formData);
        this.props.history.push('/signin');
      } catch (err) {
        this.setState({
          error: err.response.data.message,
        });
      }
    }
  };

  handleChange(e) {
    this.setState({
      formData: { ...this.state.formData, [e.target.name]: e.target.value },
    });

    if (this.state.formData.password) {
      if (this.state.formData.password.length < 6) {
        this.setState({ error: 'Sua senha deve conter mais de 6 caracteres.' });
        this.setState({ validate: false });
      } else {
        this.setState({ error: '' });
        this.setState({ validate: true });
      }
    }
  }

  validateForm() {
    return (
      this.state.validate == true
      && this.state.formData.password === this.state.formData.confirmPassword
    );
  }

  render(addUserDetails, getUserDetails) {
    return (
      <div>
        <Navbar />
        <Card>
          <div className="mdl-card mdl-shadow--2dp">
            <div className="mdl-card__title bg-primary">
              <h2 className="mdl-card__title-text mdl-typography--text-center w100">
                {this.state.title}
              </h2>
            </div>
            <div className="mdl-card__supporting-text w100">
              <form action="#" onSubmit={this.handleFormSubmit}>
                {this.state.error && <p className="error">{this.state.error}</p>}

                <TextField
                  className="w100"
                  id="name"
                  name="name"
                  label="Nome"
                  margin="normal"
                  onChange={this.handleChange}
                />

                <TextField
                  className="w100"
                  id="email"
                  name="email"
                  label="Email"
                  margin="normal"
                  onChange={this.handleChange}
                />

                <TextField
                  className="w100"
                  id="password"
                  label="Senha"
                  name="password"
                  type="password"
                  margin="normal"
                  onChange={this.handleChange}
                />

                <TextField
                  className="w100"
                  name="confirmPassword"
                  id="cadConfirmPassword"
                  label="Confirmação de Senha"
                  type="password"
                  margin="normal"
                  onChange={this.handleChange}
                />

                <div className="mdl-card__actions mdl-typography--text-right">
                  <Link
                    type="button"
                    className="mdl-button mdl-js-button mdl-button--raised mdl-button--accent mdl-js-ripple-effect"
                    color="primary"
                    to="/signin"
                  >
                    {this.state.btnLogin}
                  </Link>

                  <button
                    type="submit"
                    className="mdl-button mdl-js-button mdl-button--raised mdl-button--primary ml1 mdl-js-ripple-effect"
                    color="primary"
                    disabled={!this.validateForm()}
                  >
                    {this.state.bntCadastrar}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  account: state.account,
});

const mapDispatchProps = dispatch => bindActionCreators(AddUser, dispatch);

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchProps,
  )(Signup),
);
