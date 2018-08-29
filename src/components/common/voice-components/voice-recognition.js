import { Component } from 'react';
import PropTypes from 'prop-types';

class VoiceRecognition extends Component {
  constructor(props) {
    super(props);

    const SpeechRecognition = window.SpeechRecognition
      || window.webkitSpeechRecognition
      || window.mozSpeechRecognition
      || window.msSpeechRecognition
      || window.oSpeechRecognition;

    if (SpeechRecognition != null) {
      this.recognition = this.createRecognition(SpeechRecognition);
      this.bindResult = this.bindResult.bind(this);
    } else {
      window.alert('The current browser does not support the SpeechRecognition API.');
    }
  }

  createRecognition(SpeechRecognition) {
    const defaults = {
      continuous: true,
      interimResults: false,
      lang: 'en-US',
    };

    const options = Object.assign({}, defaults, this.props);

    const recognition = new SpeechRecognition();

    recognition.continuous = options.continuous;
    recognition.interimResults = options.interimResults;
    recognition.lang = options.lang;
    recognition.parent = this;

    return recognition;
  }

  bindResult(event) {
    let interimTranscript = '';
    let finalTranscript = '';

    for (let i = event.resultIndex; i < event.results.length; ++i) {
      if (event.results[i].isFinal) {
        finalTranscript += event.results[i][0].transcript;
      } else {
        interimTranscript += event.results[i][0].transcript;
      }
    }
    this.props.onResult({ interimTranscript, finalTranscript });
  }

  start() {
    this.recognition.start();
  }

  stop() {
    this.recognition.stop();
  }

  abort() {
    this.recognition.abort();
  }

  componentWillReceiveProps({ stop }) {
    if (stop) {
      this.stop();
    }
  }

  componentDidMount() {
    const events = [
      { name: 'start', action: this.props.onStart },
      { name: 'end', action: this.props.onEnd },
      { name: 'error', action: this.props.onError },
    ];

    events.forEach((event) => {
      this.recognition.addEventListener(event.name, event.action);
    });

    this.recognition.addEventListener('result', this.bindResult);
    this.start();
  }

  componentWillUnmount() {
    this.abort();
  }

  render() {
    return null;
  }
}

VoiceRecognition.propTypes = {
  onStart: PropTypes.func,
  onEnd: PropTypes.func,
  onError: PropTypes.func,
  onResult: PropTypes.func.isRequired,
};

export default VoiceRecognition;
