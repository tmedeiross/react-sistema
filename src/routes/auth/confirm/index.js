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
import { defaultStartPathLogin } from "Constants/defaultValues";
import qs from "query-string";
import * as AuthAPI from "Constants/api";

class Confirm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // trocar pelo parametro token da URL enviada no email
      // token: 'bbe8c808-850e-4500-ab1e-f4d553c52dad',
      token: "",
      loading: false,
      errorMessage: "",
      segundosRestantes: 5,
      isConfirmed: false
    };
    this.confirm = this.confirm.bind(this);
    this.passouSegundo = this.passouSegundo.bind(this);
  }

  componentDidMount() {
    document.body.classList.add("background");
    this.interval = setInterval(this.passouSegundo, 1000);
    this.existToken();
    setTimeout(() => {
      this.confirm();
    }, 500);
  }

  componentWillUnmount() {
    document.body.classList.remove("background");
    clearInterval(this.interval);
  }

  existToken() {
    const { location } = this.props;
    const params = qs.parse(location.search);

    if (params.token) {
      const resetState = { token: params.token, isConfirmed: true };
      this.setState({ ...resetState });
    } else {
      this.redirectToLogin();
    }
  }

  passouSegundo() {
    const { segundosRestantes } = this.state;
    const segundos = segundosRestantes - 1;

    if (segundosRestantes === 1) {
      this.setState.segundosRestantes = 0;
      this.redirectToLogin();
      clearInterval(this.interval);
    }

    this.setState({ segundosRestantes: segundos });
  }

  confirm() {
    const resetState = { errors: {}, errorMessage: "", loading: false };
    this.setState(resetState);
    const { token } = this.state;
    AuthAPI.confirmUser(token)
      .then(response => {
        console.log(response);
        this.setState({ ...resetState });
      })
      .catch(err => {
        console.log(err);
        this.setState({
          loading: false,
          errorMessage:
            "Acesso nao confirmado, por favor se registre novamente."
        });
      });
  }

  redirectToLogin() {
    return this.props.history.push(`${defaultStartPathLogin}/auth/login`);
  }

  render() {
    const {
      loading,
      errorMessage,
      segundosRestantes,
      isConfirmed
    } = this.state;
    return (
      <Fragment>
        <div className="fixed-background" />
        <main>
          <div className="container">
            <Row className="h-100">
              <Colxx xxs="12" md="10" lg="10" className="mx-auto my-auto">
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
                      <p className="h3 text-center mb-5">
                        Sua conta foi confirmada
                        <br />
                        com sucesso.
                      </p>
                      <p className="h5 text-center">
                        Você será redirecionado
                        <br />
                        para a página de Login
                        <br />
                        em &nbsp;
                        <span className="h3">{segundosRestantes}</span>.
                      </p>
                    </CardTitle>
                    {loading && <div className="loading-inline" />}
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
)(Confirm);
