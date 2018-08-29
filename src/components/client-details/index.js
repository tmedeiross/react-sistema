import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import swal from 'sweetalert';
import isCpf from 'iscpf';

import $ from 'jquery';
import qs from 'query-string';
import moment from 'moment';
import { onlyNumbersCpf } from '../../utils/string';
import * as Helper from './helper';
import * as ClientAPI from '../../api/client';
import * as PersonAPI from '../../api/person';
import { handleError } from '../../utils/error-messages';
import { loadingOn, loadingOff } from '../../redux-flow/reducers/loader/action-creators';
import { getNearestDegree } from '../../utils/diopter';
import * as ZipCodeService from '../../utils/services/zip-code';
import { ROUTE_PREFIX as PREFIX } from '../../config';

import ClientData from './client-data';
import Breadcrumb from '../common/breadcrumb';

import ErrorMessages from '../common/messages/error';
import { assignMasks } from './client-data/form-address/masks';


export class ClientDetails extends PureComponent {
  constructor() {
    super();
    this.state = Helper.getInitialState();
    this.recipeFieldsForRound = Helper.getRecipeFieldsForRound();
  }

  componentDidMount() {
    this.setSelectedTab();
    this.getClient();
    this.assignMasks();
  }

  setSelectedTab = () => {
    const params = qs.parse(this.props.location.search);

    // const params = new URLSearchParams(this.props.location.search)
    if (params && params.tab) {
      const tab = params.tab;
      if (tab === 'address') {
        $('#address-tab').click();
        setTimeout(() => {
          $('#zipCode').focus();
        }, 1000);
      }
      if (tab === 'recipedata') {
        $('#recipedata-tab').click();
      }
    }
  };

  assignMasks = () => {
    assignMasks();
    const self = this;
    assignMasks();
    $('#phone1').keyup(function () {
      self.setState({ phone1: $(this).val() });
    });
  };

  getClient() {
    this.props.loadingOn();
    const { id } = this.props.match.params;

    this.setState({ clientID: id });

    ClientAPI.getClient(id)
      .then((res) => {
        this.setState({ ...Helper.fillState(res.data) });
        this.props.loadingOff();
      })
      .catch((response) => {
        this.props.loadingOff();
        swal('Atenção', 'Cliente não encontrado', 'warning').then(() => {
          this.props.history.push('/');
        });
      });
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: Helper.applyUpperCase(value) });
    if (name === 'email' && value.length > 0) {
      this.setState({ [name]: Helper.formatEmail(value) });
    }
    if (name === 'personalCpf' && value.length === 14) {
      setTimeout(
        () => {
          $('#socialName').focus();
          this.handleBlurCpf();
        },
        50,
      );
    }
  };

  handleDateBirth = (date) => {
    const format = 'DD/MM/YYYY';
    const formatedDate = moment(date).format(format);
    this.setState({ dateBirth: formatedDate });
  };

  handleBlur = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: this.processValue(name, value) });
    this.handleUpdateDiopter(name);
  };

  handleUpdateDiopter(fieldName) {
    let diopterProcessed = {};
    if (fieldName === 'rightFarCylinderPower') {
      diopterProcessed = Helper.calcDiopter(this.state, 'right', 'Near');
      this.updateDiopter(diopterProcessed, 'right', 'Near');
      return;
    }

    if (fieldName === 'rightNearCylinderPower') {
      diopterProcessed = Helper.calcDiopter(this.state, 'right', 'Far');
      this.updateDiopter(diopterProcessed, 'right', 'Far');
      return;
    }

    if (fieldName === 'leftFarCylinderPower') {
      diopterProcessed = Helper.calcDiopter(this.state, 'left', 'Near');
      this.updateDiopter(diopterProcessed, 'left', 'Near');
      return;
    }

    if (fieldName === 'leftNearCylinderPower') {
      diopterProcessed = Helper.calcDiopter(this.state, 'left', 'Far');
      this.updateDiopter(diopterProcessed, 'left', 'Far');
      return;
    }

    if (fieldName === 'rightAddition') {
      diopterProcessed = Helper.calcDiopter(this.state, 'right', 'Near');
      this.updateDiopter(diopterProcessed, 'right', 'Near');
      setTimeout(() => {
        diopterProcessed = Helper.calcDiopter(this.state, 'right', 'Far');
        this.updateDiopter(diopterProcessed, 'right', 'Far');
      }, 200);
      return;
    }

    if (fieldName === 'leftAddition') {
      diopterProcessed = Helper.calcDiopter(this.state, 'left', 'Near');
      this.updateDiopter(diopterProcessed, 'left', 'Near');
      setTimeout(() => {
        diopterProcessed = Helper.calcDiopter(this.state, 'left', 'Far');
        this.updateDiopter(diopterProcessed, 'left', 'Far');
      }, 200);
    }
  }

  updateDiopter = (data, eye, type) => {
    const fieldPrefix = eye + type;
    this.setState({
      [`${fieldPrefix}SpherePower`]: data[`${type}Sphere`],
      [`${fieldPrefix}CylinderPower`]: data[`${type}Cylinder`],
    });
  };

  processValue(field, value) {
    if (this.recipeFieldsForRound.includes(field)) {
      return getNearestDegree(value);
    }
    return value;
  }

  onImageCaptured = (result) => {
    this.setState({ image: result });
  };

  handleSubmit = () => {
    this.props.loadingOn();
    const { id } = this.props.match.params;
    const data = Helper.transformData(this.state);

    const searchParams = new URLSearchParams(this.props.location.search);
    const tabAddressSelected = searchParams.get('tab') === 'address';

    ClientAPI.updateClient(id, data)
      .then((response) => {
        this.props.loadingOff();
        this.setState({ errors: {} });
        swal('Cliente alterado com sucesso!', 'O que deseja fazer?', {
          buttons: {
            home: {
              text: 'Ir para tela inicial',
              value: 'home',
            },
            proximo: {
              text: tabAddressSelected ? 'Preencher a receita' : 'Permanecer aqui',
              value: tabAddressSelected ? 'prescription' : 'stayhere',
            },
          },
        }).then((value) => {
          switch (value) {
            case 'home':
              this.props.history.push({
                pathname: `${PREFIX}/`,
              });
              break;
            case 'prescription':
              $('#recipedata-tab').click();
              this.props.location.search = null;
              break;
            case 'stayhere':
              break;
            default:
              $('#recipedata-tab').click();
          }
        });
      })
      .catch((response) => {
        this.props.loadingOff();
        const { errors } = response.data;
        if (errors && errors.length) {
          this.setState({ errors: handleError(errors) });
          swal('Atenção', 'Corriga os erros e tente novamente.', 'error').then(() => {
            $(window).scrollTop(0);
          });
        }
      });
  };

  handleBlurCep = (e) => {
    const { value } = e.target;

    if (!value) return;

    this.props.loadingOn();
    ZipCodeService.searchAddressByZipCode(e.target.value)
      .then((response) => {
        if (response.status === 404) {
          swal('Atenção', 'Cep não encontrado', 'warning');
          this.props.loadingOff();
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

        this.props.loadingOff();
      })
      .catch(() => {
        this.props.loadingOff();
        swal('Atenção', 'Ocorreu um erro ao consultar o cep', 'error');
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

    if (!isCpf(this.state.personalCpf)) {
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

    this.setState({ errors: {}, formInvalid: false });

    ClientAPI.getClients(cpf)
      .then((res) => {
        if (res.data.content && res.data.content.length) {
          const id = res.data.content[0].clientID;
          if (Number(this.state.clientID) === Number(id)) {
            this.props.loadingOff();
            return;
          }
          swal('Atenção', 'Cliente já cadastrado!', 'warning').then(() => {
            this.props.history.push({
              pathname: `${PREFIX}/client/${id}`,
            });
            this.getClient();
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

  render() {
    return (
      <div>
        <Breadcrumb crumbs={Helper.getBreadcrumbData()} />

        <ErrorMessages errors={this.state.errors} />

        <ClientData
          {...this.state}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          onImageCaptured={this.onImageCaptured}
          handleBlurCep={this.handleBlurCep}
          handleBlurCpf={this.handleBlurCpf}
          handleBlur={this.handleBlur}
          handleDateBirth={this.handleDateBirth}
        />
      </div>
    );
  }
}

const mapDispatchToProps = { loadingOn, loadingOff };

export default connect(
  null,
  mapDispatchToProps,
)(ClientDetails);
