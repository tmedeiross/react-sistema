import React, { Component } from 'react';
import { connect } from 'react-redux';

import { onLoading, offLoading } from '../../../config/assets/js/main';

class Loading extends Component {
  startLoading() {
    return onLoading();
  }

  endLoading() {
    return offLoading();
  }

  render() {
    if (this.props.loader.isLoading === true) {
      this.startLoading();
    }

    if (this.props.loader.isLoading === false) {
      this.endLoading();
    }
    return <span />;
  }
}

const mapStateToProps = state => ({
  loader: state.loader,
});

export default connect(mapStateToProps)(Loading);
