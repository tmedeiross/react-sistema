import React, { Component } from 'react';
import { connect } from 'react-redux';
import Spinner from 'react-spinkit';
import swal from 'sweetalert';
import cep from 'cep-promise';
import $ from 'jquery';

import { Card } from './style';
import './store.css';

import { onlyNumbersCnpj } from '../../utils/string';
import If from '../common/if';
import ValidateForm from './validator';
import FormAddStore from './form';
import * as AuthAPI from '../../api/auth';

import { ROUTE_PREFIX as PREFIX } from '../../config';
import { addShops, addShop } from '../../redux-flow/reducers/shops/action-creators';
import { setAuth } from '../../redux-flow/reducers/auth/action-creators';
import { assignMasks } from '../client-details/client-data/form-address/masks';
import * as ZipCodeService from '../../utils/services/zip-code';

const initialState = {
  cnpj: '',
  fantasyName: '',
  socialName: '',
  phoneNumber: '',
  email: '',
  address: '',
  number: '',
  complement: '',
  zipCode: '',
  neighborhood: '',
  city: '',
  state: '',
  errors: {},
  isLoading: false,
  errorMessage: '',
  formValid: 'false',
};

export class Login extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleBlurCpf = () => {
    const cnpj = onlyNumbersCnpj(this.state.cpnj);
  };

  redirectToHome() {
    return this.props.history.push(`${PREFIX}`);
  }

  isValid() {
    const { errors, isValid } = ValidateForm(this.state);

    if (!isValid) {
      this.setState({ errors });
    }

    return isValid;
  }

  componentDidMount() {
    this.assignMasks();
  }

  handleBlurCep = (e) => {
    const { value } = e.target;

    if (!value) return;

    // this.props.loadingOn();
    ZipCodeService.searchAddressByZipCode(e.target.value)
      .then((response) => {
        if (response.status === 404) {
          swal('Atenção', 'Cep não encontrado', 'warning');
          // this.props.loadingOff();
          return;
        }

        const data = {
          address: response.logradouro || '',
          neighborhood: response.bairro || '',
          city: response.cidade || '',
          state: response.estado || '',
        };

        if (response.logradouro) {
          this.setState({ ...data });
        }
        $('#number').focus();

        // this.props.loadingOff();
      })
      .catch(() => {
        // this.props.loadingOff();
        swal('Atenção', 'Ocorreu um erro ao consultar o cep', 'error');
      });
  };

  assignMasks = () => {
    assignMasks();
    $('#cnpj').focus();
  };

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    // if (!this.isValid()) return;

    const resetState = { errors: {}, errorMessage: '', isLoading: true };
    this.setState(resetState);

    const {
      cnpj,
      fantasyName,
      socialName,
      phoneNumber,
      email,
      address,
      number,
      complement,
      zipCode,
      neighborhood,
      city,
      state,
    } = this.state;

    AuthAPI.storeNew({
      cnpj,
      fantasyName,
      socialName,
      phoneNumber,
      email,
      address,
      number,
      complement,
      zipCode,
      neighborhood,
      city,
      state,
    })
      .then((response) => {
        this.setState({ ...resetState, isLoading: false });

        this.props.history.push(`${PREFIX}/stores`);
        // swal('Loja incluída com sucesso!', 'O que deseja fazer?', {
        //   buttons: {
        //     home: {
        //       text: 'Ir para suas lojas',
        //       value: 'store',
        //     },
        //     proximo: {
        //       text: 'Cadastrar nova loja',
        //       value: 'stayhere',
        //     },
        //   },
        // }).then((value) => {
        //   switch (value) {
        //     case 'store':
        //       this.props.history.push({
        //         pathname: `${PREFIX}/stores`,
        //       });
        //       break;
        //     case 'stayhere':
        //       break;
        //   }
        // });
      })
      .catch((err) => {
        console.log(err);
        if (err.data.message === 'Erro de Validação') {
          this.setState({
            isLoading: false,
            errorMessage: 'Dados incorretos ou faltantes.',
          });
        } else if (err.data.message === 'Store CNPJ already in use!') {
          this.setState({
            isLoading: false,
            errorMessage: 'Este CNPJ já está cadastrado',
          });
        } else if (err.status === 500) {
          this.setState({
            isLoading: false,
            errorMessage: 'Houve um problema, por favor, tente novamente.',
          });
        } else {
          this.setState({
            isLoading: false,
            errorMessage: err.data.message,
          });
        }
      });

    e.target.reset();
  }

  render() {
    const { errors, isLoading, errorMessage } = this.state;

    return (
      <Card>
        <div className="mdl-card mdl-shadow--2dp cadastro">
          <div className="mdl-card__title bg-primary">
            <h2 className="mdl-card__title-text mdl-typography--text-center w100 ">Nova loja</h2>
          </div>
          <div className="mdl-card__supporting-text w100">
            <FormAddStore
              {...this.state}
              handleSubmit={this.handleSubmit}
              handleChange={this.handleChange}
              handleBlurCpf={this.handleBlurCpf}
              handleBlurCep={this.handleBlurCep}
              isLoading={isLoading}
              errors={errors}
              // isValid={isValid}
            />
            <If test={isLoading}>
              <div className="loading">
                <Spinner name="ball-pulse-sync" fadeIn="none" />
              </div>
            </If>
            <If test={errorMessage}>
              <div className="alert alert-danger msg-error-login text-center" role="alert">
                {errorMessage}
              </div>
            </If>
          </div>
        </div>
      </Card>
    );
  }
}

export default connect(
  null,
  { addShops, addShop, setAuth },
)(Login);