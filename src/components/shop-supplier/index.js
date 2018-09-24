import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Autosuggest from 'react-autosuggest';

import './styles.css';

import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import ValidateForm from './validator';
import If from '../common/if';
import { loadingOn, loadingOff } from '../../redux-flow/reducers/loader/action-creators';
import { Creators as ShopActions } from '../../redux-flow/ducks/shops';
import { Card, Container } from './styles';
import Form from './form';
import FormUpdate from './formUpdate';
import * as AuthAPI from '../../api/auth';

export class ShopSupplier extends Component {
  constructor(...props) {
    super(...props);
    this.state = {
      suggestions: [],
      suppliers: [],
      shopUsers: [],
      shopSelected: [],
      email: '',
      profile: '',
      errors: {},
      textBtn: 'Adicionar fornecedor',
      profileId: '',
      userEmail: '',
      storeCnpj: '',
      supplierCnpj: '',
      idCode: '',
      errorMessage: '',
      successMessage: '',
      userSelected: '',
      openDialog: false,
      value: '',
      awardsCode: '',
      purchaseCode: '',
      defaultMessage: '',
      priority: '',
      supplierStore: [],
    };
    this.handleOpenDialog = this.handleOpenDialog.bind(this);
    this.handleCloseDialog = this.handleCloseDialog.bind(this);
    this.listAllSuppliers = this.listAllSuppliers.bind(this);
    this.addSupplier = this.addSupplier.bind(this);
    this.shopSelectedDetails = this.shopSelectedDetails.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.listSupplierStore = this.listSupplierStore.bind(this);
  }

  componentDidMount() {
    const { getShopRequest } = this.props;
    this.listAllSuppliers();
    getShopRequest();
    this.shopSelectedDetails();
    this.listSupplierStore();
  }

  handleOpenDialog() {
    this.setState({
      openDialog: true,
    });
  }

  handleCloseDialog() {
    this.setState({
      openDialog: false,
    });
  }

  returnParams() {
    return this.props.paramId;
  }

  isValid() {
    const { errors, isValid } = ValidateForm(this.state);

    if (!isValid) {
      this.setState({ errors });
    }

    return isValid;
  }

  listAllSuppliers() {
    const resetState = {
      suppliers: [],
      errors: {},
      errorMessage: '',
      isLoading: true,
    };

    AuthAPI.listSupplier()
      .then((response) => {
        this.setState({ ...resetState });
        this.setState({ suppliers: response.data.content });
      })
      .catch((err) => {
        console.log(err.data.message);
      });
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  shopSelectedDetails() {
    AuthAPI.storeGet(this.props.paramId)
      .then((response) => {
        this.setState({ storeCnpj: response.data.cnpj });
        this.setState({ idCode: response.data.id });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  listSupplierStore() {
    AuthAPI.listSupplierStore(this.props.paramId)
      .then((response) => {
        console.log(response.data.content);
        this.setState({ supplierStore: response.data.content });
        // this.setState({ idCode: response.data.id });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  addSupplier(e) {
    e.preventDefault();
    console.log(this.state.value);

    const resetState = {
      errors: {},
      errorMessage: '',
      successMessage: '',
      isLoading: true,
    };

    this.setState(resetState);
    const {
      supplierCnpj,
      storeCnpj,
      idCode,
      awardsCode,
      purchaseCode,
      defaultMessage,
      priority,
    } = this.state;

    AuthAPI.addSupplierStore({
      supplierCnpj,
      storeCnpj,
      idCode,
      awardsCode,
      purchaseCode,
      defaultMessage,
      priority,
    })
      .then((response) => {
        console.log(response);
        this.handleCloseDialog();
        this.setState({ ...resetState });
        this.setState({
          successMessage: 'Fornecedor incluído com sucesso.',
        });
      })
      .catch((err) => {
        this.handleCloseDialog();
        console.log(err);
        if (err.status === 404) {
          this.setState({
            errorMessage: 'Fornecedor já está vinculado a esta loja.',
          });
        } else {
          this.setState({
            errorMessage: 'Dados incorretos ou faltantes.',
          });
        }
      });
  }


  getSuggestions = (value) => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0
      ? []
      : this.state.suppliers.filter(
        lang => lang.socialName.toLowerCase().slice(0, inputLength) === inputValue,
      );
  };



  getSuggestionValue = suggestion => suggestion.socialName;
  getCnpjSupplier = (e) => {
    this.setState ({ supplierCnpj: e.target.id })
  }

  renderSuggestion = suggestion => (
    <div className="suggestionsList" onClick={this.getCnpjSupplier} id={suggestion.cnpj}>
      {suggestion.socialName}
    </div>
  );

  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue,
    });
  };

  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: this.getSuggestions(value),
    });
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: [],
    });
  };

  render() {
    const {
      errors,
      errorMessage,
      successMessage,
      suggestions,
    } = this.state;

    const inputProps = {
      placeholder: 'Procure seu fornecedor',
      value: this.state.value,
      onChange: this.onChange,
      onBlur: this.onBlur,
    };

    return (
      <Container>
        <Card>
          <div className="mdl-card mdl-shadow--2dp cadastro">
            <div className="mdl-card__title bg-primary">
              <h2 className="mdl-card__title-text mdl-typography--text-center w100">
                Adicionar fornecedor
              </h2>
            </div>
            <div className="mdl-card__supporting-text w100 mdl-grid autosuggest">
              <div className="mdl-cell mdl-cell--10-col">
                <Autosuggest
                  suggestions={suggestions}
                  onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                  onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                  getSuggestionValue={this.getSuggestionValue}
                  renderSuggestion={this.renderSuggestion}
                  inputProps={inputProps}
                />
              </div>

              <div className="mdl-cell mdl-cell--2-col">
                <input
                  onClick={this.handleOpenDialog}
                  type="button"
                  className="mdl-button btn-block mdl-js-button mdl-button--raised mdl-button--accent mdl-js-ripple-effect bg-primary"
                  value="Selecionar"
                />
              </div>
            </div>

            <div className="mdl-card__title bg-primary">
              <h2 className="mdl-card__title-text mdl-typography--text-center w100">
                Fornecedor cadastrados
              </h2>
            </div>
            <div className="mdl-card__supporting-text w100">
              <table className="mdl-data-table mdl-js-data-table mdl-shadow--2dp">
                <thead>
                  <tr>
                    <th className="mdl-data-table__cell--non-numeric">Nome</th>
                    <th className="text-left">Mensagem</th>
                    <th className="text-left">Código de compra</th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                {this.state.supplierStore.map(supplier => (
                  <tr>
                    <td className="mdl-data-table__cell--non-numeric">{supplier.fantasyName}</td>
                    <td className="text-left">{supplier.defaultMessage}</td>
                    <td className="text-left">{supplier.purchaseCode}</td>
                    <td className="mdl-typography--text-right">
                      <Button
                        // href={`${PREFIX}/store/${store.id}`}
                        // onClick={this.deleteUserShop} */}
                        // value={suppliers.id}
                        // id={suppliers.id} */}
                        mini
                        variant="fab"
                        className="fab btn-delete mdl-button mdl-js-button mdl-button--raised  ml1 mdl-js-ripple-effect btn-secondary"
                        aria-label="Delete"
                      >
                        <i className="fas fa-trash" value={supplier.id} id={supplier.id} />
                        {/* <i className="fas fa-trash" /> */}
                      </Button>
                    </td>
                  </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mdl-card__supporting-text w100">
              <If test={errorMessage}>
                <div className="alert alert-danger msg-error-login text-center" role="alert">
                  {errorMessage}
                </div>
              </If>
              <If test={successMessage}>
                <div className="alert alert-success msg-success-login text-center" role="alert">
                  {successMessage}
                </div>
              </If>
            </div>
          </div>
          <Dialog className="modalUser" open={this.state.openDialog}>
            <DialogTitle>Detalhes do fornecedor</DialogTitle>
            <DialogContent>
              <Form
                {...this.state}
                handleSubmit={this.addSupplier}
                handleChange={this.handleChange}
                errors={errors}
              />
            </DialogContent>
            <DialogActions>
              <input
                onClick={this.addSupplier}
                type="button"
                className="mdl-button mdl-js-button mdl-button--raised mdl-button--accent mdl-js-ripple-effect bg-primary"
                value="Adicionar fornecedor"
              />
              <input
                onClick={this.handleCloseDialog}
                type="button"
                className="mdl-button mdl-js-button mdl-button--raised mdl-button--accent mdl-js-ripple-effect bg-primary btn-delete"
                value="Cancelar"
              />
            </DialogActions>
          </Dialog>
        </Card>
      </Container>
    );
  }
}
// ShopSupplier.prototype = {

// }

const mapStateToProps = state => ({
  shops: state.shopData,
});

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(ShopActions, dispatch),
  loadingOn,
  loadingOff,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ShopSupplier);
