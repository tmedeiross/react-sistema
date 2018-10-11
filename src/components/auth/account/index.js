import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Spinner from 'react-spinkit';
import $ from 'jquery';
import Button from '@material-ui/core/Button';
import jwdDecode from 'jwt-decode';
import './login.css';
import NavBar from '../../layout/nav-bar';

import { Card } from './login';
import If from '../../common/if';
import ValidateForm from './validator';
import LoginForm from './form';
import Footer from '../../layout/footer';
import * as AuthAPI from '../../../api/auth';
import { CDN_URL, ROUTE_PREFIX as PREFIX } from '../../../config';
import http, { setTokenHeader } from '../../../utils/services/http';

import ActionCreators from '../../../redux-flow/ducks/authCreators';
import { assignMasks } from '../../client-details/client-data/form-address/masks';

import { setUser } from '../../../redux-flow/sagas/auth';

setTokenHeader(localStorage.getItem('token'));

export class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      setUser: '',
      authData: [],
      username: '',
      user: {
        id: '',
        name: '',
        userDetail: {
          phoneNumber: '',
          gender: 'MALE',
        },
      },
      errors: {},
      avatar: '',
      files: '',
    };
    this.updateLogin = this.updateLogin.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeName = this.handleChangeName.bind(this);
    this.assignMasks = this.assignMasks.bind(this);
    this.isImg = this.isImg.bind(this);
  }

  componentDidMount() {
    this.getUser();
    this.assignMasks();
  }

  getUser() {
    const decoded = jwdDecode(localStorage.getItem('token'));
    const emailToken = decoded.sub;
    AuthAPI.getUser(emailToken)
      .then((response) => {
        const user = response.data;
        if (user.userDetail === null) {
          this.setState({
            user: {
              ...this.state.user,
              id: user.id,
              name: user.name,
            },
          });
        } else {
          this.setState({
            ...this.state.user,
            user,
          });
        }
        this.isImg();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  assignMasks = () => {
    assignMasks();
    $('#phoneNumber').focus();
  };

  handleChangeName(event) {
    this.setState({
      user: {
        ...this.state.user,
        name: event.target.value,
      },
    });
  }

  handleChange(event) {
    const target = event.target;
    const value = target.type === 'radio' ? target.value : target.value;

    const userDetail = { ...this.state.user.userDetail };
    userDetail[target.name] = value;

    this.setState({
      user: {
        ...this.state.user,
        userDetail,
      },
    });
  }

  updateLogin(e) {
    e.preventDefault();
    this.props.updateLogin(this.state.user);
    setTimeout(() => {
      this.getUser();
    }, 500);
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

  onChange = async (e) => {
    const { files } = this.state;
    const file = e.target.files[0];

    const output = document.getElementById('output');
    output.src = URL.createObjectURL(e.target.files[0]);

    this.setState({ files: e.target.files[0] });

    // if (!files.length) this.props.history.push('/app');

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };
    const data = new FormData();
    data.append('file', file);

    await AuthAPI.addImage(data, config)
      .then((response) => {
        console.log(response);
        this.isImg();
      })
      .catch((err) => {
        console.log(err.data);
      });
  };

  isImg() {
    const { id } = this.state.user;
    const idUser = id + 1;
    console.log(id);
    const img = new Image();
    const avatar = `${CDN_URL + idUser}.jpg`;
    img.src = avatar;

    img.onload = () => {
      console.log(`A imagem ${avatar} existe`);
      this.setState({ avatar });
    };
    img.onerror = () => {
      console.log(`A imagem ${avatar} NAO existe`);
      this.setState({ avatar: '/img/avatar.png' });
    };
  }

  render() {
    const { errors, user, avatar } = this.state;
    const { userDetail } = this.state.user;
    const { errorMessage, isLoading, successMessage } = this.props.authData;
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
                <img id="output" src={avatar} alt="" />

                <div onSubmit={this.onFormSubmit}>
                  <p className="text-center">
                    <input type="file" name="file" id="files" placeholder="Trocar imagem" hidden />
                    <label htmlFor="files" onChange={e => this.onChange(e)}>
                      Select file
                    </label>
                  </p>
                </div>
              </div>
            </div>
            <div className="mdl-card__supporting-text w100">
              <LoginForm
                {...this.state.user}
                handleSubmit={this.updateLogin}
                handleChange={this.handleChange}
                handleChangeName={this.handleChangeName}
                name={user.name}
                phoneNumber={userDetail.phoneNumber}
                gender={userDetail.gender}
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
  setUser: state.setUser,
  authData: state.authData,
});

const mapDispatchToProps = dispatch => ({
  updateLogin: user => dispatch(ActionCreators.updateUserRequest(user)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login);
