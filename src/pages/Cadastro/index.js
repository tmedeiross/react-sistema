import React, { Component, Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import styled from 'styled-components';

// import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import * as AddUser from '../../store/actions/account';

import { login, user } from '../../services/auth';
import api from '../../services/api';

import NavbarInterna from '../../layout/NavbarInterna/NavbarInterna';

import '../../styles/global';
import './cadastro.css';

const Container = styled.header`
  padding-top: 100px;
`;
const Card = styled.header`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding-top: 50px;
`;
class Cadastro extends Component {
  constructor(account, addUserDetails) {
    super(account, addUserDetails);
    this.handleChange = this.handleChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.state = {
      formData: {},
    };
  }

  handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log(this.state.formData);
    try {
      const response = await api.post('/store', this.state.formData);
      this.props.history.push('/lojas');
    } catch (err) {
      console.log(err.response);
      this.setState({
        error: err.response.data.message,
      });
    }
  };

  handleChange(e) {
    this.setState({
      formData: { ...this.state.formData, [e.target.name]: e.target.value },
    });
  }

  render() {
    return (
      <Fragment>
        <NavbarInterna />
        <Container>
          <Card>
            <div className="mdl-card mdl-shadow--2dp cadastro">
              <div className="mdl-card__title bg-primary">
                <h2 className="mdl-card__title-text mdl-typography--text-center w100">
                  Cadastro de loja
                </h2>
              </div>
              <div className="mdl-card__supporting-text w100">
                <form action="#" onSubmit={this.handleFormSubmit}>
                  {this.state.error && <p className="error">{this.state.error}</p>}
                  <div className="mdl-grid">
                    <div className="mdl-cell mdl-cell--12-col">
                      <h4>Informação da loja</h4>
                    </div>
                  </div>

                  <div className="mdl-grid">
                    <div className="mdl-cell mdl-cell--6-col">
                      <TextField
                        className="w100"
                        id="cnpj"
                        name="cnpj"
                        label="CNPJ"
                        margin="normal"
                        type="number"
                        onChange={this.handleChange}
                      />
                    </div>
                  </div>

                  <div className="mdl-grid">
                    <div className="mdl-cell mdl-cell--6-col">
                      <TextField
                        className="w100"
                        id="fantasyName"
                        name="fantasyName"
                        label="Nome da Empresa"
                        margin="normal"
                        onChange={this.handleChange}
                      />
                    </div>
                    <div className="mdl-cell mdl-cell--6-col">
                      <TextField
                        className="w100"
                        id="socialName"
                        name="socialName"
                        label="Razão Social"
                        margin="normal"
                        onChange={this.handleChange}
                      />
                    </div>
                  </div>

                  <div className="mdl-grid">
                    <div className="mdl-cell mdl-cell--6-col">
                      <TextField
                        className="w100"
                        id="phoneNumber"
                        name="phoneNumber"
                        label="Telefone"
                        margin="normal"
                        type="number"
                        onChange={this.handleChange}
                      />
                    </div>
                    <div className="mdl-cell mdl-cell--6-col">
                      <TextField
                        className="w100"
                        id="email"
                        name="email"
                        label="Email"
                        margin="normal"
                        onChange={this.handleChange}
                      />
                    </div>
                  </div>

                  <div className="mdl-grid">
                    <div className="mdl-cell mdl-cell--12-col">
                      <h4>Endereço de cobrança</h4>
                    </div>
                  </div>
                  <div className="mdl-grid">
                    <div className="mdl-cell mdl-cell--12-col">
                      <TextField
                        className="w100"
                        id="address"
                        name="address"
                        label="Endereço"
                        margin="normal"
                        onChange={this.handleChange}
                      />
                    </div>
                  </div>
                  <div className="mdl-grid">
                    <div className="mdl-cell mdl-cell--3-col">
                      <TextField
                        className="w100"
                        id="number"
                        name="number"
                        label="Numero"
                        margin="normal"
                        type="number"
                        onChange={this.handleChange}
                      />
                    </div>
                    <div className="mdl-cell mdl-cell--6-col">
                      <TextField
                        className="w100"
                        id="complement"
                        name="complement"
                        label="Complemento"
                        margin="normal"
                        onChange={this.handleChange}
                      />
                    </div>
                    <div className="mdl-cell mdl-cell--3-col">
                      <TextField
                        className="w100"
                        id="zipCode"
                        name="zipCode"
                        label="CEP"
                        margin="normal"
                        onChange={this.handleChange}
                      />
                    </div>
                  </div>

                  <div className="mdl-grid">
                    <div className="mdl-cell mdl-cell--4-col">
                      <TextField
                        className="w100"
                        id="neighborhood"
                        name="neighborhood"
                        label="Bairro"
                        margin="normal"
                        onChange={this.handleChange}
                      />
                    </div>

                    <div className="mdl-cell mdl-cell--4-col">
                      <TextField
                        className="w100"
                        id="city"
                        name="city"
                        label="Cidade"
                        margin="normal"
                        onChange={this.handleChange}
                      />
                    </div>
                    <div className="mdl-cell mdl-cell--4-col">
                      <TextField
                        className="w100"
                        id="select-currency-native"
                        select
                        name="state"
                        label="UF"
                        onChange={this.handleChange}
                        SelectProps={{
                          native: true,
                        }}
                        helperText="Por favor, selecione seu estado"
                        margin="normal"
                      >
                        <option value="AC">Acre</option>
                        <option value="AL">Alagoas</option>
                        <option value="AP">Amapá</option>
                        <option value="AM">Amazonas</option>
                        <option value="BA">Bahia</option>
                        <option value="CE">Ceará</option>
                        <option value="DF">Distrito Federal</option>
                        <option value="ES">Espírito Santo</option>
                        <option value="GO">Goiás</option>
                        <option value="MA">Maranhão</option>
                        <option value="Mato GrossoMT" />
                        <option value="MS">Mato Grosso do Sul</option>
                        <option value="MG">Minas Gerais</option>
                        <option value="PA">Pará</option>
                        <option value="PB">Paraíba</option>
                        <option value="PR">Paraná</option>
                        <option value="PE">Pernambuco</option>
                        <option value="PI">Piauí</option>
                        <option value="RJ">Rio de Janeiro</option>
                        <option value="RN">Rio Grande do Norte</option>
                        <option value="RS">Rio Grande do Sul</option>
                        <option value="RO">Rondônia</option>
                        <option value="RR">Roraima</option>
                        <option value="SC">Santa Catarina</option>
                        <option value="SP">São Paulo</option>
                        <option value="SE">Sergipe</option>
                        <option value="TO">Tocantins</option>
                      </TextField>
                    </div>
                  </div>

                  <div className="mdl-card__actions mdl-typography--text-right">
                    <button
                      type="submit"
                      className="mdl-button mdl-js-button mdl-button--raised mdl-button--primary ml1 mdl-js-ripple-effect"
                      color="primary"
                    >
                      Confirme
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </Card>
        </Container>
      </Fragment>
    );
  }
}
export default withRouter(Cadastro);
