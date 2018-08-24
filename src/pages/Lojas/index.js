import React, { Component, Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import styled from 'styled-components';

// import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Icon from '@material-ui/core/Icon';
import DeleteIcon from '@material-ui/icons/Delete';
import NavigationIcon from '@material-ui/icons/Navigation';

import * as AddUser from '../../store/actions/account';

import { login, user } from '../../services/auth';
import api from '../../services/api';

import NavbarInterna from '../../layout/NavbarInterna/NavbarInterna';

import '../../styles/global';
import './styles.css';

const Container = styled.header`
  padding-top: 100px;
`;
const Card = styled.header`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding-top: 50px;
`;
class Lojas extends Component {
  constructor(account, addUserDetails) {
    super(account, addUserDetails);
    this.handleChange = this.handleChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.listStore = this.listStore.bind(this);
    this.state = {
      formData: {},
      stores: [],
    };
  }

  handleFormSubmit = async (e) => {
    e.preventDefault();
    // console.log(this.state.formData);
    // try {
    //   const response = await api.post('/store', this.state.formData);
    //   this.props.history.push('/lojas');
    // } catch (err) {
    //   console.log(err.response);
    //   this.setState({
    //     error: err.response.data.message,
    //   });
    // }
  };

  listStore = async (e) => {
    try {
      const response = await api.get('/store');
      const stores = response.data.content;
      console.log(stores);

      this.setState({ stores });
    } catch (err) {
      console.log(err);
    }
  };

  componentDidMount() {
    this.listStore();
  }

  handleChange(e) {
    this.setState({
      formData: { ...this.state.formData, [e.target.name]: e.target.value },
    });
  }

  render() {
    return (
      <Fragment>
        <NavbarInterna />
        <Container>
          <Card>
            <div className="mdl-card mdl-shadow--2dp cadastro">
              <div className="mdl-card__title bg-primary">
                <h2 className="mdl-card__title-text mdl-typography--text-center w100">
                  Lista de loja
                </h2>
              </div>
              <div className="mdl-card__supporting-text w100">
                <table className="mdl-data-table mdl-js-data-table mdl-shadow--2dp">
                  <thead>
                    <tr>
                      <th className="mdl-data-table__cell--non-numeric">Nome da Empresa</th>
                      <th>Telefone</th>
                      <th>UF</th>
                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.stores.map(store => (
                      <tr key={store.id}>
                        <td className="mdl-data-table__cell--non-numeric">{store.fantasyName}</td>
                        <td>{store.phoneNumber}</td>
                        <td>{store.state}</td>
                        <td>
                          <Button
                            mini
                            variant="fab"
                            className="fab btn-edit mdl-button mdl-js-button mdl-button--raised mdl-button--primary ml1 mdl-js-ripple-effect"
                            color="primary"
                            aria-label="Delete"
                          >
                            <Icon>edit_icon</Icon>
                          </Button>
                          <Button
                            mini
                            variant="fab"
                            className="fab btn-delete mdl-button mdl-js-button mdl-button--raised mdl-button--accent mdl-js-ripple-effect"
                            color="secondary"
                            aria-label="Edit"
                          >
                            <DeleteIcon />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <div className="mdl-card__actions mdl-typography--text-right mt1">
                  <Link
                    to="/register"
                    type="button"
                    className="mdl-button mdl-js-button mdl-button--raised mdl-button--primary ml1 mdl-js-ripple-effect"
                    color="primary"
                  >
                    Adicione nova loja
                  </Link>
                </div>
              </div>
            </div>
          </Card>
        </Container>
      </Fragment>
    );
  }
}
export default withRouter(Lojas);
