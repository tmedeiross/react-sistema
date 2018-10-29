import React, { Component, Fragment } from "react";
import {
  Alert,
  Row,
  Card,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  UncontrolledDropdown,
  Collapse,
  DropdownMenu,
  DropdownToggle,
  DropdownItem,
  Input,
  CardBody,
  CardSubtitle,
  Label,
  CardText,
  Form
} from "reactstrap";
import { NavLink } from "react-router-dom";
import InputMask from "react-input-mask";
import SelectSimple from "Components/SelectSimple";

import IntlMessages from "Util/IntlMessages";
import { Colxx, Separator } from "Components/CustomBootstrap";
import { BreadcrumbItems } from "Components/BreadcrumbContainer";

import Pagination from "Components/List/Pagination";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Creators as ShopActions } from "Redux/shops/reducer";
import * as ZipCodeService from "Util/services/zip-code";

import swal from "sweetalert";
const options = [
  { value: "", text: "Selecionar" },
  { value: "AC", text: "Acre" },
  { value: "AL", text: "Alagoas" },
  { value: "AP", text: "Amapá" },
  { value: "AM", text: "Amazonas" },
  { value: "BA", text: "Bahia" },
  { value: "CE", text: "Ceará" },
  { value: "DF", text: "Distrito Federal" },
  { value: "ES", text: "Espírito Santo" },
  { value: "GO", text: "Goiás" },
  { value: "MA", text: "Maranhão" },
  { value: "MT", text: "Mato Grosso" },
  { value: "MS", text: "Mato Grosso do Sul" },
  { value: "MG", text: "Minas Gerais" },
  { value: "PA", text: "Pará" },
  { value: "PB", text: "Paraíba" },
  { value: "PR", text: "Paraná" },
  { value: "PE", text: "Pernambuco" },
  { value: "PI", text: "Piauí" },
  { value: "RJ", text: "Rio de Janeiro" },
  { value: "RN", text: "Rio Grande do Norte" },
  { value: "RS", text: "Rio Grande do Sul" },
  { value: "RO", text: "Rondônia" },
  { value: "RR", text: "Roraima" },
  { value: "SC", text: "Santa Catarina" },
  { value: "SP", text: "São Paulo" },
  { value: "SE", text: "Sergipe" },
  { value: "TO", text: "Tocantins" }
];

export class Shops extends Component {
  constructor(props) {
    super(props);
    this.toggleDisplayOptions = this.toggleDisplayOptions.bind(this);
    this.toggleSplit = this.toggleSplit.bind(this);
    this.dataListRender = this.dataListRender.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.getIndex = this.getIndex.bind(this);
    const pageSizes = [5, 10, 15, 20, 50];
    const orderOptions = [
      {
        column: "name",
        label: "Nome da empresa"
      },
      {
        column: "category",
        label: "Cidade"
      },
      {
        column: "status",
        label: "Status"
      }
    ];

    this.state = {
      dropdownSplitOpen: false,
      displayMode: "list",
      pageSizes: pageSizes,
      selectedPageSize: pageSizes[0],
      orderOptions,
      selectedOrderOption: orderOptions[0],
      currentPage: 1,
      totalItemCount: 0,
      startIndex: 0,
      endIndex: 10,
      totalPage: 1,
      items: [],
      search: "",
      selectedItems: [],
      categories: [],
      lastChecked: null,
      displayOptionsIsOpen: false,
      loadingCep: false,
      form: {
        modalOpen: false,
        cnpj: "",
        fantasyName: "",
        socialName: "",
        phoneNumber: "",
        email: "",
        address: "",
        number: "",
        complement: "",
        zipCode: "",
        neighborhood: "",
        city: "",
        state: ""
      }
    };
    this.onChange = this.onChange.bind(this);
  }

  componentWillReceiveProps() {
    this.setState({ items: this.props.shops.dataList }, () => {
      this.dataListRender();
    });
  }

  onChange(event) {
    const form = { ...this.state.form };
    form[event.target.name] = event.target.value;
    this.setState({ form });
  }

  handleBlurCep = e => {
    const form = { ...this.state.form };
    const { value } = e.target;
    if (!value) return;

    this.setState({ loadingCep: true });
    ZipCodeService.searchAddressByZipCode(e.target.value)
      .then(response => {
        if (response.status === 404) {
          swal("Atenção", "Cep não encontrado", "warning");
          this.setState({ loadingCep: false });
          return;
        }
        const data = {
          address: response.logradouro || "",
          neighborhood: response.bairro || "",
          city: response.cidade || "",
          state: response.estado || "",
          zipCode: response.cep || ""
        };
        if (response.logradouro) {
          this.setState({ form: { ...this.state.form, ...data } });
          this.setState({ loadingCep: false });
        }
      })
      .catch(err => {
        this.setState({ loadingCep: false });
        swal("Atenção", "Ocorreu um erro ao consultar o cep", "error");
      });
  };

  addNewShop() {
    this.props.addShopRequest(
      this.state.form,
      this.props.history,
      this.state.form.modalOpen
    );

    this.setState({ items: this.props.shops.dataList }, () => {
      this.dataListRender();
    });
  }

  toggleModal() {
    this.setState({
      form: {
        ...this.state.form,
        modalOpen: !this.state.form.modalOpen
      }
    });
  }

  toggleDisplayOptions() {
    this.setState({ displayOptionsIsOpen: !this.state.displayOptionsIsOpen });
  }

  toggleSplit() {
    this.setState(prevState => ({
      dropdownSplitOpen: !prevState.dropdownSplitOpen
    }));
  }

  changeOrderBy(column) {
    this.setState(
      {
        selectedOrderOption: this.state.orderOptions.find(
          x => x.column === column
        )
      },
      () => this.dataListRender()
    );
  }

  changePageSize(size) {
    this.setState(
      {
        selectedPageSize: size,
        currentPage: 1
      },
      () => this.dataListRender()
    );
  }

  changeDisplayMode(mode) {
    this.setState({
      displayMode: mode
    });
    return false;
  }

  onChangePage(page) {
    this.setState(
      {
        currentPage: page
      },
      () => this.dataListRender()
    );
  }

  handleKeyPress(e) {
    this.setState(
      {
        search: e.target.value.toLowerCase()
      },
      () => this.dataListRender()
    );
  }

  getIndex(value, arr, prop) {
    for (var i = 0; i < arr.length; i++) {
      if (arr[i][prop] === value) {
        return i;
      }
    }
    return -1;
  }

  componentDidMount() {
    const { getShopRequest } = this.props;
    getShopRequest();
    this.setState({ items: this.props.shops.dataList }, () => {
      this.dataListRender();
    });

    this.dataListRender();
  }

  dataListRender() {
    console.log(this.props.shops.dataList);
    let items =
      this.state.search.length > 0
        ? this.props.shops.dataList.filter(p => {
            return (
              p.fantasyName.toLowerCase().indexOf(this.state.search) > -1 ||
              p.city.toLowerCase().indexOf(this.state.search) > -1
            );
          })
        : this.props.shops.dataList;
    const totalItemCount = items.length;
    let totalPage = parseInt(totalItemCount / this.state.selectedPageSize, 10);
    totalPage =
      totalItemCount % this.state.selectedPageSize > 0
        ? totalPage + 1
        : totalPage;
    const startIndex =
      (this.state.currentPage - 1) * this.state.selectedPageSize;
    const endIndex =
      startIndex + this.state.selectedPageSize <= totalItemCount
        ? startIndex + this.state.selectedPageSize
        : totalItemCount;
    items = items
      .sort((a, b) => {
        if (
          a[this.state.selectedOrderOption.column] <
          b[this.state.selectedOrderOption.column]
        )
          return -1;
        else if (
          a[this.state.selectedOrderOption.column] >
          b[this.state.selectedOrderOption.column]
        )
          return 1;
        return 0;
      })
      .slice(startIndex, endIndex);
    this.setState({
      startIndex,
      endIndex,
      totalPage,
      items,
      selectedItems: [],
      totalItemCount
    });
  }

  render() {
    const shouldDisplayNotFound = !this.props.shops.dataList.length;
    const { errorMessage, successMessage } = this.props.shops.dataList;
    const { items, loading, loadingCep } = this.state;
    return (
      <Fragment>
        <div className="disable-text-selection">
          <Row>
            <Colxx xxs="12">
              <div className="mb-2">
                <h1>
                  <IntlMessages id="menu.shops" />
                </h1>

                <div className="float-sm-right">
                  <Button
                    color="primary"
                    size="lg"
                    className=""
                    onClick={this.toggleModal}
                  >
                    <IntlMessages id="shops.add-new" />
                  </Button>
                  {"  "}
                  <Modal
                    isOpen={this.state.form.modalOpen}
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
                          <InputMask
                            type="text"
                            mask="99.999.999/9999-99"
                            className="form-control"
                            placeholder="Enter a phone number"
                            name="cnpj"
                            id="cnpj"
                            value={this.state.form.cnpj}
                            onChange={this.onChange}
                          />
                          <IntlMessages id="shops.cnpj" />
                        </Label>
                        <Label className="form-group has-float-label mb-4">
                          <Input
                            name="fantasyName"
                            type="text"
                            value={this.state.form.fantasyName}
                            onChange={this.onChange}
                            maxLength="30"
                          />
                          <IntlMessages id="shops.fantasyName" />
                        </Label>
                        <Label className="form-group has-float-label mb-4">
                          <Input
                            name="socialName"
                            type="text"
                            value={this.state.form.socialName}
                            onChange={this.onChange}
                            maxLength="65"
                          />
                          <IntlMessages id="shops.socialName" />
                        </Label>
                        <Label className="form-group has-float-label mb-4">
                          <Input
                            name="email"
                            type="text"
                            value={this.state.form.email}
                            onChange={this.onChange}
                            maxLength="30"
                          />
                          <IntlMessages id="shops.email" />
                        </Label>
                        <Label className="form-group has-float-label mb-4">
                          <InputMask
                            className="form-control"
                            mask="(99) 99999-9999"
                            name="phoneNumber"
                            id="phoneNumber"
                            type="text"
                            value={this.state.form.phoneNumber}
                            onChange={this.onChange}
                          />
                          <IntlMessages id="shops.phoneNumber" />
                        </Label>
                        <Label className="form-group has-float-label mb-4">
                          <InputMask
                            className="form-control"
                            mask="99999-999"
                            name="zipCode"
                            type="text"
                            value={this.state.form.zipCode}
                            onChange={this.onChange}
                            onBlur={this.handleBlurCep}
                          />
                          <IntlMessages id="shops.zipCode" />
                        </Label>
                        {loadingCep && <div className="loading-inline mb-5" />}
                        <Label className="form-group has-float-label mb-4">
                          <Input
                            name="address"
                            type="text"
                            value={this.state.form.address}
                            onChange={this.onChange}
                            maxLength="60"
                          />
                          <IntlMessages id="shops.address" />
                        </Label>
                        <Label className="form-group has-float-label mb-4">
                          <Input
                            name="number"
                            type="text"
                            value={this.state.form.number}
                            onChange={this.onChange}
                            maxLength="10"
                          />
                          <IntlMessages id="shops.number" />
                        </Label>
                        <Label className="form-group has-float-label mb-4">
                          <Input
                            name="complement"
                            type="text"
                            value={this.state.form.complement}
                            onChange={this.onChange}
                            maxLength="20"
                          />
                          <IntlMessages id="shops.complement" />
                        </Label>
                        <Label className="form-group has-float-label mb-4">
                          <Input
                            name="neighborhood"
                            type="text"
                            value={this.state.form.neighborhood}
                            onChange={this.onChange}
                            maxLength="30"
                          />
                          <IntlMessages id="shops.neighborhood" />
                        </Label>
                        <Label className="form-group has-float-label mb-4">
                          <Input
                            name="city"
                            type="text"
                            value={this.state.form.city}
                            onChange={this.onChange}
                            maxLength="30"
                          />
                          <IntlMessages id="shops.city" />
                        </Label>
                        <Label className="form-group has-float-label mb-4">
                          <SelectSimple
                            name="state"
                            id="state"
                            value={this.state.form.state}
                            handleChange={this.onChange}
                            options={options}
                            maxLength="2"
                          />
                          <IntlMessages id="shops.state" />
                        </Label>
                        <Label className="form-group has-float-label mb-4" />
                      </Form>
                      {loading && <div className="loading-inline" />}
                      {errorMessage && (
                        <Alert
                          color="danger"
                          className="rounded mt-3 text-center"
                        >
                          {errorMessage}
                        </Alert>
                      )}
                      {successMessage && (
                        <Alert
                          color="success"
                          className="rounded mt-3 text-center"
                        >
                          {successMessage}
                        </Alert>
                      )}
                    </ModalBody>
                    <ModalFooter>
                      <Button
                        color="secondary"
                        outline
                        onClick={this.toggleModal}
                      >
                        <IntlMessages id="shops.cancel" />
                      </Button>
                      <Button color="primary" onClick={() => this.addNewShop()}>
                        <IntlMessages id="shops.add" />
                      </Button>{" "}
                    </ModalFooter>
                  </Modal>
                </div>

                <BreadcrumbItems match={this.props.match} />
              </div>
              <div className="mb-2">
                <Button
                  color="empty"
                  id="displayOptions"
                  className="pt-0 pl-0 d-inline-block d-md-none"
                  onClick={this.toggleDisplayOptions}
                >
                  <IntlMessages id="menu.display-order" />{" "}
                  <i className="simple-icon-arrow-down align-middle" />
                </Button>
                <Collapse
                  isOpen={this.state.displayOptionsIsOpen}
                  className="d-md-block"
                >
                  <span className="mr-3 mb-2 d-inline-block float-md-left">
                    <a
                      className={`mr-2 ${
                        this.state.displayMode === "list" ? "active" : ""
                      }`}
                      onClick={() => this.changeDisplayMode("list")}
                    >
                      <i className="simple-icon-menu view-icon s" />
                    </a>
                    <a
                      className={`mr-2 ${
                        this.state.displayMode === "imagelist" ? "active" : ""
                      }`}
                      onClick={() => this.changeDisplayMode("imagelist")}
                    >
                      <i className="simple-icon-grid view-icon s" />
                    </a>
                  </span>

                  <div className="d-block d-md-inline-block">
                    <div className="search-sm d-inline-block float-md-left mr-1 mb-1 align-top">
                      <input
                        type="text"
                        name="keyword"
                        id="search"
                        placeholder="Filtrar"
                        onKeyPress={e => this.handleKeyPress(e)}
                      />
                    </div>
                  </div>
                  <div className="float-md-right">
                    <span className="text-muted text-small mr-1">{`${this.state
                      .startIndex + 1}-${this.state.endIndex} of ${
                      this.state.totalItemCount
                    } `}</span>
                    <UncontrolledDropdown className="d-inline-block">
                      <DropdownToggle caret color="outline-dark" size="xs">
                        {this.state.selectedPageSize}
                      </DropdownToggle>
                      <DropdownMenu right>
                        {this.state.pageSizes.map((size, index) => {
                          return (
                            <DropdownItem
                              key={index}
                              onClick={() => this.changePageSize(size)}
                            >
                              {size}
                            </DropdownItem>
                          );
                        })}
                      </DropdownMenu>
                    </UncontrolledDropdown>
                  </div>
                </Collapse>
              </div>
              <Separator className="mb-5" />
            </Colxx>
          </Row>
          <Row>
            {shouldDisplayNotFound && (
              <Colxx xxs="12" className="mb-3 mt-5">
                <CardSubtitle>
                  <p className="h5 text-center">
                    VOCÊ NÃO TEM NENHUMA LOJA CADASTRADA
                  </p>
                </CardSubtitle>
              </Colxx>
            )}
            {items.reverse().map(product => {
              if (this.state.displayMode === "imagelist") {
                return (
                  <Colxx sm="6" lg="4" xl="3" className="mb-3" key={product.id}>
                    <Card>
                      <CardBody>
                        <Row>
                          <Colxx xxs="12" className="mb-3">
                            <NavLink
                              to={`/app/shop?p=${product.id}`}
                              className="w-40 w-sm-100"
                            >
                              <CardSubtitle>
                                {product.fantasyName}{" "}
                                {product.userStore.profileId === "SALESMAN" && (
                                  <small className="float-right text-muted">
                                    Vendedor
                                  </small>
                                )}
                                {product.userStore.profileId === "ADMIN" && (
                                  <small className="float-right text-muted">
                                    Admin
                                  </small>
                                )}
                                {product.userStore.profileId === "ASSEMBLY" && (
                                  <small className="float-right text-muted">
                                    Montador
                                  </small>
                                )}
                              </CardSubtitle>
                              <CardText className="text-muted text-small mb-0 font-weight-light">
                                <p className="mb-1 text-muted text-small w-sm-100">
                                  {product.phoneNumber}
                                </p>
                                <p className="mb-1 text-muted text-small w-sm-100">
                                  {product.email}
                                </p>
                                <p className="mb-1 text-muted text-small w-sm-100">
                                  {product.city} - {product.state}
                                </p>
                              </CardText>
                            </NavLink>
                          </Colxx>
                        </Row>
                      </CardBody>
                    </Card>
                  </Colxx>
                );
              } else {
                return (
                  <Colxx xxs="12" key={product.id} className="mb-3">
                    <Card className="d-flex flex-row">
                      <div className="pl-2 d-flex flex-grow-1 min-width-zero">
                        <div className="card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center">
                          <p className="list-item-heading mb-1 truncate">
                            {product.fantasyName}
                            {product.userStore.profileId === "SALESMAN" && (
                              <small className="ml-3 text-muted">
                                Vendedor
                              </small>
                            )}
                            {product.userStore.profileId === "ADMIN" && (
                              <small className="ml-3 text-muted">Admin</small>
                            )}
                            {product.userStore.profileId === "ASSEMBLY" && (
                              <small className="ml-3 text-muted">
                                Montador
                              </small>
                            )}
                          </p>
                          <p className="mb-1 text-muted text-small w-15 w-sm-100">
                            {product.phoneNumber}
                          </p>
                          <p className="mb-1 text-muted text-small w-15 w-sm-100">
                            {product.email}
                          </p>
                          <p className="mb-1 text-muted text-small w-15 w-sm-100">
                            {product.city} - {product.state}
                          </p>
                          <p className="mb-1 text-small">
                            <span className="badge badge-danger badge-pill">
                              INATIVO
                            </span>
                            <span className="badge badge-secondary badge-pill">
                              ATIVO
                            </span>
                          </p>
                          <p className="mb-1 text-small">
                            {product.userStore.profileId === "ADMIN" && (
                              <NavLink
                                to={`/app/shop?p=${product.id}`}
                                className="w-40 w-sm-100"
                              >
                                <span className="iconsmind-Pencil text-primary" />
                              </NavLink>
                            )}
                          </p>
                        </div>
                      </div>
                    </Card>
                  </Colxx>
                );
              }
            })}
            <Pagination
              currentPage={this.state.currentPage}
              totalPage={this.state.totalPage}
              onChangePage={i => this.onChangePage(i)}
            />
          </Row>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  shops: state.shops
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(ShopActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Shops);
