import React, { Component, Fragment } from "react";
import { Row } from "reactstrap";
import Board from "react-trello";

import IntlMessages from "Util/IntlMessages";
import { Colxx, Separator } from "Components/CustomBootstrap";
import { BreadcrumbItems } from "Components/BreadcrumbContainer";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Creators as ShopActions } from "Redux/shops/reducer";
const CustomCard = props => {
  return (
    <div>
      <header
        style={{
          borderBottom: "1px solid #eee",
          paddingBottom: 6,
          marginBottom: 10,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          color: props.cardColor
        }}
      >
        <div style={{ fontSize: 14, fontWeight: "bold" }}>{props.name}</div>
        <div style={{ fontSize: 11 }}>{props.dueOn}</div>
      </header>
      <div style={{ fontSize: 12, color: "#BD3B36" }}>
        <div style={{ color: "#4C4C4C", fontWeight: "bold" }}>
          {props.subTitle}
        </div>
        <div style={{ padding: "5px 0px" }}>
          <i>{props.body}</i>
        </div>
        <div
          style={{
            marginTop: 10,
            textAlign: "center",
            color: props.cardColor,
            fontSize: 15,
            fontWeight: "bold"
          }}
        >
          {props.escalationText}
        </div>
      </div>
    </div>
  );
};
const data = {
  lanes: [
    {
      id: "lane1",
      title: "Planned Tasks",
      label: "2/2",
      draggable: true,
      cards: [
        {
          id: "Card1",
          title: "Write Blog",
          description: "Can AI make memes",
          label: "30 mins"
        },
        {
          id: "Card2",
          title: "Pay Rent",
          description: "Transfer via NEFT",
          label: "5 mins",
          metadata: { sha: "be312a1" }
        }
      ]
    },
    {
      id: "lane2",
      title: "Completed",
      label: "0/0",
      cards: []
    },
    {
      id: "lane2",
      title: "Completed",
      label: "0/0",
      cards: []
    }
  ],
  draggable,
  onDataChange={onDataChange},
  handleDragStart={handleDragStart},
  handleDragEnd={handleDragEnd},
  handleLaneDragStart={handleLaneDragStart},
  handleLaneDragEnd={handleLaneDragEnd},
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
