import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import './styles.css';

import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { ROUTE_PREFIX as PREFIX } from '../../config';
import { loadingOn, loadingOff } from '../../redux-flow/reducers/loader/action-creators';
import { Card, Container } from './styles';
import * as AuthAPI from '../../api/auth';

export class Home extends Component {
  constructor() {
    super();
    this.state = {
      stores: [],
    };
  }

  componentDidMount() {
    const resetState = { errors: {}, errorMessage: '', isLoading: true };

    AuthAPI.storeAll()
      .then((response) => {
        this.setState({ ...resetState });

        const stores = response.data.content;
        this.setState({ stores });
      })
      .catch((err) => {
        console.log(err.data.message);
      });
  }

  render() {
    return (
      <Container>
        <Card>
          <div className="mdl-card mdl-shadow--2dp cadastro">
            <div className="mdl-card__title bg-primary">
              <h2 className="mdl-card__title-text mdl-typography--text-center w100">Suas lojas</h2>
            </div>
            <div className="mdl-card__supporting-text w100">
              <table className="mdl-data-table mdl-js-data-table mdl-shadow--2dp">
                <thead>
                  <tr>
                    <th className="mdl-data-table__cell--non-numeric">Nome Fantasia</th>
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
                          <EditIcon />
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
                  to="/app/store"
                  className="mdl-button mdl-js-button mdl-button--raised mdl-button--accent mdl-js-ripple-effect bg-primary"
                  color="primary"
                >
                  Adicione nova loja
                </Link>
              </div>
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
)(Home);
