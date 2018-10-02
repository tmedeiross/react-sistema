import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
import Spinner from 'react-spinkit';

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
// import { Creators as ShopActions } from '../../redux-flow/ducks/shops';
import ActionCreators from '../../redux-flow/ducks/shopCreators';
import { Card, Container } from './styles';
import Form from './form';
import FormUpdate from './formUpdate';
import * as AuthAPI from '../../api/auth';

export class ShopUser extends Component {
  constructor(...props) {
    super(...props);
    this.state = {
      shopSelected: [],
      shopUsers: [],
      email: '',
      profile: '',
      errors: {},
      errorMessage: '',
      successMessage: '',
      userSelected: '',
      openDialog: false,
      storeCnpj: '',
      form: {
        profileId: '',
        userEmail: '',
        showSalesValues: true,
      },
    };
    this.handleOpenDialog = this.handleOpenDialog.bind(this);
    this.handleCloseDialog = this.handleCloseDialog.bind(this);
    this.listAllUsers = this.listAllUsers.bind(this);
    this.shopSelectedDetails = this.shopSelectedDetails.bind(this);
    this.addUser = this.addUser.bind(this);
    this.handleUpdateUser = this.handleUpdateUser.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.deleteUserShop = this.deleteUserShop.bind(this);
    this.deleteUserShopModal = this.deleteUserShopModal.bind(this);
    this.listUser = this.listUser.bind(this);
  }

  componentDidMount() {
    this.listUser();
    this.listAllUsers();
    this.shopSelectedDetails();
  }

  handleOpenDialog() {
    this.setState({
      openDialog: true,
    });
  }

  handleCloseDialog() {
    this.setState({
      openDialog: false,
    });
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

  shopSelectedDetails() {
    AuthAPI.storeGet(this.props.paramId)
      .then((response) => {
        this.setState({ storeCnpj: response.data.cnpj });
      })
      .catch((err) => {
        console.log(err.data.message);
      });
  }

  listAllUsers() {
    const { paramId } = this.props;
    const resetState = {
      shop: [],
      errors: {},
      errorMessage: '',
    };
    AuthAPI.allUsersStore(paramId)
      .then((response) => {
        // console.log(response.data.content);
        this.setState({ ...resetState });
        this.setState({ shopUsers: response.data.content });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  deleteUserShop() {}

  deleteUserShopModal(e) {
    const userSelected = e.target.id;

    swal(`Tem certeza que deseja excluir o usuário ${e.target.name}?`, 'O que deseja fazer?', {
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
    }).then((value) => {
      switch (value) {
        case 'delete':
          this.props.deleteUserShop(userSelected, this.props.paramId);
          break;
        case 'cancel':
          break;
        default:
          break;
      }
    });
  }

  handleChange(event) {
    const form = { ...this.state.form };
    form[event.target.name] = event.target.value;
    this.setState({ form });
  }

  handleUpdateUser(e) {
    // const userId = e.target.id;
    // e.preventDefault();
    // const resetState = {
    //   errors: {},
    //   errorMessage: '',
    //   successMessage: '',
    //   isLoading: true,
    // };
    // this.setState(resetState);
    // const { profileId } = this.state;
    // AuthAPI.updateUserShop(this.state.userSelected, {
    //   profileId,
    //   showSalesValues: false,
    // })
    //   .then((response) => {
    //     console.log(response);
    //     this.handleCloseDialog();
    //     this.setState({ ...resetState, successMessage: 'Usuário alterado com sucesso.' });
    //     setTimeout(() => {
    //       this.setState({
    //         successMessage: '',
    //       });
    //       this.listAllUsers();
    //     }, 3000);
    //   })
    //   .catch((err) => {
    //     this.handleCloseDialog();
    //     console.log(err);
    //     if (err.status === 404) {
    //       this.setState({
    //         errorMessage: 'Usuário não ainda cadastrado.',
    //       });
    //     } else {
    //       this.setState({
    //         errorMessage: 'Dados incorretos ou faltantes.',
    //       });
    //     }
    //   });
  }

  addUser(e) {
    e.preventDefault();
    const { form, storeCnpj } = this.state;
    this.props.addUser(form, this.props.paramId, storeCnpj);
  }

  listUser() {
    const { storeCnpj } = this.state;
    this.props.listUser(this.props.paramId, storeCnpj);
  }

  render() {
    const { errors } = this.state;
    const { errorMessage, successMessage, shopUsers } = this.props.shop;
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
                {...this.state.form}
                handleSubmit={this.addUser}
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
                  {/* {shopUsers} */}
                  {shopUsers.map(shopUser => (
                    <tr key={shopUser.id}>
                      <td className="mdl-data-table__cell--non-numeric">{shopUser.userEmail}</td>
                      <td>
                        <If test={shopUser.profileId === 'SALESMAN'}>Vendedor</If>
                        <If test={shopUser.profileId === 'ADMIN'}>Admin</If>
                        <If test={shopUser.profileId === 'ASSEMBLY'}>Montador</If>
                      </td>
                      <td className="mdl-typography--text-right">
                        <Button
                          onClick={this.handleOpenDialog}
                          value={shopUser.id}
                          id={shopUser.id}
                          name={shopUser.userEmail}
                          mini
                          variant="fab"
                          className="fab btn-edit mdl-button mdl-js-button mdl-button--raised mdl-button--primary ml1 mdl-js-ripple-effect"
                          color="primary"
                          aria-label="Edit"
                        >
                          <EditIcon />
                        </Button>
                        <Button
                          mini
                          onClick={this.deleteUserShopModal}
                          variant="fab"
                          value={shopUser.id}
                          name={shopUser.userEmail}
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
            <If test={this.state.isLoading}>
              <div className="loading">
                <Spinner name="ball-pulse-sync" fadeIn="none" />
              </div>
            </If>
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

          <Dialog className="modalUser" open={this.state.openDialog}>
            <DialogTitle>Atualizar usuário </DialogTitle>
            <DialogContent>
              <FormUpdate
                {...this.state}
                handleSubmit={this.handleUpdateUser}
                handleChange={this.handleChange}
                errors={errors}
                value={this.state.form.profileId}
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
          </Dialog>
        </Card>
      </Container>
    );
  }
}
// ShopUser.prototype = {

// }
const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  shop: state.shop,
  shopUsers: state.shopUsers,
});

const mapDispatchToProps = dispatch => ({
  addUser: (form, paramId, storeCnpj) => dispatch(ActionCreators.getUserRequest(form, paramId, storeCnpj)),
  listUser: (paramId, storeCnpj) => dispatch(ActionCreators.getListRequest(paramId, storeCnpj)),
  deleteUserShop: (profileId, paramId) => dispatch(ActionCreators.deleteUserRequest(profileId, paramId)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ShopUser);
