import React from 'react';
import PropTypes from 'prop-types';
import SpeechToText from '../../voice-components';
import InputAutocomplete from '../input-autocomplete';

const InputSearch = ({
  value, placeholder, onVoiceResult, onNewCustomer, onItemClick,
}) => (
  <div className="input-group">
    <div className="input-group-prepend">
      <button onClick={onNewCustomer} className="btn btn-primary">
        <i className="fa fa-plus" />
        NOVO
      </button>
    </div>
    <InputAutocomplete onItemClick={onItemClick} searchText={value} placeholder={placeholder} />
    <div className="input-group-append">
      <SpeechToText onVoiceResult={onVoiceResult} />
    </div>
  </div>
);

InputSearch.propTypes = {
  placeholder: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  onVoiceResult: PropTypes.func,
};

export default InputSearch;
