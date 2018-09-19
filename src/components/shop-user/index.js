import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import './styles.css';

import swal from 'sweetalert';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import ValidateForm from './validator';
import If from '../common/if';
// import { ROUTE_PREFIX as PREFIX } from '../../config';
import { loadingOn, loadingOff } from '../../redux-flow/reducers/loader/action-creators';
import { Creators as ShopActions } from '../../redux-flow/ducks/shops';
import { Card, Container } from './styles';
import Form from './form';
import FormUpdate from './formUpdate';
import * as AuthAPI from '../../api/auth';

export class ShopUser extends Component {
  constructor(...props) {
    super(...props);
    this.state = {
      shopUsers: [],
      shopSelected: [],
      email: '',
      profile: '',
      errors: {},
      textBtn: 'ADICIONAR',
      profileId: '',
      userEmail: '',
      storeCnpj: '',
      errorMessage: '',
      successMessage: '',
      userSelected: '',
      openDialog: false,
    };
    this.handleOpenDialog = this.handleOpenDialog.bind(this);
    this.handleCloseDialog = this.handleCloseDialog.bind(this);
    this.listAllUsers = this.listAllUsers.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUpdateUser = this.handleUpdateUser.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.deleteUserShop = this.deleteUserShop.bind(this);
  }

  handleOpenDialog() {
    this.setState({
      openDialog: true,
    });
    console.log();
  }

  handleCloseDialog() {
    this.setState({
      openDialog: false,
    });
  }

  componentDidMount() {
    this.props.loadingOn();
    const { getShopRequest } = this.props;
    this.listAllUsers();
    getShopRequest();
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


  apiDelUser() {
    const resetState = {
      shop: [],
      errors: {},
      errorMessage: '',
      successMessage: '',
      isLoading: true,
    };

    AuthAPI.deleteUserShop(this.state.userSelected)
      .then((response) => {
        this.setState({ ...resetState });
        this.setState({
          successMessage: 'Usuário deletado com sucesso.',
        });
        console.log(response);
      })
      .catch((err) => {
        console.log(err.data.message);
        this.setState({ ...resetState });
        this.setState({
          errorMessage: 'Ocorreu um erro, por favor tente novamente.',
        });
      });
  }

  deleteUserShop(e) {
    // e.preventDefault();
    this.setState({ userSelected: e.target.id });
    swal(
      `Tem certeza que deseja excluir o usuário ${this.state.shopUsers.userEmail}?`,
      'O que deseja fazer?',
      {
        buttons: {
          home: {
            text: 'Deletar',
            value: 'delete',
          },
          proximo: {
            text: 'Cancelar',
            value: 'cancel',
          },
        },
      },
    ).then((value) => {
      switch (value) {
        case 'delete':
          this.apiDelUser();
          break;
        case 'cancel':
          break;
        default:
          break;
      }
    });
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
    console.log(this.state.profileId);
  }

  handleUpdateUser(e) {
    e.preventDefault();
    const resetState = {
      errors: {},
      errorMessage: '',
      successMessage: '',
      isLoading: true,
    };

    this.setState(resetState);
    const { profileId } = this.state;
    console.log(profileId);
    AuthAPI.updateUserShop(this.state.shopUsers.id, {
      profileId,
      showSalesValues: false,
    })
      .then(() => {
        this.handleCloseDialog();
        this.setState({ ...resetState });
        this.setState({
          successMessage: 'Usuário alterado com sucesso.',
        });

        setTimeout(() => {
          this.setState({
            successMessage: '',
          });
          this.listAllUsers();
        }, 3000);
      })
      .catch((err) => {
        this.handleCloseDialog();
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
  }

  handleSubmit(e) {
    e.preventDefault();
    const resetState = {
      errors: {},
      errorMessage: '',
      successMessage: '',
      isLoading: true,
    };

    this.setState(resetState);
    const { profileId, userEmail, storeCnpj } = this.state;

    AuthAPI.addUserShop({
      profileId,
      userEmail,
      storeCnpj,
      showSalesValues: false,
    })
      .then(() => {
        this.setState({ ...resetState });
        this.setState({
          successMessage: 'Usuário inserido com sucesso.',
        });

        setTimeout(() => {
          this.setState({
            successMessage: '',
          });
          this.listAllUsers();
        }, 3000);
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

  listAllUsers() {
    const resetState = {
      shop: [],
      errors: {},
      errorMessage: '',
      isLoading: true,
    };

    AuthAPI.allUsersStore(this.props.paramId)
      .then((response) => {
        this.setState({ ...resetState });

        // this.setState({ storeCnpj: response.data.cnpj });
        this.setState({ shopUsers: response.data.content });
        console.log(response.data.content);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  render() {
    const {
      errors, errorMessage, successMessage, shopUsers,
    } = this.state;

    return (
      <Container>
        <Card>
          <div className="mdl-card mdl-shadow--2dp cadastro">
            <div className="mdl-card__title bg-primary">
              <h2 className="mdl-card__title-text mdl-typography--text-center w100">
                Adicionar novo usuários
              </h2>
            </div>
            <div className="mdl-card__supporting-text w100">
              <Form
                {...this.state}
                handleSubmit={this.handleSubmit}
                handleChange={this.handleChange}
                errors={errors}
              />
            </div>

            <div className="mdl-card__title bg-primary">
              <h2 className="mdl-card__title-text mdl-typography--text-center w100">
                Usuários da loja
              </h2>
            </div>
            <div className="mdl-card__supporting-text w100">
              <table className="mdl-data-table mdl-js-data-table mdl-shadow--2dp">
                <thead>
                  <tr>
                    <th className="mdl-data-table__cell--non-numeric">Email</th>
                    <th>Profile</th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {shopUsers.map(shopUser => (
                    <tr>
                  {/* {shopUsers.map(shopUser => (
                    <tr>
                      <p>{shopUser.profileId}</p>
                      <p>{shopUser.userEmail}</p>
                    </tr>
                  ))} */}

                  <td className="mdl-data-table__cell--non-numeric">{shopUser.userEmail}</td>
                    <td>
                      <If test={shopUser.profileId === 'SALESMAN'}>Vendedor</If>
                      <If test={shopUser.profileId === 'ADMIN'}>Admin</If>
                      <If test={shopUser.profileId === 'ASSEMBLY'}>Montador</If>
                    </td>
                    <td className="mdl-typography--text-right">
                      <Button
                        // href={`${PREFIX}/store/${store.id}`}
                        onClick={this.handleOpenDialog}
                        value={shopUser.id}
                        id={shopUser.id}
                        mini
                        variant="fab"
                        className="fab btn-edit mdl-button mdl-js-button mdl-button--raised mdl-button--primary ml1 mdl-js-ripple-effect"
                        color="primary"
                        aria-label="Edit"
                      >
                        <EditIcon />
                      </Button>
                      <Button
                        // href={`${PREFIX}/store/${store.id}`}
                        mini
                        onClick={this.deleteUserShop}
                        variant="fab"
                        value={shopUser.id}
                        id={shopUser.id}
                        className="fab btn-delete mdl-button mdl-js-button mdl-button--raised  ml1 mdl-js-ripple-effect btn-secondary"
                        aria-label="Delete"
                      >
                        <i className="fas fa-trash" value={shopUser.id} id={shopUser.id} />
                      </Button>
                    </td>
                  </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mdl-card__supporting-text w100">
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
          {/* <Dialog className="modalUser" open={this.state.openDialog}>
          <DialogTitle>Atualizar usuário {shopUsers.userEmail}</DialogTitle>
          <DialogContent>
          <FormUpdate
              {...this.state}
              handleSubmit={this.handleUpdateUser}
              handleChange={this.handleChange}
              errors={errors}
            />
          </DialogContent>
          <DialogActions>
          <input
            onClick={this.handleUpdateUser}
            type="button"
              className="mdl-button mdl-js-button mdl-button--raised mdl-button--accent mdl-js-ripple-effect bg-primary"
              value="Alterar"
            />
            <input
              onClick={this.handleCloseDialog}
              type="button"
              className="mdl-button mdl-js-button mdl-button--raised mdl-button--accent mdl-js-ripple-effect bg-primary btn-delete"
              value="Cancelar"
            />
          </DialogActions>
        </Dialog> */}
        </Card>
      </Container>
    );
  }
}
// ShopUser.prototype = {

// }

const mapStateToProps = state => ({
  shops: state.shopData,
});

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(ShopActions, dispatch),
  loadingOn,
  loadingOff,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ShopUser);
