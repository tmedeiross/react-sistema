import React, { Component, Fragment } from "react";
import { Row } from "reactstrap";
import { Board } from "react-trello";

import IntlMessages from "Util/IntlMessages";
import { Colxx, Separator } from "Components/CustomBootstrap";
import { BreadcrumbItems } from "Components/BreadcrumbContainer";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Creators as ShopActions } from "Redux/shops/reducer";

const data = require("./data.json");

const handleDragStart = (cardId, laneId) => {
  console.log("drag started");
  console.log(`cardId: ${cardId}`);
  console.log(`laneId: ${laneId}`);
};

const handleDragEnd = (cardId, sourceLaneId, targetLaneId) => {
  console.log("drag ended");
  console.log(`cardId: ${cardId}`);
  console.log(`sourceLaneId: ${sourceLaneId}`);
  console.log(`targetLaneId: ${targetLaneId}`);
};

export class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      boardData: { lanes: [] }
    };
  }
  state = { boardData: { lanes: [] } };

  setEventBus = eventBus => {
    this.setState({ eventBus });
  };

  async componentWillMount() {
    const response = await this.getBoard();
    this.setState({ boardData: response });
  }

  getBoard() {
    return new Promise(resolve => {
      resolve(data);
    });
  }

  completeCard = () => {
    this.state.eventBus.publish({
      type: "ADD_CARD",
      laneId: "COMPLETED",
      card: {
        id: "Milk",
        title: "Buy Milk",
        label: "15 mins",
        description: "Use Headspace app"
      }
    });
    this.state.eventBus.publish({
      type: "REMOVE_CARD",
      laneId: "PLANNED",
      cardId: "Milk"
    });
  };

  addCard = () => {
    this.state.eventBus.publish({
      type: "ADD_CARD",
      laneId: "BLOCKED",
      card: {
        id: "Ec2Error",
        title: "EC2 Instance Down",
        label: "30 mins",
        description: "Main EC2 instance down"
      }
    });
  };

  shouldReceiveNewData = nextData => {
    console.log("New card has been added");
    console.log(nextData);
  };

  handleCardAdd = (card, laneId) => {
    console.log(`New card added to lane ${laneId}`);
    console.dir(card);
  };

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
              <Board
                style={{
                  backgroundColor: "transparent",
                  height: "calc(100vh - 265px)"
                }}
                editable
                onCardAdd={this.handleCardAdd}
                data={this.state.boardData}
                draggable
                onDataChange={this.shouldReceiveNewData}
                eventBusHandle={this.setEventBus}
                handleDragStart={handleDragStart}
                handleDragEnd={handleDragEnd}
              />
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
