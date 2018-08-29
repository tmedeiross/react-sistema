import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import './style.css';

const handleBlurFunc = () => {};

function isNegative(value) {
  return value && value < 0;
}

const InputSimple = ({
  type, step, min, max, name, id, value, handleChange, handleBlur,
}) => (
  <input
    type={type}
    step={step}
    name={name}
    min={min}
    max={max}
    id={id}
    value={value}
    className={classNames(
      'form-control form-control-sm',
      isNegative(value) ? 'input-negative' : '',
    )}
    onChange={handleChange}
    onBlur={handleBlur}
  />
);

InputSimple.propTypes = {
  type: PropTypes.string,
  step: PropTypes.string,
  min: PropTypes.string,
  max: PropTypes.string,
  name: PropTypes.string,
  id: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  handleChange: PropTypes.func,
  handleBlur: PropTypes.func,
};

InputSimple.defaultProps = {
  type: 'text',
  negative: false,
  handleBlur: handleBlurFunc,
};

export default InputSimple;
