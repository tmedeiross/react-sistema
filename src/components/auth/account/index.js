import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Spinner from 'react-spinkit';
import ActionCreators from '../../../redux-flow/ducks/authCreators';
import './login.css';
import NavBar from '../../layout/nav-bar';

import { Card } from './login';
import If from '../../common/if';
import ValidateForm from './validator';
import LoginForm from './form';
import Footer from '../../layout/footer';
import { ROUTE_PREFIX as PREFIX } from '../../../config';
import Button from '@material-ui/core/Button';

export class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        username: '',
        password: '',
      },
      errors: {},
    };
    this.login = this.login.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {}

  handleChange(event) {
    const form = { ...this.state.form };
    form[event.target.name] = event.target.value;
    this.setState({ form });
  }

  login(e) {
    e.preventDefault();
    // if (!this.isValid()) return;
    const { username, password } = this.state.form;
    this.props.login(username, password);
  }

  redirectToHome() {
    return this.props.history.push(`${PREFIX}`);
  }

  redirectToStores() {
    return this.props.history.push(`${PREFIX}/shops`);
  }

  isValid() {
    const { errors, isValid } = ValidateForm(this.state);

    if (!isValid) {
      this.setState({ errors });
    }

    return isValid;
  }

  render() {
    const { errors, form } = this.state;
    const { errorMessage, isLoading } = this.props.authData;
    return (
      <Fragment>
        <NavBar />
        <Card>
          <div className="mdl-card mdl-shadow--2dp">
            <div className="mdl-card__title bg-primary">
              <h2 className="mdl-card__title-text mdl-typography--text-center w100">Minha conta</h2>
            </div>
            <div className="mdl-card__supporting-text w100">
              <div className="avatar">
                <img src="/img/avatar.png" alt="" />
                <p className="text-center">
                  <a href="/" color="primary">
                    Trocar imagem
                  </a>
                </p>
              </div>
            </div>
            <div className="mdl-card__supporting-text w100">
              <LoginForm
                handleSubmit={this.login}
                handleChange={this.handleChange}
                username={form.username}
                password={form.password}
                isLoading={isLoading}
                errors={errors}
              />
              <If test={isLoading}>
                <div className="loading">
                  <Spinner name="ball-pulse-sync" fadeIn="none" />
                </div>
              </If>
              <If test={errorMessage}>
                <div className="alert alert-danger msg-error-login text-center" role="alert">
                  {errorMessage}
                </div>
              </If>
              <Link to="/app/auth/change-pass" className="mdl-js-ripple-effect" color="primary">
                Trocar a senha
              </Link>
            </div>
            <div className="mdl-card__title bg-primary">
              <h2 className="mdl-card__title-text mdl-typography--text-center w100">
                Fornecedores
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
                  <tr>
                    <td className="mdl-data-table__cell--non-numeric">fantasyName</td>
                    <td className="text-left">supplier.defaultMessage</td>
                    <td className="text-left">supplier.purchaseCode</td>
                    <td className="mdl-typography--text-right">
                      <Button
                        mini
                        variant="fab"
                        className="fab btn-delete mdl-button mdl-js-button mdl-button--raised  ml1 mdl-js-ripple-effect btn-secondary"
                        aria-label="Delete"
                      >
                        <i className="fas fa-trash" />
                      </Button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </Card>
        <Footer />
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  authData: state.authData,
});

const mapDispatchToProps = dispatch => ({
  login: (username, password) => dispatch(ActionCreators.getRequest(username, password)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login);
