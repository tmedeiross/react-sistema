import React, { PureComponent } from "react";
import { logout } from "Util/services/auth";
import { Redirect } from "react-router-dom";
import { path } from "Constants/defaultValues";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Creators as AuthActions } from "Redux/auth/reducer";

class Logout extends PureComponent {
  componentDidMount() {
    logout();
    // this.props.setAuth(false);
    // this.props.addShop({});
  }

  render() {
    return <Redirect to={`${path}auth/login`} />;
  }
}

export default connect(
  null
  // { setAuth, addShop }
)(Logout);
