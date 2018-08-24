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

class Signin extends Component {
  constructor(account, addUserDetails) {
    super(account, addUserDetails);
    this.handleChange = this.handleChange.bind(this);
    this.handleSignIn = this.handleSignIn.bind(this);
    this.state = {
      title: 'ENTRAR',
      btnLogin: 'LOGAR',
      bntCadastrar: 'CRIAR CONTA',
      lbEmail: 'Email',
      lbPassword: 'Senha',
      errEmail: 'Email incorreto',
      errPassword: 'Quantidade de caracteres insuficiente (minímo 10)',
      formData: {},
    };
  }

  handleSignIn = async (e) => {
    e.preventDefault();
    if (!this.state.formData.username) {
      this.setState({ error: 'Por favor, preencha o email para continuar.' });
    } else if (!this.state.formData.password) {
      this.setState({ error: 'Por favor, preencha a senha para continuar.' });
    } else {
      try {
        const response = await api.post('/login', this.state.formData);
        login(response.data.token);
        user(this.state.formData.username);
        console.log(response);
        this.props.history.push('/');
      } catch (err) {
        this.setState({
          error: 'Usuário e/ou senha inválidos verifique suas credenciais',
        });
        console.log(err.response.data.message);
      }
    }
  };

  handleChange(e) {
    this.setState({
      formData: { ...this.state.formData, [e.target.name]: e.target.value },
    });
  }

  render() {
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
              <form melhod="POST" onSubmit={this.handleSignIn}>
                {this.state.error && <p className="error">{this.state.error}</p>}

                <TextField
                  className="w100"
                  id="username"
                  name="username"
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

                <div className="mdl-card__actions mdl-typography--text-right">
                  <Link
                    type="button"
                    className="mdl-button mdl-js-button mdl-button--raised mdl-button--accent mdl-js-ripple-effect"
                    color="primary"
                    to="/signup"
                  >
                    {this.state.bntCadastrar}
                  </Link>

                  <button
                    className="mdl-button mdl-js-button mdl-button--raised mdl-button--primary ml1 mdl-js-ripple-effect"
                    color="primary"
                    type="submit"
                  >
                    {this.state.btnLogin}
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

export default withRouter(connect(mapStateToProps)(Signin));
