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

class LoginLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        username: "",
        password: ""
      }
    };
    this.onChange = this.onChange.bind(this);
  }

  onUserLogin() {
    if (this.state.form.username !== "" && this.state.form.password !== "") {
      this.props.userRequest(this.state.form, this.props.history);
    } else {
      this.props.userRequest(
        (this.props.authUser.errorMessage = "Dados faltantes.")
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
                      <IntlMessages id="user.login-title" />
                    </CardTitle>
                    <form onSubmit={() => this.onUserLogin()}>
                      <Label className="form-group has-float-label mb-4">
                        <Input
                          name="username"
                          type="email"
                          value={this.state.form.username}
                          onChange={this.onChange}
                        />
                        <IntlMessages id="user.email" />
                      </Label>
                      <Label className="form-group has-float-label mb-4">
                        <Input
                          name="password"
                          type="password"
                          value={this.state.form.password}
                          onChange={this.onChange}
                        />
                        <IntlMessages id="user.password" />
                      </Label>
                      <div className="d-flex justify-content-between align-items-center">
                        <Button
                          href={`/auth/signup`}
                          color="secondary"
                          className="btn-shadow mr-1"
                          size="lg"
                        >
                          <IntlMessages id="user.register-button" />
                        </Button>
                        <Button
                          color="primary"
                          className="btn-shadow"
                          size="lg"
                          onClick={() => this.onUserLogin()}
                        >
                          <IntlMessages id="user.login-button" />
                        </Button>
                      </div>
                      <NavLink className="mt-5 d-block" to={`/auth/recover`}>
                        <IntlMessages id="user.forgot-password-question" />
                      </NavLink>
                      {loading && <div className="loading-inline" />}
                    </form>
                    {errorMessage && (
                      <Alert
                        color="danger"
                        className="rounded mt-3 text-center"
                      >
                        {errorMessage}
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
)(LoginLayout);
