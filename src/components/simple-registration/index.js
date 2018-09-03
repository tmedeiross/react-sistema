import React, { Component } from 'react';
import { connect } from 'react-redux';
import swal from 'sweetalert';
import isCpf from 'iscpf';

import $ from 'jquery';
import moment from 'moment';
import { onlyNumbersCpf } from '../../utils/string';
import * as Helper from './helper';
import If from '../common/if';
import { ROUTE_PREFIX as PREFIX } from '../../config';
import { handleError } from '../../utils/error-messages';
import * as ClientAPI from '../../api/client';
import * as PersonAPI from '../../api/person';
import ClientInfo from '../client-details/client-data/form-info';
// import Breadcrumb from '../common/breadcrumb';
import { loadingOn, loadingOff } from '../../redux-flow/reducers/loader/action-creators';
import ErrorMessages from '../common/messages/error';
import { assignMasks } from '../client-details/client-data/form-address/masks';

const initialState = {
  errors: {},
  socialName: '',
  personalCpf: '',
  email: '',
  phone1: '',
  dateBirth: '',
  clientID: null,
  storeID: null,
  formInvalid: false,
};

class SimpleRegistration extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  componentDidMount() {
    this.assignMasks();
  }

  assignMasks = () => {
    const self = this;
    assignMasks();
    $('#phoneNumber').keyup(function () {
      self.setState({ phoneNumber: $(this).val() });
    });
    // $('#personalCpf').focus();
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: Helper.applyUpperCase(value) });
    if (name === 'email' && value.length > 0) {
      this.setState({ [name]: Helper.formatEmail(value) });
    }

    if (name === 'personalCpf' && value.length === 14) {
      setTimeout(() => {
        $('#socialName').focus();
        this.handleBlurCpf();
      }, 50);
    }
  };

  handleDateBirth = (date) => {
    const format = 'DD/MM/YYYY';
    const formatedDate = moment(date).format(format);
    this.setState({ dateBirth: formatedDate });
  };

  handleSubmit = () => {
    this.props.loadingOn();

    ClientAPI.createClient(this.state)
      .then((response) => {
        this.props.loadingOff();

        swal('Cliente gravado com sucesso! O que deseja fazer?', {
          buttons: {
            home: {
              text: 'Ir para tela inicial',
              value: 'home',
            },
            proximo: {
              text: 'Cadastrar endereço',
              value: 'address',
            },
          },
        }).then((value) => {
          switch (value) {
            case 'home':
              this.props.history.push({
                pathname: `${PREFIX}/`,
              });
              break;
            case 'address':
              this.props.history.push({
                pathname: `${PREFIX}/client/${response.data.clientID}`,
                search: '?tab=address',
              });
              break;
            default:
              this.props.history.push({
                pathname: `${PREFIX}/client/${response.data.clientID}`,
                search: '?tab=address',
              });
          }
        });
      })
      .catch((response) => {
        this.props.loadingOff();
        const { errors } = response.data;
        if (errors && errors.length) {
          this.setState({ errors: handleError(errors) });
        }
      });
  };

  handleBlurCpf = () => {
    const { personalCpf } = this.state;

    if (!personalCpf) {
      this.setState({
        errors: {},
        formInvalid: false,
      });
      return;
    }

    if (!isCpf(personalCpf)) {
      this.setState({
        errors: {
          personalCpf: 'Cpf inválido',
        },
        formInvalid: true,
      });
      return;
    }
    this.setState({
      formInvalid: false,
    });

    const cpf = onlyNumbersCpf(this.state.personalCpf);

    this.props.loadingOn();

    ClientAPI.getClients(cpf)
      .then((res) => {
        this.setState({ errors: {} });
        if (res.data.content && res.data.content.length) {
          this.setState({
            socialName: res.data.content[0].socialName,
            email: res.data.content[0].email,
            phone1: res.data.content[0].phone1,
            clientID: res.data.content[0].clientID,
            openEditForm: true,
          });
          swal('Atenção', 'Cliente já cadastrado!', 'warning').then(() => {
            this.props.history.push({
              pathname: `${PREFIX}/client/${this.state.clientID}`,
            });
          });
          this.props.loadingOff();
          return;
        }

        PersonAPI.getPersonalDataByCpf(cpf)
          .then((data) => {
            if (Number(data.RetornoCpf.msg.Resultado) === 1) {
              const state = {
                socialName: data.RetornoCpf.DadosTitular.Titular || '',
                dateBirth: data.RetornoCpf.DadosTitular.DataNascimento || '',
                zipCode: data.RetornoCpf.EnderecoTitular.Cep || '',
                state: data.RetornoCpf.EnderecoTitular.UF || '',
                city: data.RetornoCpf.EnderecoTitular.Cidade || '',
                address: data.RetornoCpf.EnderecoTitular.Logradouro || '',
                number: data.RetornoCpf.EnderecoTitular.Numero || '',
                neighborhood: data.RetornoCpf.EnderecoTitular.Bairro || '',
                complement: data.RetornoCpf.EnderecoTitular.Complemento || '',
              };
              this.setState(state);
              $('#email').focus();
            }
            this.props.loadingOff();
          })
          .catch(() => this.props.loadingOff());
      })
      .catch((response) => {
        this.props.loadingOff();
      });
  };

  openEditForm = () => {
    this.props.history.push({
      pathname: `${PREFIX}/client/${this.state.clientID}`,
      search: '?tab=address',
    });
  };

  render() {
    return (
      <div>
        <ErrorMessages errors={this.state.errors} />

        <div className="card">
          <div className="card-header">Novo Cadastro</div>
          <div className="card-body">
            <form autoComplete="off">
              <ClientInfo
                {...this.state}
                handleChange={this.handleChange}
                handleBlurCpf={this.handleBlurCpf}
                handleDateBirth={this.handleDateBirth}
              />
            </form>
          </div>
          <div className="card-footer">
            <If test={!this.state.openEditForm}>
              <button
                type="button"
                className="btn btn-primary float-right"
                onClick={this.handleSubmit}
                disabled={this.state.formInvalid}
              >
                Salvar
              </button>
            </If>
            <If test={this.state.openEditForm}>
              <button
                type="button"
                className="btn btn-primary float-right"
                onClick={this.openEditForm}
              >
                Abrir Cadastro
              </button>
            </If>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  { loadingOn, loadingOff },
)(SimpleRegistration);
