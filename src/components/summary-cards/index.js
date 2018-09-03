import React, { Component } from 'react';

import * as DashboardAPI from '../../api/dashboard';
import Card from './card';
import { fillData } from './helper';

class SummaryCards extends Component {
  constructor() {
    super();
    this.state = {
      cards: [],
    };
  }

  componentDidMount() {
    // const shop = JSON.parse(localStorage.getItem('shop'));
    const shop = localStorage.getItem('shop');
    const shopId = shop !== null ? shop.id : 0;

    DashboardAPI.getDataDashboard(shopId).then(response => this.setCardsData(response.data));
  }

  setCardsData(data) {
    const cards = fillData(data);
    this.setState({ cards });
  }

  render() {
    const { cards } = this.state;
    return (
      <div className="row">
        {cards.map((item, index) => (
          <Card data={item} key={index} />
        ))}
      </div>
    );
  }
}

export default SummaryCards;
