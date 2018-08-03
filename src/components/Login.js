import React, { Component } from 'react';
import styled from 'styled-components';
import '../styles/global';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Navbar from './Navbar';

const Card = styled.header`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding-top: 150px;
`;
class Cadastro extends Component {
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

      // isEnabled: false,
    };

    this.handleChange = this.handleChange.bind(this);
    // const isEnabled = email.length > 0 && password.length > 0;
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
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
              <form action="#">
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
                    pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
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
                type="button"
                // disabled={!isEnabled}
                className="mdl-button mdl-js-button mdl-button--raised mdl-button--accent mdl-js-ripple-effect"
                color="primary"
                to="/cadastro"
              >
                {this.state.bntCadastrar}
              </Link>

              <Link
                href="/login"
                type="button"
                className="mdl-button mdl-js-button mdl-button--raised mdl-button--primary ml1 mdl-js-ripple-effect"
                color="primary"
                to="/"
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

export default Cadastro;
