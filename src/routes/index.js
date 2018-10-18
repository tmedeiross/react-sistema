import React, { Component } from "react";
import { Route, withRouter, Switch, Redirect } from "react-router-dom";

import PrivateRoute from "./private-route";
import { PREFIX } from "Constants/defaultValues";

import TopNav from "Containers/TopNav";
import Sidebar from "Containers/Sidebar";

import gogo from "./gogo";
import secondMenu from "./second-menu";
import Shops from "./gogo/shops";
import ShopDetails from "./gogo/shop";

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
              <Route path={`${match.url}/dashboard`} component={gogo} />
              <Route path={`${match.url}/shops`} component={Shops} />
              <Route path={`${match.url}/shop`} component={ShopDetails} />
              <Route path={`${match.url}/second-menu`} component={secondMenu} />
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
