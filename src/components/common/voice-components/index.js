import React, { Component } from 'react';
import PropTypes from 'prop-types';
import VoiceRecognition from './voice-recognition';

class SpeechToText extends Component {
  constructor(props) {
    super(props);
    this.state = {
      start: false,
      stop: true,
      supportVoiceRecognition: true,
    };
    this.onStart = this.onStart.bind(this);
    this.onEnd = this.onEnd.bind(this);
    this.onResult = this.onResult.bind(this);
  }

  onStart() {
    this.setState({ start: true, stop: false });
  }

  onEnd() {
    this.setState({ stop: true, start: false });
  }

  onResult(event) {
    const result = event.finalTranscript;
    this.props.onVoiceResult(result);
    this.onEnd();
  }

  render() {
    return (
      <div>
        {this.state.supportVoiceRecognition && this.state.stop && !this.state.start ? (
          <button
            className="btn btn-outline-primary"
            onClick={() => this.setState({ stop: false, start: true })}
          >
            <i className="fa fa-microphone" />
          </button>
        ) : null}
        {this.state.supportVoiceRecognition && this.state.start && !this.state.stop ? (
          <button
            className="btn btn-outline-danger"
            onClick={() => this.setState({ stop: true, start: false })}
          >
            <i className="fa fa-microphone-slash" />
          </button>
        ) : null}

        {this.state.start && (
          <VoiceRecognition
            onStart={this.onStart}
            onEnd={this.onEnd}
            onResult={this.onResult}
            continuous
            lang="pt-BR"
            stop={this.state.stop}
          />
        )}
      </div>
    );
  }

  componentDidMount() {
    this.setState({
      supportVoiceRecognition:
        window.SpeechRecognition
        || window.webkitSpeechRecognition
        || window.mozSpeechRecognition
        || window.msSpeechRecognition
        || window.oSpeechRecognition,
    });
  }
}

SpeechToText.propTypes = {
  onVoiceResult: PropTypes.func,
};

export default SpeechToText;
