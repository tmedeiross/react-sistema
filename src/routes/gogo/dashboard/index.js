import React, { Component, Fragment } from "react";
import { Row } from "reactstrap";
import Board from "react-trello";

import IntlMessages from "Util/IntlMessages";
import { Colxx, Separator } from "Components/CustomBootstrap";
import { BreadcrumbItems } from "Components/BreadcrumbContainer";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Creators as ShopActions } from "Redux/shops/reducer";

const data = {
  lanes: [
    {
      id: "lane1",
      title: "Planned Tasks",
      cards: [
        {
          id: "Card1",
          name: "John Smith",
          dueOn: "due in a day",
          subTitle: "SMS received at 12:13pm today",
          body: "Thanks. Please schedule me for an estimate on Monday.",
          escalationText: "Escalated to OPS-ESCALATIONS!",
          cardColor: "#BD3B36",
          cardStyle: {
            borderRadius: 6,
            boxShadow: "0 0 6px 1px #BD3B36",
            marginBottom: 15
          }
        },
        {
          id: "Card2",
          name: "Card Weathers",
          dueOn: "due now",
          subTitle: "Email received at 1:14pm",
          body: "Is the estimate free, and can someone call me soon?",
          escalationText: "Escalated to Admin",
          cardColor: "#E08521",
          cardStyle: {
            borderRadius: 6,
            boxShadow: "0 0 6px 1px #E08521",
            marginBottom: 15
          }
        }
      ]
    }
  ]
};

export class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Fragment>
        <div className="disable-text-selection">
          <Row>
            <Colxx xxs="12">
              <div className="mb-2">
                <h1>
                  <IntlMessages id="dashboard.menu-dashboard" />
                </h1>

                <BreadcrumbItems match={this.props.match} />
              </div>

              <Separator className="mb-5" />
              <Board data={data} />
            </Colxx>
          </Row>
        </div>
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
)(Dashboard);
