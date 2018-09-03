import React, { Component } from 'react';
import { connect } from 'react-redux';

import { setAuth } from '../../../redux-flow/reducers/auth/action-creators';
import { addShop } from '../../../redux-flow/reducers/shops/action-creators';

class RecreateAuth extends Component {
  componentDidMount() {
    if (localStorage.getItem('token')) {
      this.props.setAuth(true);
    }

    try {
      // const shop = JSON.parse(localStorage.getItem('shop'));
      const shop = localStorage.getItem('shop');

      if (shop) {
        this.props.addShop(shop);
      }
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    return <span />;
  }
}

export default connect(
  null,
  { setAuth, addShop },
)(RecreateAuth);
