import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
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
  constructor() {
    super();
    this.state = {
      title: 'ENTRAR',
      btnLogin: 'LOGAR',
      bntCadastrar: 'CRIAR CONTA',
      lbEmail: 'Email',
      lbPassword: 'Senha',
      errEmail: 'Email incorreto',
      errPassword: 'Quantidade de caracteres insuficiente (minímo 10)',
      email: '',
      password: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    // console.log(sessionStorage.getItem('usuario'));
    console.log(sessionStorage.getItem('isAuthenticated'));
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
  };

  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0;
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
              <form action="#" onSubmit={this.handleSubmit}>
                <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label w100">
                  <input
                    className="mdl-textfield__input"
                    type="email"
                    id="cadEmail"
                    name="email"
                    pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                    value={this.state.email}
                    onChange={this.handleChange}
                  />
                  <label className="mdl-textfield__label" htmlFor="cadEmail">
                    {this.state.lbEmail}
                  </label>
                  <span className="mdl-textfield__error">
                    {this.state.errEmail}
                  </span>
                </div>

                <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label w100">
                  <input
                    className="mdl-textfield__input"
                    type="password"
                    name="password"
                    id="cadPassword"
                    // minLength="10"
                    // pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                    value={this.state.senha}
                    onChange={this.handleChange}
                  />
                  <label className="mdl-textfield__label" htmlFor="cadPassword">
                    {this.state.lbPassword}
                  </label>
                  <span className="mdl-textfield__error">
                    {this.state.errPassword}
                  </span>
                </div>
              </form>
            </div>
            <div className="mdl-card__actions mdl-typography--text-right">
              <Link
                type="submit"
                className="mdl-button mdl-js-button mdl-button--raised mdl-button--accent mdl-js-ripple-effect"
                color="primary"
                to="/signup"
              >
                {this.state.bntCadastrar}
              </Link>

              <Link
                type="button"
                className="mdl-button mdl-js-button mdl-button--raised mdl-button--primary ml1 mdl-js-ripple-effect"
                color="primary"
                to="/home"
                disabled={!this.validateForm()}
              >
                {this.state.btnLogin}
              </Link>
            </div>
          </div>
        </Card>
      </div>
    );
  }
}

export default Signin;
