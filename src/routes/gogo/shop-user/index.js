import React, { Component, Fragment } from "react";
import IntlMessages from "Util/IntlMessages";
import {
  Row,
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
  Jumbotron,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  CardText,
  Col,
  Form,
  Label,
  Input,
  Alert,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  CustomInput
} from "reactstrap";

import SelectSimple from "Components/SelectSimple";
import { Colxx } from "Components/CustomBootstrap";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Creators as ShopActions } from "Redux/shop-user/reducer";

import swal from "sweetalert";

const options = [
  { value: "ADMIN", text: "Admin" },
  { value: "SALESMAN", text: "Vendedor" },
  { value: "ASSEMBLY", text: "Montador" }
];

export class ShopUser extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.state = {
      shopActive: "",
      form: {
        showSalesValues: true,
        profileId: "ADMIN",
        userEmail: "",
        userSelected: ""
      },
      items: "",
      currentPage: 1,
      totalPage: 12,
      modalOpen: false
    };
    this.onChange = this.onChange.bind(this);
    this.deleteUserShopModal = this.deleteUserShopModal.bind(this);
    this.editUserShop = this.editUserShop.bind(this);
    this.toggleNested = this.toggleNested.bind(this);
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  deleteUserShopModal(e) {
    const userSelected = e.target.id;
    swal(
      "Tem certeza que deseja excluir este usuário?",
      "O que deseja fazer?",
      {
        buttons: {
          delete: {
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
          this.props.deleteUserRequest(
            userSelected,
            this.props.shops.dataDetails.cnpj,
            this.props.history
          );
          break;
        case "cancel":
          break;
        default:
          break;
      }
    });
  }

  onChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const form = { ...this.state.form };
    form[target.name] = value;
    this.setState({ form });

    console.log(form);
  }

  addUser() {
    this.props.addUserRequest(
      this.state.form,
      this.props.shops.dataDetails.cnpj,
      this.props.history
    );
  }

  onChangePage(page) {
    this.setState({
      currentPage: page
    });
  }

  toggleModal() {
    this.setState({
      modalOpen: !this.state.modalOpen
    });
  }

  componentWillMount = () => {
    setTimeout(() => {
      this.props.listUserRequest(
        this.props.shops.data.cnpj,
        this.props.history
      );
    }, 700);
  };

  toggleNested(e) {
    const form = {
      userSelected: e.target.dataset.idcode,
      profileId: e.target.dataset.id,
      userEmail: e.target.dataset.name,
      showSalesValues: e.target.dataset.showvalues === "true"
    };
    setTimeout(() => {
      this.setState({ form });
    }, 300);

    this.setState({
      nestedModal: !this.state.nestedModal,
      closeAll: false
    });
    console.log(form);
  }

  editUserShop(e) {
    this.props.editUserRequest(
      this.state.form,
      this.props.shops.dataDetails.cnpj,
      this.props.history
    );

    this.setState({
      nestedModal: !this.state.nestedModal,
      closeAll: false
    });
  }

  render() {
    const rowLength = this.state.items.length;
    const { users } = this.props.shopUser;
    const { errorMessage, successMessage, loading } = this.props.shopUser;
    return (
      <Fragment>
        <Row>
          <Col sm="12">
            <Card body>
              <CardTitle>Incluir usuários a loja </CardTitle>
              <CardText>
                <Form>
                  <Row>
                    <Col sm="6">
                      <Label className="form-group has-float-label mb-4">
                        <Input
                          name="userEmail"
                          type="text"
                          value={this.state.form.userEmail}
                          onChange={this.onChange}
                          maxLength="50"
                        />
                        <IntlMessages id="shops.userEmail" />
                      </Label>
                    </Col>
                    <Col sm="6">
                      <Label className="form-group has-float-label mb-4">
                        <SelectSimple
                          name="profileId"
                          id="profileId"
                          label="Profile"
                          value={this.state.form.profileId}
                          handleChange={this.onChange}
                          options={options}
                        />
                        <IntlMessages id="shop-user.label-profile" />
                      </Label>
                    </Col>
                  </Row>
                </Form>
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
                <Button
                  color="primary"
                  className="btn-shadow float-right"
                  size="lg"
                  onClick={() => this.addUser()}
                >
                  <IntlMessages id="user.button-add" />
                </Button>
              </CardText>
            </Card>
          </Col>
        </Row>

        <Row>
          <Colxx xxs="12" className="mb-4">
            <Card>
              <CardBody>
                <div className="mb-3" />
                {users.map((item, i) => {
                  return (
                    <Colxx xxs="12" key={item.id} className="mb-3">
                      <Card className="d-flex flex-row">
                        <div className="pl-2 d-flex flex-grow-1 min-width-zero">
                          <div className="card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center">
                            <NavLink
                              to={`/app/shop?p=${item.id}`}
                              className="w-40 w-sm-100"
                            >
                              <p className="list-item-heading mb-1 truncate">
                                {item.userEmail}
                                {item.showSalesValues === "false" && (
                                  <small className="ml-3 text-muted">
                                    Vendedor
                                  </small>
                                )}
                                {item.showSalesValues === "true" && (
                                  <small className="ml-3 text-muted">
                                    Vendedor
                                  </small>
                                )}
                              </p>
                            </NavLink>
                            <div className="w-15 w-sm-100 text-right">
                              <span className="badge badge-pill">
                                Valores visiveis:{" "}
                                <strong>
                                  {item.showSalesValues === true && (
                                    <strong>SIM</strong>
                                  )}
                                  {item.showSalesValues === false && (
                                    <strong>NÃO</strong>
                                  )}
                                </strong>
                              </span>
                            </div>
                            <div className="w-15 w-sm-100 text-right">
                              <span className="badge badge-secondary badge-pill">
                                {item.profileId === "SALESMAN" && (
                                  <small>Vendedor</small>
                                )}
                                {item.profileId === "ADMIN" && (
                                  <small>Admin</small>
                                )}
                                {item.profileId === "ASSEMBLY" && (
                                  <small>Montador</small>
                                )}
                              </span>
                            </div>
                            <div className="btn-edit d-flex">
                              <div
                                className=" w-sm-50 text-right supplier-delete mr-3"
                                onClick={this.toggleNested}
                              >
                                <span
                                  className="iconsmind-Pencil text-primary"
                                  data-name={item.userEmail}
                                  data-id={item.profileId}
                                  data-idcode={item.id}
                                  data-showvalues={item.showSalesValues}
                                  value={item.id}
                                  id={item.id}
                                />
                              </div>
                              <div
                                className=" w-sm-50 text-right supplier-delete"
                                onClick={this.deleteUserShopModal}
                              >
                                <span
                                  className="iconsmind-Close-Window text-danger"
                                  value={item.id}
                                  id={item.id}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </Card>
                    </Colxx>
                  );
                })}
              </CardBody>
            </Card>
          </Colxx>
        </Row>
        <Modal
          isOpen={this.state.nestedModal}
          toggle={this.toggleNested}
          onClosed={
            this.state.closeAll ? this.toggleNestedContainer : undefined
          }
        >
          <ModalHeader>Atualizar usuário</ModalHeader>
          <ModalBody>
            <Label className="form-group has-float-label mb-4">
              <Input
                name="userEmail"
                type="text"
                value={this.state.form.userEmail}
                onChange={this.onChange}
                maxLength="50"
              />
              <IntlMessages id="shops.userEmail" />
            </Label>
            <Label className="form-group has-float-label mb-4">
              <SelectSimple
                name="profileId"
                id="profileId"
                label="Profile"
                value={this.state.form.profileId}
                handleChange={this.onChange}
                options={options}
              />
              <IntlMessages id="shop-user.label-profile" />
            </Label>
            <CustomInput
              type="checkbox"
              name="showSalesValues"
              id="showSalesValues"
              label="Habilitar valores visíveis"
              checked={this.state.form.showSalesValues}
              value={this.state.form.showSalesValues}
              onChange={this.onChange}
            />
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.toggleNested}>
              <IntlMessages id="shops.cancel" />
            </Button>{" "}
            <Button color="secondary" onClick={this.editUserShop}>
              <IntlMessages id="shops.button-update" />
            </Button>
          </ModalFooter>
        </Modal>
        <div className="float-sm-right" />
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  shopUser: state.shopUser,
  shops: state.shops
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(ShopActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShopUser);
