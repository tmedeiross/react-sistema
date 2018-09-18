import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import './styles.css';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import Footer from '../layout/footer';
import { ROUTE_PREFIX as PREFIX } from '../../config';
import { loadingOn, loadingOff } from '../../redux-flow/reducers/loader/action-creators';
import { Creators as ShopActions } from '../../redux-flow/ducks/shops';
import { Card, Container } from './styles';

export class Shops extends Component {
  constructor(...props) {
    super(...props);
    this.state = {
      value: 0,
    };
  }

  componentDidMount() {
    const { getShopRequest } = this.props;
    // loadingOn();
    getShopRequest();
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { shops } = this.props;
    return (
      <Fragment>
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
                        <th />
                      </tr>
                    </thead>
                    <tbody>
                      {shops.data.map(shopItem => (
                        <tr key={shopItem.id}>
                          <td className="mdl-data-table__cell--non-numeric">{shopItem.cnpj}</td>
                          <td>{shopItem.fantasyName}</td>
                          <td>{shopItem.phoneNumber}</td>
                          <td>{shopItem.state}</td>
                          <td className="mdl-typography--text-right">
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
