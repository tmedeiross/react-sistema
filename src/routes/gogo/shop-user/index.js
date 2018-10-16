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
  Badge
} from "reactstrap";

import Select from "react-select";
import CustomSelectInput from "Components/CustomSelectInput";
import { Colxx, Separator } from "Components/CustomBootstrap";
import Pagination from "Components/List/Pagination";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Creators as ShopActions } from "Redux/shop-user/reducer";

import swal from "sweetalert";

const SELECT_DATA_USER = [
  { value: "ADMIN", label: "Admin" },
  { value: "SALESMAN", label: "Vendedor" },
  { value: "ASSEMBLY", label: "Montador" }
];

export class ShopUser extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.state = {
      activeTab: "1",
      shopActive: "",
      form: {
        showSalesValues: true,
        profileId: "",
        userEmail: ""
      },
      items: "",
      currentPage: 1,
      totalPage: 12,
      modalOpen: false
    };
    this.onChange = this.onChange.bind(this);
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  onChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;

    const form = { ...this.state.form };
    form[target.name] = value;

    this.setState({ form });
  }

  addUser() {
    this.props.addUserRequest(
      this.state.form,
      this.props.shops.data.cnpj,
      this.props.history
    );
  }

  editUserShop() {
    const { form, storeCnpj, userSelected } = this.state;
    this.props.editUserShop(form, this.props.paramId, storeCnpj, userSelected);
    this.handleCloseDialog();
  }

  onChangePage(page) {
    this.setState({
      currentPage: page
    });
  }

  listUser() {
    const { storeCnpj } = this.state;
    this.props.listUser(this.props.paramId, storeCnpj);
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
  render() {
    const rowLength = this.state.items.length;
    const { socialName } = this.props.shops.data;
    const { users } = this.props.shopUser;
    const { errorMessage, successMessage, loading } = this.props.shopUser;
    // const userStore = this.props.shopUser.userStore.data;
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
                          maxLength="17"
                        />
                        <IntlMessages id="shops.userEmail" />
                      </Label>
                    </Col>
                    <Col sm="6">
                      <Label className="form-group has-float-label mb-4">
                        <Select
                          components={{ Input: CustomSelectInput }}
                          className="react-select"
                          classNamePrefix="react-select"
                          name="state"
                          options={SELECT_DATA_USER}
                          value={this.state.form.stateNome}
                          onChange={val => {
                            this.setState({
                              form: {
                                ...this.state.form,
                                profileId: val.value,
                                stateNome: val
                              }
                            });
                          }}
                        />
                        <IntlMessages id="shops.state" />
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
                  <IntlMessages id="shops.button-save" />
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
                            <div class="w-15 w-sm-100 text-right">
                              <span class="badge badge-secondary badge-pill">
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
                            {/* <div className="w-15 w-sm-100">
                              <Badge color={item.statusColor} pill>
                                {item.status}
                              </Badge>
                            </div> */}
                          </div>
                        </div>
                      </Card>
                    </Colxx>
                  );
                })}
              </CardBody>
            </Card>
          </Colxx>
          <Pagination
            currentPage={this.state.currentPage}
            totalPage={this.state.totalPage}
            onChangePage={i => this.onChangePage(i)}
          />
        </Row>
        <div className="float-sm-right">
          <Button
            color="primary"
            size="lg"
            className=""
            onClick={this.toggleModal}
          >
            <IntlMessages id="shops.add-new" />
          </Button>
          <Modal
            isOpen={this.state.modalOpen}
            toggle={this.toggleModal}
            wrapClassName="modal-right"
            backdrop="static"
          >
            <ModalHeader toggle={this.toggleModal}>
              <IntlMessages id="shops.add-new" />
            </ModalHeader>
            <ModalBody>
              <Form>
                <Label className="form-group has-float-label mb-4">
                  <Input
                    mask="99.999.999/9999-99"
                    className="form-control"
                    placeholder="Enter a phone number"
                    name="cnpj"
                    value={this.state.form.cnpj}
                    onChange={this.onChange}
                  />
                  <IntlMessages id="shops.cnpj" />
                </Label>
              </Form>
            </ModalBody>
            <ModalFooter>
              <Button color="secondary" outline onClick={this.toggleModal}>
                <IntlMessages id="shops.cancel" />
              </Button>
              <Button color="primary" onClick={() => this.addNewShop()}>
                <IntlMessages id="shops.add" />
              </Button>{" "}
            </ModalFooter>
          </Modal>
        </div>
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
