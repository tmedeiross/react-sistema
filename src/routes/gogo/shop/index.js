import React, { Component, Fragment } from "react";
import { Row, TabContent, TabPane, Nav, NavItem, NavLink } from "reactstrap";
import classnames from "classnames";

import { Colxx, Separator } from "Components/CustomBootstrap";
import BreadcrumbContainer from "Components/BreadcrumbContainer";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Creators as ShopActions } from "Redux/shops/reducer";

import ShopEdit from "../shop-edit";
import ShopSupplier from "../shop-supplier";
import ShopUser from "../shop-user";

export class ShopDetails extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: "1"
    };
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  render() {
    return (
      <Fragment>
        <Row>
          <Colxx xxs="12">
            <BreadcrumbContainer match={this.props.match} />
            <Separator className="mb-5" />
            <div>
              <Nav tabs>
                <NavItem>
                  <NavLink
                    className={classnames({
                      active: this.state.activeTab === "1"
                    })}
                    onClick={() => {
                      this.toggle("1");
                    }}
                  >
                    Informações da loja
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={classnames({
                      active: this.state.activeTab === "2"
                    })}
                    onClick={() => {
                      this.toggle("2");
                    }}
                  >
                    Fornecedores
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={classnames({
                      active: this.state.activeTab === "3"
                    })}
                    onClick={() => {
                      this.toggle("3");
                    }}
                  >
                    Usuários
                  </NavLink>
                </NavItem>
              </Nav>
              <TabContent activeTab={this.state.activeTab}>
                <TabPane tabId="1">
                  <ShopEdit history={this.props.history} />
                </TabPane>
                <TabPane tabId="2">
                  <ShopSupplier history={this.props.history} />
                </TabPane>
                <TabPane tabId="3">
                  <ShopUser history={this.props.history} />
                </TabPane>
              </TabContent>
            </div>
          </Colxx>
        </Row>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  shops: state.shops
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(ShopActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShopDetails);
