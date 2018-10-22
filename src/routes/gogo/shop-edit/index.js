import React, { Component, Fragment } from "react";
import IntlMessages from "Util/IntlMessages";
import {
  Row,
  Card,
  CardTitle,
  Button,
  Col,
  Form,
  Label,
  Input,
  Alert
} from "reactstrap";

import InputMask from "react-input-mask";
import SelectSimple from "Components/SelectSimple";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Creators as ShopActions } from "Redux/shops/reducer";

const options = [
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

export class ShopDetails extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: "1",
      shopActive: "",
      form: {
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
        state: "",
        stateNome: "",
        profileId: "",
        userEmail: ""
      }
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
    const form = { ...this.state.form };
    form[event.target.name] = event.target.value;
    this.setState({ form });
  }

  componentDidMount() {
    this.props.getDetailsShopRequest(this.props.history);
    setTimeout(() => {
      this.setState({ form: this.props.shops.dataDetails });
    }, 1000);
  }

  onUpdateData() {
    this.props.updateShopRequest(this.state.form, this.props.history);
  }

  render() {
    const { errorMessage, successMessage, loading } = this.props.shops;
    return (
      <Fragment>
        <Row>
          <Col sm="12">
            <Card body>
              <CardTitle>Alterar dados da loja</CardTitle>

              <Form>
                <Row>
                  <Col sm="4">
                    <Label className="form-group has-float-label mb-4">
                      <InputMask
                        mask="99.999.999/9999-99"
                        className="form-control"
                        placeholder="Enter a phone number"
                        name="cnpj"
                        value={this.state.form.cnpj}
                        onChange={this.onChange}
                      />
                      <IntlMessages id="shops.cnpj" />
                    </Label>
                  </Col>
                  <Col sm="4">
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
                  </Col>
                  <Col sm="4">
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
                  </Col>
                </Row>
                <Row>
                  <Col sm="4">
                    <Label className="form-group has-float-label mb-4">
                      <Input
                        name="email"
                        type="text"
                        value={this.state.form.email}
                        onChange={this.onChange}
                        maxLength="17"
                      />
                      <IntlMessages id="shops.email" />
                    </Label>
                  </Col>
                  <Col sm="4">
                    <Label className="form-group has-float-label mb-4">
                      <InputMask
                        className="form-control"
                        mask="(99) 9999-9999"
                        name="phoneNumber"
                        type="text"
                        value={this.state.form.phoneNumber}
                        onChange={this.onChange}
                      />
                      <IntlMessages id="shops.phoneNumber" />
                    </Label>
                  </Col>
                  <Col sm="4">
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
                  </Col>
                </Row>

                <Row>
                  <Col sm="6">
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
                  </Col>
                  <Col sm="3">
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
                  </Col>
                  <Col sm="3">
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
                  </Col>
                </Row>

                <Row>
                  <Col sm="4">
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
                  </Col>
                  <Col sm="4">
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
                  </Col>
                  <Col sm="4">
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
                onClick={() => this.onUpdateData()}
              >
                <IntlMessages id="shops.button-update" />
              </Button>
            </Card>
          </Col>
        </Row>
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
)(ShopDetails);
