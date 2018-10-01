import React, { Component } from 'react';
import { connect } from 'react-redux';
// import Spinner from 'react-spinkit';
import swal from 'sweetalert';
import $ from 'jquery';

import { Card } from './style';
import './store.css';

import { onlyNumbersCnpj } from '../../utils/string';
import If from '../common/if';
import ValidateForm from './validator';
import FormAddStore from './form';
import * as AuthAPI from '../../api/auth';

import { ROUTE_PREFIX as PREFIX } from '../../config';
// import { addShops, addShop } from '../../redux-flow/reducers/shops/action-creators';
// import { setAuth } from '../../redux-flow/reducers/auth/action-creators';
import { assignMasks } from '../client-details/client-data/form-address/masks';
import * as ZipCodeService from '../../utils/services/zip-code';
import { loadingOn, loadingOff } from '../../redux-flow/reducers/loader/action-creators';

const initialState = {
  id: '',
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
  title: 'Nova Loja',
  textBtn: 'ADICIONAR',
};

export class StoreDetails extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleBlurCpf = () => onlyNumbersCnpj(this.state.cpnj);

  // handleBlurNumber = () => onlyNumbersCnpj(this.state.number);
  handleBlurNumber() {
    console.log('sdf');
    const value = this.state.cpnj;

    return value.replace(/\.|-/g, '');
  }

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

  existParams() {
    return !!this.props.paramId;
  }

  returnParams() {
    return this.props.paramId;
  }

  componentDidMount() {
    $('#number').focus();

    this.assignMasks();

    if (this.existParams()) {
      this.getStore();
      this.setState({ title: 'Dados da Loja' });
      this.setState({ textBtn: 'ALTERAR' });
    }
  }

  handleBlurCep = (e) => {
    const { loadingOn, loadingOff } = this.props;
    const { value } = e.target;

    if (!value) return;
    loadingOn();
    ZipCodeService.searchAddressByZipCode(e.target.value)
      .then((response) => {
        if (response.status === 404) {
          swal('Atenção', 'Cep não encontrado', 'warning');
          loadingOff();
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
        loadingOff();
      })
      .catch(() => {
        loadingOff();
        swal('Atenção', 'Ocorreu um erro ao consultar o cep', 'error');
      });
  };

  assignMasks = () => {
    assignMasks();
    // $('#cnpj').focus();
  };

  getStore() {
    const storeID = this.props.paramId;
    AuthAPI.storeGet(storeID)
      .then((response) => {
        const getStoreData = response.data;
        this.setState(...initialState, getStoreData);
      })
      .catch((response) => {
        console.log(response);
      });
  }

  putStore() {
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

    const storeID = this.props.paramId;

    AuthAPI.storePut(storeID, {
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
        this.props.history.push(`${PREFIX}/shops`);
      })
      .catch((response) => {
        console.log(response);
        this.setState({
          isLoading: false,
          errorMessage: 'Dados incorretos ou faltantes.',
        });
      });
  }

  newStore() {
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
      .then(() => {
        this.setState({ ...resetState, isLoading: false });
        swal('Loja incluída com sucesso!', 'O que deseja fazer?', {
          buttons: {
            home: {
              text: 'Ir para suas lojas',
              value: 'store',
            },
            proximo: {
              text: 'Cadastrar nova loja',
              value: 'stayhere',
            },
          },
        }).then((value) => {
          switch (value) {
            case 'store':
              this.props.history.push({
                pathname: `${PREFIX}/shops`,
              });
              break;
            case 'stayhere':
              this.setState(...initialState, initialState);
              break;
            default:
              break;
          }
        });
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
        } else if (err.status === 422) {
          this.setState({
            isLoading: false,
            errorMessage: 'Dados faltantes.',
          });
        } else {
          this.setState({
            isLoading: false,
            errorMessage: err.data.message,
          });
        }
      });
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    // if (!this.isValid()) return;

    if (this.existParams()) {
      this.putStore();
    } else {
      this.newStore();
    }

    e.target.reset();
  }

  render() {
    const { errors, errorMessage, title } = this.state;

    return (
      <Card>
        <div className="mdl-card mdl-shadow--2dp cadastro">
          <div className="mdl-card__title bg-primary">
            <h2 className="mdl-card__title-text mdl-typography--text-center w100 ">{title}</h2>
          </div>
          <div className="mdl-card__supporting-text w100">
            <FormAddStore
              {...this.state}
              handleSubmit={this.handleSubmit}
              handleChange={this.handleChange}
              handleBlurCpf={this.handleBlurCpf}
              handleBlurCep={this.handleBlurCep}
              handleBlurNumber={this.handleBlurNumber}
              errors={errors}
            />
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

const mapDispatchToProps = { loadingOn, loadingOff };

export default connect(
  null,
  mapDispatchToProps,
)(StoreDetails);
