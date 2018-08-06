import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import '../../../styles/global';
import Modal from '../../Modal';
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
    this.state = {
      title: 'Cadastrado com sucesso!',
      description: 'Complete seus dados',
      btnConfirm: 'SALVE',
      lbPhone: 'Telefone',
      lbPosition: 'Telefone',
      lbMale: 'Masculino',
      lbFemale: 'Feminino',
      isOpen: false,
    };

    this.handleChange = this.handleChange.bind(this);
  }

  toggleModal = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
  };

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
                <p className="mdl-typography--text-center w100">
                  {this.state.description}
                </p>
                <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label w100">
                  <input
                    className="mdl-textfield__input"
                    type="text"
                    id="cadNome"
                    name="phone"
                    pattern="-?[0-9]*(\.[0-9]+)?"
                    value={this.state.name}
                    onChange={this.handleChange}
                  />
                  <label className="mdl-textfield__label" htmlFor="cadPhone">
                    {this.state.lbPhone}
                  </label>
                </div>

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

                <label className="mdl-radio mdl-js-radio" htmlFor="male">
                  <input type="radio" id="male" name="gender" className="mdl-radio__button" />
                  <span className="mdl-checkbox__label">
                    {this.state.lbMale}
                  </span>
                </label>
                <label className="mdl-radio mdl-js-radio ml1" htmlFor="female">
                  <input type="radio" id="female" name="gender" className="mdl-radio__button" />
                  <span className="mdl-checkbox__label">
                    {this.state.lbFemale}
                  </span>
                </label>
              </form>
            </div>
            <div className="mdl-card__actions mdl-typography--text-right">
              <Link
                type="button"
                className="mdl-button mdl-js-button mdl-button--raised mdl-button--primary ml1 mdl-js-ripple-effect"
                color="primary"
                to="/home"
              >
                {this.state.btnConfirm}
              </Link>
            </div>
          </div>
        </Card>
      </div>
    );
  }
}

export default Cadastro;
