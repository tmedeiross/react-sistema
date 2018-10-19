import React, { Component, Fragment } from "react";
import IntlMessages from "Util/IntlMessages";
import {
  Row,
  Card,
  CardTitle,
  Form,
  Label,
  Input,
  Button,
  Alert
} from "reactstrap";
import { NavLink, Link } from "react-router-dom";
import { Colxx } from "Components/CustomBootstrap";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Creators as AuthActions } from "Redux/auth/reducer";

class Recover extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        username: ""
      }
    };
    this.onChange = this.onChange.bind(this);
  }

  onPassRecover() {
    if (this.state.form.username !== "") {
      this.props.passRecoverRequest(this.state.form, this.props.history);
    } else {
      this.props.passRecoverRequest(
        (this.props.authUser.errorMessage = "Dados incompletos.")
      );
    }
  }

  onChange(event) {
    const form = { ...this.state.form };
    form[event.target.name] = event.target.value;
    this.setState({ form });
  }

  componentDidMount() {
    document.body.classList.add("background");
  }

  componentWillUnmount() {
    document.body.classList.remove("background");
  }

  render() {
    const { loading, errorMessage, successMessage } = this.props.authUser;
    return (
      <Fragment>
        <div className="fixed-background" />
        <main>
          <div className="container">
            <Row className="h-100">
              <Colxx xxs="12" md="12" lg="10" className="mx-auto my-auto">
                <Card className="auth-card">
                  <div className="position-relative image-side ">
                    <p className="h2">ORDER TRACKING</p>
                    <p className="mb-0">
                      Por favor, insira suas credenciais para fazer o login.
                      <br />
                      Se você não tem uma conta, por favor, se{" "}
                      <NavLink to={`/auth/signup`} className="color-theme-2">
                        registre
                      </NavLink>
                      .
                    </p>
                  </div>
                  <div className="form-side">
                    <NavLink to={`/`} className="white">
                      <span className="logo-single" />
                    </NavLink>
                    <CardTitle className="mb-4">
                      <IntlMessages id="user.forgot-password" />
                    </CardTitle>
                    <Form>
                      <Label className="form-group has-float-label mb-4">
                        <Input
                          name="username"
                          type="email"
                          value={this.state.form.username}
                          onChange={this.onChange}
                        />
                        <IntlMessages id="user.email" />
                      </Label>
                      <div className="d-flex justify-content-between align-items-center">
                        <Button
                          href={`/auth/login`}
                          color="secondary"
                          className="btn-shadow mr-1"
                          size="lg"
                        >
                          <IntlMessages id="user.button-cancel" />
                        </Button>
                        <Button
                          color="primary"
                          className="btn-shadow"
                          size="lg"
                          onClick={() => this.onPassRecover()}
                        >
                          <IntlMessages id="user.button-recover-pass" />
                        </Button>
                      </div>
                      {loading && <div className="loading-inline" />}
                    </Form>
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
                  </div>
                </Card>
              </Colxx>
            </Row>
          </div>
        </main>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  authUser: state.authUser
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(AuthActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Recover);
