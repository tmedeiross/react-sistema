import React, { Component, Fragment } from "react";

import IntlMessages from "Util/IntlMessages";
import {
  Row,
  Card,
  CardTitle,
  Button,
  Modal,
  ModalHeader,
  NavLink,
  ModalBody,
  ModalFooter,
  CardText,
  CardBody,
  Col,
  Form,
  Label,
  Input,
  Alert,
  CustomInput
} from "reactstrap";
import { Colxx, Separator } from "Components/CustomBootstrap";

import Autosuggest from "react-autosuggest";
import swal from "sweetalert";
import InputMask from "react-input-mask";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Creators as AuthActions } from "Redux/auth/reducer";
import { Creators as ShopActions } from "Redux/shops/reducer";
import * as AuthAPI from "Constants/api";
import ValidateForm from "./validator";

export class Account extends Component {
  constructor(...props) {
    super(props);

    this.state = {
      user: {
        id: "",
        name: "",
        userDetail: {
          phoneNumber: "",
          gender: "MALE"
        }
      },
      modalOpen: false,
      suggestions: [],
      suppliers: [],
      shopUsers: [],
      shopSelected: [],
      email: "",
      profile: "",
      errors: {},
      textBtn: "Adicionar fornecedor",
      profileId: "",
      userEmail: "",
      storeCnpj: "",
      supplierCnpj: "",
      idCode: "",
      errorMessage: "",
      successMessage: "",
      userSelected: "",
      openDialog: false,
      value: "",
      awardsCode: "",
      purchaseCode: "",
      defaultMessage: "",
      priority: "",
      supplierStore: []
    };
    this.handleOpenDialog = this.handleOpenDialog.bind(this);
    this.handleCloseDialog = this.handleCloseDialog.bind(this);
    this.listAllSuppliers = this.listAllSuppliers.bind(this);
    this.addSupplier = this.addSupplier.bind(this);
    this.shopSelectedDetails = this.shopSelectedDetails.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.listSupplierStore = this.listSupplierStore.bind(this);
    this.deleteSupplierShopModal = this.deleteSupplierShopModal.bind(this);
    this.deleteSupplier = this.deleteSupplier.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeSupplier = this.handleChangeSupplier.bind(this);
  }

  handleChangeName(event) {
    this.setState({
      user: {
        ...this.state.user,
        name: event.target.value
      }
    });
  }

  handleChange(event) {
    const target = event.target;
    const value = target.type === "radio" ? target.value : target.value;

    const userDetail = { ...this.state.user.userDetail };
    userDetail[target.name] = value;

    this.setState({
      user: {
        ...this.state.user,
        userDetail
      }
    });
  }

  handleChangeSupplier(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  toggleModal() {
    this.setState({
      modalOpen: !this.state.modalOpen,
      errorMessage: ""
    });
  }

  componentDidMount() {
    const { getShopRequest } = this.props;
    this.listAllSuppliers();
    getShopRequest();
    this.shopSelectedDetails();
    this.listSupplierStore();

    const teste = this.props.authUser.userDetails;
    setTimeout(() => {
      this.setState({
        user: {
          ...this.state.user,
          teste
        }
      });
    }, 1000);
  }

  handleOpenDialog() {
    const { supplierCnpj } = this.state;
    if (supplierCnpj) {
      this.setState({
        openDialog: true
      });
    } else {
      this.setState({
        errorMessage: "Por favor, selecione um fornecedor"
      });
    }
  }

  handleCloseDialog() {
    this.setState({
      openDialog: false
    });
  }

  returnParams() {
    const idString = this.props.history.location.search;
    const storeID = idString.split("=");
    return storeID[1];
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
      errorMessage: "",
      isLoading: true
    };

    AuthAPI.listSupplier()
      .then(response => {
        this.setState({ ...resetState });
        this.setState({ suppliers: response.data.content });
      })
      .catch(err => {
        console.log(err.data.message);
      });
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  shopSelectedDetails() {
    const idString = this.props.history.location.search;
    const storeID = idString.split("=");

    AuthAPI.storeGet(storeID[1])
      .then(response => {
        this.setState({ storeCnpj: response.data.cnpj });
        this.setState({ idCode: response.data.id });
      })
      .catch(err => {
        console.log(err);
      });
  }

  listSupplierStore() {
    const idString = this.props.history.location.search;
    const storeID = idString.split("=");

    AuthAPI.listSupplierStore(storeID[1])
      .then(response => {
        this.setState({ supplierStore: response.data.content });
      })
      .catch(err => {
        console.log(err);
      });
  }

  addSupplier(e) {
    if (!this.isValid()) {
      this.setState({ errorMessage: "Campos obrigatórios" });
      return;
    }

    const resetState = {
      errors: {},
      errorMessage: "",
      successMessage: "",
      isLoading: true,
      awardsCode: "",
      purchaseCode: "",
      defaultMessage: "",
      priority: ""
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
      supplierStore
    } = this.state;

    AuthAPI.addSupplierStore({
      supplierCnpj,
      storeCnpj,
      idCode,
      awardsCode,
      purchaseCode,
      defaultMessage,
      priority
    })
      .then(response => {
        this.listSupplierStore();
        this.handleCloseDialog();
        this.setState({
          ...resetState,
          successMessage: "Fornecedor incluído com sucesso.",
          modalOpen: false
        });

        setTimeout(() => {
          this.setState({
            successMessage: ""
          });
        }, 1000);
      })
      .catch(err => {
        this.handleCloseDialog();
        console.log(err);
        if (err.status === 404) {
          this.setState({
            errorMessage: "Fornecedor já está vinculado a esta loja."
          });
        } else {
          this.setState({
            errorMessage: "Dados incorretos ou faltantes."
          });
        }
      });
  }

  getSuggestions = value => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0
      ? []
      : this.state.suppliers.filter(
          lang =>
            lang.socialName.toLowerCase().slice(0, inputLength) === inputValue
        );
  };

  getSuggestionValue = suggestion => suggestion.socialName;

  getCnpjSupplier = e => {
    this.setState({ supplierCnpj: e.target.id });
  };

  renderSuggestion = suggestion => (
    <div
      className="suggestionsList"
      onClick={this.getCnpjSupplier}
      id={suggestion.cnpj}
    >
      {suggestion.socialName}
    </div>
  );

  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue
    });
  };

  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: this.getSuggestions(value)
    });
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  deleteSupplierShopModal(e) {
    const idSupplier = e.target.id;
    swal(
      "Tem certeza que deseja excluir este fornecedor?",
      "O que deseja fazer?",
      {
        buttons: {
          home: {
            text: "Deletar",
            value: "delete"
          },
          proximo: {
            text: "Cancelar",
            value: "cancel"
          }
        }
      }
    ).then(value => {
      switch (value) {
        case "delete":
          AuthAPI.deleteSupplier(idSupplier)
            .then(response => {
              this.listSupplierStore();
            })
            .catch(err => {
              console.log(err);
            });
          break;
        case "cancel":
          break;
        default:
          break;
      }
    });
  }

  deleteSupplier(e) {
    const idSupplier = e.target.id;

    AuthAPI.deleteSupplier(idSupplier)
      .then(response => {
        console.log(response);
        this.listSupplierStore();
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    const { userDetail } = this.state.user;
    // const { errorMessage, loading, successMessage } = this.props.authData;
    const { id, name, email } = this.props.authUser.userDetails;
    const shouldDisplayNotFound = !this.state.supplierStore.length;
    const {
      loading,
      errorMessage,
      successMessage,
      user,
      avatar,
      errors,
      suggestions,
      awardsCode,
      purchaseCode,
      defaultMessage,
      priority,
      supplierStore
    } = this.state;

    const inputProps = {
      placeholder: "Procure seu fornecedor",
      value: this.state.value,
      onChange: this.onChange,
      onBlur: this.onBlur
    };

    return (
      <Fragment>
        <Row>
          <Col sm="12">
            <Card body>
              {/* {JSON.stringify(this.props.authUser.userDetails)} */}

              <CardTitle> Alterar dados do usuário </CardTitle>
              <Form>
                <Row>
                  <Colxx xxs="12" sm="4">
                    <span className="avatar">
                      <img alt="Profile" src="/assets/img/avatar.png" />
                    </span>
                  </Colxx>
                  <Colxx xxs="12" sm="8">
                    <p>{email}</p>
                    <Form>
                      <Label className="form-group has-float-label mb-4">
                        <Input
                          name="fantasyName"
                          type="text"
                          value={user.name}
                          onChange={this.handleChangeName}
                          maxLength="30"
                        />
                        <IntlMessages id="user.name" />
                      </Label>
                      <Label className="form-group has-float-label mb-4">
                        <InputMask
                          className="form-control"
                          mask="(99) 9999-9999"
                          name="phoneNumber"
                          type="text"
                          value={userDetail.phoneNumber}
                          onChange={this.onChange}
                        />
                        <IntlMessages id="shops.phoneNumber" />
                      </Label>

                      <CustomInput
                        type="radio"
                        name="showSalesValues"
                        id="showSalesValues"
                        label="Masculino"
                        checked={userDetail.gender === "MALE"}
                        id="MALE"
                        value="MALE"
                        onChange={this.handleChange}
                      />
                      <CustomInput
                        type="radio"
                        name="showSalesValues"
                        id="showSalesValues"
                        label="Feminino"
                        checked={userDetail.gender === "FEMALE"}
                        id="FEMALE"
                        value="FEMALE"
                        onChange={this.handleChange}
                      />
                    </Form>
                  </Colxx>
                </Row>
              </Form>
              <Separator className="mb-5 mt-5" />
              <CardTitle>Adicionar fornecedor </CardTitle>
              <CardBody>
                <Form>
                  <Row>
                    <Col sm="8" xxs="12">
                      <Label className="form-group has-float-label mb-4">
                        <Autosuggest
                          className="form-control"
                          suggestions={suggestions}
                          onSuggestionsFetchRequested={
                            this.onSuggestionsFetchRequested
                          }
                          onSuggestionsClearRequested={
                            this.onSuggestionsClearRequested
                          }
                          getSuggestionValue={this.getSuggestionValue}
                          renderSuggestion={this.renderSuggestion}
                          inputProps={inputProps}
                        />
                        <IntlMessages id="supplier.label-supplier" />
                      </Label>
                    </Col>
                  </Row>
                </Form>
                {loading && <div className="loading-inline" />}
                <Button
                  color="primary"
                  className="btn-shadow float-right"
                  size="lg"
                  onClick={this.toggleModal}
                >
                  <IntlMessages id="supplier.button-select" />
                </Button>
              </CardBody>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col sm="12">
            <Card body>
              <CardTitle> Fornecedores cadastrados </CardTitle>
              {shouldDisplayNotFound && (
                <CardTitle className="text-center">
                  {" "}
                  Nenhum fornecedor cadastrados{" "}
                </CardTitle>
              )}
              <CardText>
                {this.state.supplierStore.map(supplier => (
                  <Card className="d-flex flex-row">
                    <div className="pl-2 d-flex flex-grow-1 min-width-zero">
                      <div className="card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center">
                        <NavLink
                          to={`/app/shop?p=${supplier.id}`}
                          className="w-40 w-sm-100"
                        >
                          <p className="list-item-heading mb-1 truncate">
                            {supplier.fantasyName}
                          </p>
                        </NavLink>
                        <div className="w-15 w-sm-100 text-right">
                          {supplier.defaultMessage}
                        </div>
                        <div className="w-15 w-sm-100 text-right">
                          <span className="badge badge-secondary badge-pill">
                            Código de compra: {supplier.purchaseCode}
                          </span>
                        </div>
                        <div
                          className=" w-sm-100 text-right supplier-delete"
                          onClick={this.deleteSupplierShopModal}
                        >
                          <span
                            className="iconsmind-Close-Window text-danger"
                            value={supplier.id}
                            id={supplier.id}
                          />
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </CardText>
            </Card>
          </Col>
        </Row>

        <Modal
          isOpen={this.state.modalOpen}
          toggle={this.toggleModal}
          wrapClassName="modal-right"
          backdrop="static"
        >
          <ModalHeader toggle={this.toggleModal}>
            <IntlMessages id="supplier.add-new" />
          </ModalHeader>
          <ModalBody>
            <form onSubmit={() => this.onUserLogin()}>
              <Label className="form-group has-float-label mb-4">
                <Input
                  name="awardsCode"
                  type="text"
                  value={this.state.awardsCode}
                  onChange={this.handleChange}
                  maxLength="10"
                />
                <IntlMessages id="supplier.label-awardsCode" />
              </Label>
              <Label className="form-group has-float-label mb-4">
                <Input
                  name="purchaseCode"
                  type="text"
                  value={this.state.purchaseCode}
                  onChange={this.handleChange}
                  maxLength="10"
                />
                <IntlMessages id="supplier.label-purchaseCode" />
              </Label>
              <Label className="form-group has-float-label mb-4">
                <Input
                  name="defaultMessage"
                  type="text"
                  value={this.state.defaultMessage}
                  onChange={this.handleChange}
                  maxLength="65"
                />
                <IntlMessages id="supplier.label-defaultMessage" />
              </Label>
              <Label className="form-group has-float-label mb-4">
                <Input
                  name="priority"
                  type="text"
                  value={this.state.priority}
                  onChange={this.handleChange}
                  maxLength="6"
                />
                <IntlMessages id="supplier.label-priority" />
              </Label>
              {loading && <div className="loading-inline" />}
            </form>
            {loading && <div className="loading-inline" />}
            {errorMessage && (
              <Alert color="danger" className="rounded mt-3 text-center">
                {errorMessage}
              </Alert>
            )}
            {successMessage && (
              <Alert color="success" className="rounded mt-3 text-center">
                {successMessage}
              </Alert>
            )}
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" outline onClick={this.toggleModal}>
              <IntlMessages id="shops.cancel" />
            </Button>
            <Button color="primary" onClick={() => this.addSupplier()}>
              <IntlMessages id="shops.add" />
            </Button>{" "}
          </ModalFooter>
        </Modal>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  authUser: state.authUser,
  shops: state.shops
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ ...ShopActions, ...AuthActions }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Account);
