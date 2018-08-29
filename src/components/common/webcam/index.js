import React, { Component } from 'react';
import Webcam from 'react-webcam';
import PropTypes from 'prop-types';

class WebcamCapture extends Component {
  constructor(props) {
    super(props);
    this.state = {
      webcam: null,
    };
  }

  onCapture = () => {
    this.props.onImageCaptured(this.state.webcam.getScreenshot());
  };

  onDevice = (webcam) => {
    this.setState({ webcam });
  };

  hasGetUserMedia() {
    navigator.getUserMedia = navigator.getUserMedia
      || navigator.webkitGetUserMedia
      || navigator.mozGetUserMedia
      || navigator.msGetUserMedia;

    if (navigator.getUserMedia) {
      return true;
    }
  }

  render() {
    return (
      <div>
        {this.hasGetUserMedia() && (
          <div className="card bg-dark">
            <Webcam
              className="card-img-top img-fluid rounded mx-auto"
              audio={false}
              height="250"
              ref={this.onDevice}
              screenshotFormat="image/jpeg"
              width="250"
            />
            <div className="card-body">
              <button className="btn btn-success btn-block" onClick={this.onCapture}>
                <i className="fa fa-camera" />
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }
}

WebcamCapture.propTypes = {
  onImageCaptured: PropTypes.func.isRequired,
};

export default WebcamCapture;
