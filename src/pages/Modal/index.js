import React from 'react';
import '../../styles/global';
import PropTypes from 'prop-types';

class Modal extends React.Component {
  render() {
    if (!this.props.show) {
      return null;
    }

    return (
      <div className="mdl-dialog">
        <div className="mdl-dialog__actions">
          <button
            onClick={this.props.onClose}
            className="mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab mdl-button--colored"
          >
            <i className="material-icons">close</i>
          </button>
        </div>
        <div className="mdl-dialog__content">
          {this.props.children}

          <div className="mdl-dialog__actions">
            <div className="footer" />
          </div>
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  show: PropTypes.bool,
  children: PropTypes.node,
};

export default Modal;
