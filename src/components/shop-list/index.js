import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import './styles.css';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import Footer from '../layout/footer';
import NavBar from '../layout/nav-bar';
import { ROUTE_PREFIX as PREFIX } from '../../config';
import { loadingOn, loadingOff } from '../../redux-flow/reducers/loader/action-creators';
import { Creators as ShopActions } from '../../redux-flow/ducks/shops';
import { Card, Container } from './styles';
import If from '../common/if';

export class Shops extends Component {
  componentDidMount() {
    const { getShopRequest } = this.props;
    getShopRequest();

    console.log(this.props.shops);
  }

  render() {
    const { shops } = this.props;
    const shouldDisplayNotFound = !shops.data.length;
    return (
      <Fragment>
        <NavBar />
        <div className="container-fluid content">
          <Container>
            <Card>
              <div className="mdl-card mdl-shadow--2dp cadastro">
                <div className="mdl-card__title bg-primary">
                  <h2 className="mdl-card__title-text mdl-typography--text-center w100">
                    Suas lojas
                  </h2>
                </div>
                <div className="mdl-card__supporting-text w100">
                  <table className="mdl-data-table mdl-js-data-table mdl-shadow--2dp">
                    <thead>
                      <tr>
                        <th className="mdl-data-table__cell--non-numeric">CNPJ</th>
                        <th>Nome Fantasia</th>
                        <th>Telefone</th>
                        <th>UF</th>
                        <th>Perfil</th>
                        <th />
                      </tr>
                    </thead>
                    <tbody>
                      {shouldDisplayNotFound && (
                        <tr>
                          <td colSpan="6">
                            <h5 className="text-center">NENHUMA LOJA CADASTRADA</h5>
                          </td>
                        </tr>
                      )}
                      {shops.data.map(shopItem => (
                        <tr key={shopItem.id}>
                          <td className="mdl-data-table__cell--non-numeric">{shopItem.cnpj}</td>
                          <td>{shopItem.fantasyName}</td>
                          <td>{shopItem.phoneNumber}</td>
                          <td>{shopItem.state}</td>
                          <td>
                            <If test={shopItem.userStore.profileId === 'SALESMAN'}>Vendedor</If>
                            <If test={shopItem.userStore.profileId === 'ADMIN'}>Admin</If>
                            <If test={shopItem.userStore.profileId === 'ASSEMBLY'}>Montador</If>
                          </td>
                          <td className="mdl-typography--text-right">
                            <If test={shopItem.userStore.profileId === 'ADMIN'}>
                              <Button
                                href={`${PREFIX}/shop/${shopItem.id}`}
                                mini
                                variant="fab"
                                className="fab btn-edit mdl-button mdl-js-button mdl-button--raised mdl-button--primary ml1 mdl-js-ripple-effect"
                                color="primary"
                                aria-label="Delete"
                              >
                                <EditIcon />
                              </Button>
                            </If>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  <div className="mdl-card__actions mdl-typography--text-right mt1">
                    <Link
                      to="/app/shop"
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
        </div>
        <Footer />
      </Fragment>
    );
  }
}

Shops.propTypes = {
  getShopRequest: PropTypes.func.isRequired,
  shops: PropTypes.shape({
    data: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        cnpj: PropTypes.string.isRequired,
        phoneNumber: PropTypes.string.isRequired,
        state: PropTypes.string.isRequired,
        fantasyName: PropTypes.string.isRequired,
      }),
    ),
  }).isRequired,
};

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
)(Shops);
