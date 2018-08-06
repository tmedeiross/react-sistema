import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import AuthService from '../../../components/AuthService';
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
    this.handleChange = this.handleChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.Auth = new AuthService();
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
  }

  componentWillMount() {
    if (this.Auth.loggedIn()) this.props.history.replace('/');
  }

  handleFormSubmit(e) {
    e.preventDefault();

    this.Auth.login(this.state.username, this.state.password)
      .then((res) => {
        this.props.history.replace('/');
      })
      .catch((err) => {
        alert(err);
      });
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }
  // handleChange = (event) => {
  //   this.setState({
  //     [event.target.name]: event.target.value,
  //   });
  // };

  // validateForm() {
  //   return this.state.email.length > 0 && this.state.password.length > 0;
  // }

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
              <form onSubmit={this.handleFormSubmit}>
                <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label w100">
                  <input
                    className="mdl-textfield__input"
                    type="text"
                    id="cadEmail"
                    name="username"
                    // pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                    // value={this.state.email}
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
                    name="password"
                    type="password"
                    id="cadPassword"
                    // minLength="10"
                    // pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                    // value={this.state.senha}
                    onChange={this.handleChange}
                  />
                  <label className="mdl-textfield__label" htmlFor="cadPassword">
                    {this.state.lbPassword}
                  </label>
                  <span className="mdl-textfield__error">
                    {this.state.errPassword}
                  </span>
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

export default Signin;
