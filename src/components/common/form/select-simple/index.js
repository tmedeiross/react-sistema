import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import If from '../../if';

const SelectSimple = ({
  name,
  id,
  value,
  options,
  label,
  error,
  handleChange,
  handleBlur,
  maxLength,
  showMsgError,
}) => (
  <div className="form-group">
    <If test={label}>
      <label htmlFor={id}>{label}</label>
    </If>
    <select
      name={name}
      id={id}
      value={value}
      maxLength={maxLength}
      className={classNames('form-control', { 'is-invalid': error })}
      onChange={handleChange}
      onBlur={handleBlur}
    >
      {options.map((item, index) => (
        <option key={index} value={item.value}>
          {item.text}
        </option>
      ))}
    </select>
    <If test={showMsgError}>
      <div className="invalid-feedback">{error}</div>
    </If>
  </div>
);

SelectSimple.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.string]),
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
    }),
  ),
  handleChange: PropTypes.func,
  handleBlur: PropTypes.func,
};

export default SelectSimple;
