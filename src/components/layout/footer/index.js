import React, { Component } from 'react';
import { connect } from 'react-redux';

import './footer.css';

export class Footer extends Component {
  render() {
    return (
      <footer className="mdl-layout__footer">
        <p>Copyright 2018 - Grupo Acert - todos os direitos reservados</p>
      </footer>
    );
  }
}

const mapStateToProps = state => ({
  shop: state.shops.selectedShop,
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(Footer);
