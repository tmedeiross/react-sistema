import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

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
  showMsgError
}) => (
  <div className="form-group">
    <select
      name={name}
      id={id}
      value={value}
      maxLength={maxLength}
      className={classNames("form-control", { "is-invalid": error })}
      onChange={handleChange}
      onBlur={handleBlur}
    >
      {options.map((item, index) => (
        <option key={index} value={item.value}>
          {item.text}
        </option>
      ))}
    </select>
  </div>
);

SelectSimple.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.string]),
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string
    })
  ),
  handleChange: PropTypes.func,
  handleBlur: PropTypes.func
};

export default SelectSimple;
