import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './index.css';

import If from '../../if';

const Input = ({
  type,
  name,
  id,
  value,
  label,
  handleChange,
  error,
  placeholder,
  maxLength,
  showMsgError,
  handleBlur,
}) => (
  <div className="form-group">
    <If test={label}>
      <label htmlFor={id}>{label}</label>
    </If>
    <input
      type={type}
      name={name}
      id={id}
      value={value}
      placeholder={placeholder}
      maxLength={maxLength}
      className={classNames('form-control', { 'is-invalid': error })}
      onChange={handleChange}
      onBlur={handleBlur}
    />
    <If test={showMsgError}>
      <div className="invalid-feedback">{error}</div>
    </If>
  </div>
);

Input.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  value: PropTypes.string,
  handleChange: PropTypes.func,
  error: PropTypes.string,
  placeholder: PropTypes.string,
  maxLength: PropTypes.string,
  showMsgError: PropTypes.bool,
  handleBlur: PropTypes.func,
};

Input.defaultProps = {
  type: 'text',
  showMsgError: false,
  handleBlur: () => {},
};

export default Input;
