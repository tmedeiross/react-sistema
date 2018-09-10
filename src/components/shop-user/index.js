import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import './styles.css';

import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import ValidateForm from './validator';
import If from '../common/if';
import { ROUTE_PREFIX as PREFIX } from '../../config';
import { loadingOn, loadingOff } from '../../redux-flow/reducers/loader/action-creators';
import { Card, Container } from './styles';
import Form from './form';
import * as AuthAPI from '../../api/auth';

export class ShopUser extends Component {
  constructor(...props) {
    super(...props);
    this.state = {
      stores: [],
      email: '',
      profile: '',
      errors: {},
      textBtn: 'ADICIONAR',
      profileId: '',
      userEmail: '',
      storeCnpj: '',
      errorMessage: '',
    };
    this.listAllUsers = this.listAllUsers.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.listAllUsers();
  }

  returnParams() {
    return this.props.paramId;
  }

  isValid() {
    const { errors, isValid } = ValidateForm(this.state);

    if (!isValid) {
      this.setState({ errors });
    }

    return isValid;
  }

  listAllUsers() {
    const resetState = { errors: {}, errorMessage: '', isLoading: true };

    AuthAPI.storeGet(this.returnParams())
      .then((response) => {
        this.setState({ ...resetState });

        const stores = response.data.content;
        this.setState({ stores });

        this.setState({ storeCnpj: response.data.cnpj });
      })
      .catch((err) => {
        console.log(err.data.message);
      });
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    const resetState = { errors: {}, errorMessage: '', isLoading: true };
    this.setState(resetState);

    const { profileId, userEmail, storeCnpj } = this.state;

    AuthAPI.addUserShop({
      profileId,
      userEmail,
      storeCnpj,
    })
      .then(() => {
        this.setState({ ...resetState });
      })
      .catch((err) => {
        console.log(err);
        if (err.status === 404) {
          this.setState({
            errorMessage: 'Usuário já está vinculado a esta loja.',
          });
        } else {
          this.setState({
            errorMessage: 'Dados incorretos ou faltantes.',
          });
        }
      });

    e.target.reset();
  }

  render() {
    const { errors, errorMessage } = this.state;

    return (
      <Container>
        <Card>
          <div className="mdl-card mdl-shadow--2dp cadastro">
            <div className="mdl-card__supporting-text w100">
              <Form
                {...this.state}
                handleSubmit={this.handleSubmit}
                handleChange={this.handleChange}
                errors={errors}
              />
            </div>
            <div className="mdl-card__supporting-text w100">
              <If test={errorMessage}>
                <div className="alert alert-danger msg-error-login text-center" role="alert">
                  {errorMessage}
                </div>
              </If>
            </div>

            <div className="mdl-card__title bg-primary">
              <h2 className="mdl-card__title-text mdl-typography--text-center w100">Usuários</h2>
            </div>
            <div className="mdl-card__supporting-text w100">
              <table className="mdl-data-table mdl-js-data-table mdl-shadow--2dp">
                <thead>
                  <tr>
                    <th className="mdl-data-table__cell--non-numeric">Email</th>
                    <th>Profile</th>
                    <th>Status</th>
                    <th>Options</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="mdl-data-table__cell--non-numeric">email@email.com.br</td>
                    <td>Admin</td>
                    <td>ativo</td>
                    <td className="mdl-typography--text-right">
                      <Button
                        // href={`${PREFIX}/store/${store.id}`}
                        mini
                        variant="fab"
                        className="fab btn-edit mdl-button mdl-js-button mdl-button--raised mdl-button--primary ml1 mdl-js-ripple-effect"
                        color="primary"
                        aria-label="Delete"
                      >
                        <EditIcon />
                      </Button>
                    </td>
                  </tr>
                  <tr>
                    <td className="mdl-data-table__cell--non-numeric">email@email.com.br</td>
                    <td>Admin</td>
                    <td>inativo</td>
                    <td className="mdl-typography--text-right">
                      <Button
                        // href={`${PREFIX}/store/${store.id}`}
                        mini
                        variant="fab"
                        className="fab btn-edit mdl-button mdl-js-button mdl-button--raised mdl-button--primary ml1 mdl-js-ripple-effect"
                        color="primary"
                        aria-label="Delete"
                      >
                        <EditIcon />
                      </Button>
                    </td>
                  </tr>

                  {/* {stores.map(store => (
                    <tr key={store.id}>
                      <td className="mdl-data-table__cell--non-numeric">{store.cnpj}</td>
                      <td>{store.fantasyName}</td>
                      <td>{store.phoneNumber}</td>
                      <td className="mdl-typography--text-right">
                        <Button
                          href={`${PREFIX}/store/${store.id}`}
                          mini
                          variant="fab"
                          className="fab btn-edit mdl-button mdl-js-button mdl-button--raised mdl-button--primary ml1 mdl-js-ripple-effect"
                          color="primary"
                          aria-label="Delete"
                        >
                          <EditIcon />
                        </Button>
                      </td>
                    </tr>
                  ))} */}
                </tbody>
              </table>
            </div>
          </div>
        </Card>
      </Container>
    );
  }
}

const mapDispatchToProps = {
  loadingOn,
  loadingOff,
};

export default connect(
  null,
  mapDispatchToProps,
)(ShopUser);
