import React, { Component } from "react";
import { Route, withRouter, Switch, Redirect } from "react-router-dom";

import PrivateRoute from "./private-route";
import { PREFIX } from "Constants/defaultValues";

import TopNav from "Containers/TopNav";
import Sidebar from "Containers/Sidebar";

import gogo from "./gogo";
import Shops from "./gogo/shops";
import Dashboard from "./gogo/dashboard";
import ShopDetails from "./gogo/shop";
import Account from "./gogo/account";

import { connect } from "react-redux";

class MainApp extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { match, containerClassnames } = this.props;
    return (
      <div id="app-container" className={containerClassnames}>
        <TopNav history={this.props.history} />
        <Sidebar />
        <main>
          <div className="container-fluid">
            <Switch>
              <Redirect exact from="/" to={`${PREFIX}`} />
              <PrivateRoute path={`${match.url}/shops`} component={Shops} />
              <PrivateRoute
                path={`${match.url}/dashboard`}
                component={Dashboard}
              />
              <PrivateRoute
                path={`${match.url}/shop`}
                component={ShopDetails}
              />

              <PrivateRoute path={`${match.url}/account`} component={Account} />
              <Redirect to="/error" />
            </Switch>
          </div>
        </main>
      </div>
    );
  }
}
const mapStateToProps = ({ menu }) => {
  const { containerClassnames } = menu;
  return { containerClassnames };
};

export default withRouter(
  connect(
    mapStateToProps,
    {}
  )(MainApp)
);
