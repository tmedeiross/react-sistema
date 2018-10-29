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
import { CDN_URL } from "Constants/defaultValues";

export class Account extends Component {
  constructor(props) {
    super(props);

    this.state = {
      avatar: "",
      user: {
        files: "",
        id: "",
        name: "",
        email: "",
        userDetail: {
          phoneNumber: "",
          gender: ""
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
    // this.listAllSuppliers = this.listAllSuppliers.bind(this);
    this.addSupplier = this.addSupplier.bind(this);
    this.listUserSupplier = this.listUserSupplier.bind(this);
    this.deleteSupplierShopModal = this.deleteSupplierShopModal.bind(this);
    this.deleteSupplier = this.deleteSupplier.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.onChangeSupplier = this.onChangeSupplier.bind(this);
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeSupplier = this.handleChangeSupplier.bind(this);
    this.updateLogin = this.updateLogin.bind(this);
    this.isImg = this.isImg.bind(this);
  }

  componentDidMount() {
    this.getUser();
    this.isImg();
  }
  componentWillMount() {
    this.listAllSuppliers();
  }
  updateLogin() {
    this.props.updateUserRequest(this.state.user, this.props.history);
  }

  componentWillReceiveProps(nextProps) {
    this.isImg();
  }

  isImg() {
    setTimeout(() => {
      const id = this.props.authUser.userDetails.id;
      const img = new Image();
      const avatar = `${CDN_URL + id}.jpg`;
      img.src = avatar;
      img.onload = () => {
        this.setState({ avatar });
      };
      img.onerror = () => {
        this.setState({ avatar: "/assets/img/avatar.png" });
      };
    }, 1400);
  }

  onChange = async e => {
    console.log("handleChangeImage");
    const file = e.target.files[0];

    const outputNav = document.getElementById("outputNav");
    const output = document.getElementById("output");

    console.log(URL.createObjectURL(e.target.files[0]));
    output.src = URL.createObjectURL(e.target.files[0]);
    outputNav.src = URL.createObjectURL(e.target.files[0]);

    this.setState({ files: e.target.files[0] });

    const config = {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    };
    const data = new FormData();
    data.append("file", file);

    await AuthAPI.addImage(data, config)
      .then(response => {
        console.log(response);
      })
      .catch(err => {
        console.log(err.data);
      });
  };

  getUser() {
    setTimeout(() => {
      if (this.props.authUser.userDetails.userDetail === null) {
        this.setState({
          userEmail: this.props.authUser.userDetails.email,
          user: {
            ...this.state.user,
            id: this.props.authUser.userDetails.id,
            name: this.props.authUser.userDetails.name,
            email: this.props.authUser.userDetails.email
          }
        });
      } else {
        this.setState({
          ...this.state.user,
          user: this.props.authUser.userDetails
        });
      }
      this.listUserSupplier();
    }, 1000);
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

  listUserSupplier() {
    AuthAPI.listUserSupplier(this.state.user.id)
      .then(response => {
        console.log(response);
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
    console.log(this.state.value);

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

    const { supplierCnpj, awardsCode } = this.state;
    const userEmail = this.props.authUser.userDetails.email;

    console.log(userEmail, supplierCnpj, awardsCode);

    AuthAPI.addUserSupplier({
      userEmail,
      supplierCnpj,
      awardsCode
    })
      .then(response => {
        console.log(response);
        this.listUserSupplier();
        this.setState({
          ...resetState,
          successMessage: "Fornecedor incluído com sucesso."
        });

        setTimeout(() => {
          this.setState({
            successMessage: ""
          });
        }, 1000);
      })
      .catch(err => {
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
    console.log(e.target.id);
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

  onChangeSupplier = (event, { newValue }) => {
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
          AuthAPI.deleteUserSupplier(idSupplier)
            .then(response => {
              this.listUserSupplier();
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
        this.listUserSupplier();
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    const { userDetail } = this.state.user;
    const {
      errorMessageUser,
      // loading,
      successMessageUser
    } = this.props.authUser;
    const { id, name, email } = this.props.authUser.userDetails;
    const shouldDisplayNotFound = !this.state.supplierStore.length;
    const {
      loading,
      errorMessage,
      successMessage,
      user,
      errors,
      suggestions,
      awardsCode,
      purchaseCode,
      defaultMessage,
      priority,
      supplierStore,
      avatar
    } = this.state;

    const inputProps = {
      placeholder: "Procure seu fornecedor",
      value: this.state.value,
      onChange: this.onChangeSupplier,
      onBlur: this.onBlur
    };

    return (
      <Fragment>
        <Row>
          <Col sm="12">
            <Card body>
              <CardTitle> Alterar dados do usuário </CardTitle>
              <Form>
                <Row>
                  <Colxx xxs="12" sm="4">
                    <div className="avatar">
                      <img
                        id="output"
                        alt="Profile"
                        src={avatar}
                        onError={e => {
                          e.target.onerror = null;
                          e.target.src = "/assets/img/avatar.png";
                        }}
                      />
                      <div onSubmit={this.onFormSubmit}>
                        <p className="text-center">
                          <input
                            type="file"
                            name="file"
                            id="files"
                            placeholder="Trocar imagem"
                            hidden
                            onChange={e => this.onChange(e)}
                          />
                          <label
                            className="chance-image"
                            htmlFor="files"
                            onChange={e => this.onChange(e)}
                          >
                            Trocar imagem
                          </label>
                        </p>
                      </div>
                    </div>
                  </Colxx>
                  <Colxx xxs="12" sm="8">
                    <p>{email}</p>
                    <Form>
                      <Label className="form-group has-float-label mb-4">
                        <Input
                          name="name"
                          type="text"
                          value={name}
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
                          onChange={this.handleChange}
                        />
                        <IntlMessages id="shops.phoneNumber" />
                      </Label>
                      <CustomInput
                        type="radio"
                        name="gender"
                        id="gender"
                        label="Masculino"
                        checked={user.userDetail.gender === "MALE"}
                        id="MALE"
                        value="MALE"
                        onChange={this.handleChange}
                      />
                      <CustomInput
                        type="radio"
                        name="gender"
                        id="gender"
                        label="Feminino"
                        checked={user.userDetail.gender === "FEMALE"}
                        id="FEMALE"
                        value="FEMALE"
                        onChange={this.handleChange}
                      />
                      <NavLink
                        className="app-menu-button d-inline-block text-primary mt-3"
                        href="/auth/change-pass"
                      >
                        Trocar a senha
                      </NavLink>
                      <Button
                        color="primary"
                        className="btn-shadow float-right"
                        size="lg"
                        onClick={this.updateLogin}
                      >
                        <IntlMessages id="shops.button-update" />
                      </Button>
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
                    <Col sm="4" xxs="12">
                      <Label className="form-group has-float-label mb-4">
                        <Input
                          name="awardsCode"
                          type="text"
                          value={this.state.awardsCode}
                          onChange={this.handleChangeSupplier}
                          maxLength="10"
                        />
                        <IntlMessages id="supplier.label-awardsCode" />
                      </Label>
                    </Col>
                  </Row>
                </Form>
                {errorMessageUser && (
                  <Alert color="danger" className="rounded mt-3 text-center">
                    {errorMessageUser}
                  </Alert>
                )}
                {successMessageUser && (
                  <Alert color="success" className="rounded mt-3 text-center">
                    {successMessageUser}
                  </Alert>
                )}
                {/* {loading && <div className="loading-inline" />}  */}
                <Button
                  color="primary"
                  className="btn-shadow float-right"
                  size="lg"
                  onClick={() => this.addSupplier()}
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
                          <span className="badge badge-secondary badge-pill">
                            Código de compra: {supplier.awardsCode}
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
            </Card>
          </Col>
        </Row>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  authUser: state.authUser
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ ...ShopActions, ...AuthActions }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Account);
