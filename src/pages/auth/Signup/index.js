import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import '../../../styles/global';
import Modal from '../../Modal';
import AuthService from '../../../components/AuthService';
import Navbar from '../../../layout/Navbar/Navbar';

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
    this.handleChange = this.handleChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.Auth = new AuthService();
    this.state = {
      title: 'Cadastre-se',
      btnLogin: 'JÁ TENHO CONTA',
      bntCadastrar: 'CRIAR CONTA',
      lbName: 'Nome',
      lbEmail: 'Email',
      lbPassword: 'Senha',
      lbConfirmPassword: 'Confirmação de Senha',
      errName: 'Quantidade de caracteres insuficiente (minímo 10)',
      errEmail: 'Email incorreto',
      errPassword: 'Quantidade de caracteres insuficiente (minímo 10)',
      errConfirmPassword: 'Email não confere',
      modalText: 'Verifique sua caixa de email. A confirmação foi enviada para ',
      modalResend: 'Não recebi o email. Clique aqui para reenviar',
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      isOpen: false,
    };

    this.handleChange = this.handleChange.bind(this);
  }

  componentWillMount() {
    if (this.Auth.loggedIn()) this.props.history.replace('/');
  }

  toggleModal = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  };

  handleFormSubmit(e) {
    e.preventDefault();
    this.Auth.createUser(this.state.name, this.state.username, this.state.password)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // handleFormSubmit(e) {
  //   e.preventDefault();

  //   this.Auth.login(this.state.username, this.state.password)
  //     .then((res) => {
  //       this.props.history.replace('/');
  //     })
  //     .catch((err) => {
  //       alert(err);
  //     });
  // }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  validateForm() {
    return this.state.password === this.state.confirmPassword;
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
              <form action="#" onSubmit={this.handleFormSubmit}>
                <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label w100">
                  <input
                    className="mdl-textfield__input"
                    type="text"
                    id="cadNome"
                    name="name"
                    value={this.state.name}
                    onChange={this.handleChange}
                  />
                  <label className="mdl-textfield__label" htmlFor="cadNome">
                    {this.state.lbName}
                  </label>
                </div>

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
                  {/* <span className="mdl-textfield__error">
                    {this.state.errEmail}
                  </span> */}
                </div>

                <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label w100">
                  <input
                    className="mdl-textfield__input"
                    type="password"
                    name="password"
                    id="cadPassword"
                    // pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                    // value={this.state.password}
                    onChange={this.handleChange}
                  />
                  <label className="mdl-textfield__label" htmlFor="cadPassword">
                    {this.state.lbPassword}
                  </label>
                  {/* <span className="mdl-textfield__error">
                    {this.state.errPassword}
                  </span> */}
                </div>

                <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label w100">
                  <input
                    className="mdl-textfield__input"
                    type="password"
                    name="confirmPassword"
                    id="cadConfirmPassword"
                    // pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                    value={this.state.confirmPassword}
                    onChange={this.handleChange}
                  />
                  <label className="mdl-textfield__label" htmlFor="cadConfirmPassword">
                    {this.state.lbConfirmPassword}
                  </label>
                  <span className="mdl-textfield__error">
                    {this.state.errConfirmPassword}
                  </span>
                </div>
                <div className="mdl-card__actions mdl-typography--text-right">
                  <Link
                    type="button"
                    className="mdl-button mdl-js-button mdl-button--raised mdl-button--accent mdl-js-ripple-effect"
                    color="primary"
                    to="/signin"
                  >
                    {this.state.btnLogin}
                  </Link>
                  {/* <button
                    className="mdl-button mdl-js-button mdl-button--raised mdl-button--primary ml1 mdl-js-ripple-effect"
                    color="primary"
                    type="submit"
                  >
                    {this.state.bntCadastrar}
                  </button> */}
                  <button
                    type="button"
                    className="mdl-button mdl-js-button mdl-button--raised mdl-button--primary ml1 mdl-js-ripple-effect"
                    color="primary"
                    disabled={!this.validateForm()}
                    onClick={this.toggleModal}
                  >
                    {this.state.bntCadastrar}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </Card>

        <Modal show={this.state.isOpen} onClose={this.toggleModal}>
          <h4>
            {this.state.modalText}
          </h4>
          <a href="/">
            {this.state.modalResend}
          </a>
          <br />
          <br />
          <br />
          <Link
            type="button"
            className="mdl-button mdl-js-button mdl-button--raised mdl-button--primary mdl-js-ripple-effect"
            color="primary"
            to="/"
          >
            Fechar
          </Link>
        </Modal>
      </div>
    );
  }
}

export default Cadastro;
