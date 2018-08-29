import React, { Component } from 'react';
import { connect } from 'react-redux';
import { debounce } from 'lodash';

import SummaryCards from '../summary-cards';
import InputSearch from '../common/form/input-search';
import { loadingOn, loadingOff } from '../../redux-flow/reducers/loader/action-creators';
import { ROUTE_PREFIX as PREFIX } from '../../config';

export class Home extends Component {
  constructor() {
    super();
    this.state = {
      searchValue: '',
    };
    this.onVoiceResult = this.onVoiceResult.bind(this);
    this.onNewCustomer = this.onNewCustomer.bind(this);
    this.redirectTo = this.redirectTo.bind(this);
  }

  debounceEvent(...args) {
    this.debouncedEvent = debounce(...args);
    return (e) => {
      e.persist();
      return this.debouncedEvent(e);
    };
  }

  onVoiceResult(result) {
    this.setState({ searchValue: result });
  }

  redirectTo(path) {
    this.props.history.push(path);
  }

  onNewCustomer() {
    this.props.history.push(`${PREFIX}/client/new/`);
  }

  render() {
    const { searchValue } = this.state;
    return (
      <div>
        <div className="row">
          <div className="col col-md-8 mx-auto">
            <br />
            <br />
            <br />
            <InputSearch
              {...this.state}
              value={searchValue}
              placeholder="Digite para pesquisar"
              onVoiceResult={this.onVoiceResult}
              onNewCustomer={this.onNewCustomer}
              onItemClick={this.redirectTo}
            />
          </div>
        </div>
        <div className="row grid">
          <div className="col-md-8 mx-auto">
            <SummaryCards />
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = {
  loadingOn,
  loadingOff,
};

export default connect(
  null,
  mapDispatchToProps,
)(Home);
