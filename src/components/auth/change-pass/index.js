import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Spinner from 'react-spinkit';
import ActionCreators from '../../../redux-flow/ducks/authCreators';
import './pass.css';
import NavBar from '../../layout/nav-bar';

import { Card } from './pass';
import If from '../../common/if';
import ValidateForm from './validator';
import LoginForm from './form';
import Footer from '../../layout/footer';
import { ROUTE_PREFIX as PREFIX } from '../../../config';

export class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        oldPassword: '',
        newPassword: '',
      },
      errors: {},
    };
    this.changePass = this.changePass.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {}

  handleChange(event) {
    const form = { ...this.state.form };
    form[event.target.name] = event.target.value;
    this.setState({ form });
  }

  changePass(e) {
    e.preventDefault();
    // if (!this.isValid()) return;
    const { oldPassword, newPassword } = this.state.form;
    this.props.changePass(oldPassword, newPassword);
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
    const { successMessage, errorMessage, isLoading } = this.props.authData;
    return (
      <Fragment>
        <NavBar />
        <Card>
          <div className="mdl-card mdl-shadow--2dp">
            <div className="mdl-card__title bg-primary">
              <h2 className="mdl-card__title-text mdl-typography--text-center w100">
                TROCAR SENHA
              </h2>
            </div>
            <div className="mdl-card__supporting-text w100">
              <LoginForm
                handleSubmit={this.changePass}
                handleChange={this.handleChange}
                oldPassword={form.oldPassword}
                newPassword={form.newPassword}
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
              <If test={successMessage}>
                <div className="alert alert-success msg-success-login text-center" role="alert">
                  {successMessage}
                </div>
              </If>
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
  changePass: (oldPassword, newPassword) => dispatch(ActionCreators.getPassRequest(oldPassword, newPassword)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login);
