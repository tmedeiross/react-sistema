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
      title: 'Cadastro de Loja',
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

  componentDidMount() {
    this.Auth.loginAPI();
  }

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
                <h4>
Informação da loja
                </h4>
                <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label w100">
                  <input
                    className="mdl-textfield__input"
                    type="text"
                    id="cadNome"
                    name="name"
                    onChange={this.handleChange}
                  />
                  <label className="mdl-textfield__label" htmlFor="cadNome">
                    CNPJ
                  </label>
                </div>
                <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label w100">
                  <input
                    className="mdl-textfield__input"
                    type="text"
                    id="cadNome"
                    name="name"
                    onChange={this.handleChange}
                  />
                  <label className="mdl-textfield__label" htmlFor="cadNome">
                    Company name
                  </label>
                </div>
                <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label w100">
                  <input
                    className="mdl-textfield__input"
                    type="text"
                    id="cadNome"
                    name="name"
                    onChange={this.handleChange}
                  />
                  <label className="mdl-textfield__label" htmlFor="cadNome">
                    Trading name
                  </label>
                </div>
                <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label w100">
                  <input
                    className="mdl-textfield__input"
                    type="text"
                    id="cadNome"
                    name="name"
                    onChange={this.handleChange}
                  />
                  <label className="mdl-textfield__label" htmlFor="cadNome">
                    Phone Number
                  </label>
                </div>
                <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label w100">
                  <input
                    className="mdl-textfield__input"
                    type="text"
                    id="cadNome"
                    name="name"
                    onChange={this.handleChange}
                  />
                  <label className="mdl-textfield__label" htmlFor="cadNome">
                    Email
                  </label>
                </div>
                <h4>
Billing address
                </h4>
                <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label w100">
                  <input
                    className="mdl-textfield__input"
                    type="text"
                    id="cadNome"
                    name="name"
                    onChange={this.handleChange}
                  />
                  <label className="mdl-textfield__label" htmlFor="cadNome">
                    ZIP code
                  </label>
                </div>
                <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label w100">
                  <input
                    className="mdl-textfield__input"
                    type="text"
                    id="cadNome"
                    name="name"
                    onChange={this.handleChange}
                  />
                  <label className="mdl-textfield__label" htmlFor="cadNome">
                    Number
                  </label>
                </div>
                <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label w100">
                  <input
                    className="mdl-textfield__input"
                    type="text"
                    id="cadNome"
                    name="name"
                    onChange={this.handleChange}
                  />
                  <label className="mdl-textfield__label" htmlFor="cadNome">
                    Trading name
                  </label>
                </div>
                <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label w100">
                  <input
                    className="mdl-textfield__input"
                    type="text"
                    id="cadNome"
                    name="name"
                    onChange={this.handleChange}
                  />
                  <label className="mdl-textfield__label" htmlFor="cadNome">
                    Address Complementar
                  </label>
                </div>
                <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label w100">
                  <input
                    className="mdl-textfield__input"
                    type="text"
                    id="cadNome"
                    name="name"
                    onChange={this.handleChange}
                  />
                  <label className="mdl-textfield__label" htmlFor="cadNome">
                    Address
                  </label>
                </div>
                <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label w100">
                  <input
                    className="mdl-textfield__input"
                    type="text"
                    id="cadNome"
                    name="name"
                    onChange={this.handleChange}
                  />
                  <label className="mdl-textfield__label" htmlFor="cadNome">
                    Neighborhood
                  </label>
                </div>
                <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label w100">
                  <input
                    className="mdl-textfield__input"
                    type="text"
                    id="cadNome"
                    name="name"
                    onChange={this.handleChange}
                  />
                  <label className="mdl-textfield__label" htmlFor="cadNome">
                    City
                  </label>
                </div>
                <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label w100">
                  <div className="mdl-selectfield mdl-js-selectfield w100">
                    <select id="myselect" name="myselect" className="mdl-selectfield__select">
                      <option value="option0_value">
option 0
                      </option>
                      <option value="option1_value">
option 1
                      </option>
                    </select>
                    <label className="mdl-selectfield__label" htmlFor="myselect">
                      Choose option
                    </label>
                  </div>
                  <label className="mdl-textfield__label" htmlFor="cadNome">
                    Address
                  </label>
                </div>

                <div className="mdl-card__actions mdl-typography--text-right">
                  <button
                    type="button"
                    className="mdl-button mdl-js-button mdl-button--raised mdl-button--primary ml1 mdl-js-ripple-effect"
                    color="primary"
                    disabled={!this.validateForm()}
                    onClick={this.toggleModal}
                  >
                    Confirme
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

export default Cadastro;
