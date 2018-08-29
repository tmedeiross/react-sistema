import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { logout } from '../../../utils/services/auth';
import { ROUTE_PREFIX as PREFIX } from '../../../config';
import { setAuth } from '../../../redux-flow/reducers/auth/action-creators';
import { addShop } from '../../../redux-flow/reducers/shops/action-creators';

class Logout extends PureComponent {
  componentDidMount() {
    logout();
    this.props.setAuth(false);
    this.props.addShop({});
  }

  render() {
    return <Redirect to={`${PREFIX}`} />;
  }
}

export default connect(
  null,
  { setAuth, addShop },
)(Logout);
