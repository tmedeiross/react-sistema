import React, { Component } from 'react';
import { connect } from 'react-redux';
import swal from 'sweetalert';

import { ROUTE_PREFIX as PREFIX } from '../../config';
import { fetchShops, addShop } from '../../redux-flow/reducers/shops/action-creators';

export class Shop extends Component {
  constructor() {
    super();
    this.state = {
      selectedShopId: undefined,
    };
  }

  componentDidMount() {
    const { shops } = this.props;

    try {
      // const shop = JSON.parse(localStorage.getItem('shop'));
      const shop = localStorage.getItem('shop');

      if (shop) {
        this.setState({
          selectedShopId: shop.id,
        });
      }
    } catch (err) {}

    if (!shops || !shops.length) {
      return this.props.fetchShops();
    }
  }

  handleChange = (e) => {
    const shopId = Number(e.target.value);
    const shop = this.props.shops.find(item => item.id === shopId);

    this.props.addShop(shop);
    localStorage.setItem('shop', JSON.stringify(shop));
    this.setState({
      selectedShopId: shop.id,
    });

    swal('Atenção', 'Loja selecionada com sucesso!', 'success').then(() => this.props.history.push(`${PREFIX}`));
  };

  render() {
    return (
      <div className="row">
        <div className="col col-md-8 mx-auto">
          <div className="form-group">
            <label htmlFor="shop">Selecione a Loja</label>
            <select
              value={this.state.selectedShopId}
              className="form-control"
              onChange={this.handleChange}
            >
              <option />
              {this.props.shops.map(item => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  shops: state.shops.shops,
});

export default connect(
  mapStateToProps,
  { fetchShops, addShop },
)(Shop);
