import React, { PureComponent } from "react";
import { Redirect } from "react-router-dom";
import { path } from "Constants/defaultValues";

import { connect } from "react-redux";

class Logout extends PureComponent {
  render() {
    return <Redirect to={`${path}auth/login`} />;
  }
}

export default connect(null)(Logout);
