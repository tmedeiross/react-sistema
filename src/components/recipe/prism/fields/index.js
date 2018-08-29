import React from 'react';
import PropTypes from 'prop-types';

import prismAxis from '../../../../utils/prism-axis';
import Input from '../../../common/form/input-simple';
import Select from '../../../common/form/select-simple';

const PrismFields = ({
  eyeLabel,
  prism1Name,
  prism1Value,
  prism1AxisName,
  prism1AxisValue,
  prism2Name,
  prism2Value,
  prism2AxisName,
  prism2AxisValue,
  handleChange,
}) => (
  <React.Fragment>
    <tr>
      <td className="recipe__td__button">
        <button type="button" className="btn btn-primary btn-sm" disabled>
          {eyeLabel}
        </button>
      </td>
      <td className="recipe__td__field">
        <Input
          type="number"
          step="1"
          min="0"
          max="20"
          name={prism1Name}
          id={prism1Name}
          value={prism1Value}
          handleChange={handleChange}
        />
      </td>
      <td className="recipe__td__prism__axis">
        <Select
          name={prism1AxisName}
          value={prism1AxisValue}
          options={prismAxis}
          handleChange={handleChange}
        />
      </td>
      <td className="recipe__td__space" />
      <td className="recipe__td__field">
        <Input
          type="number"
          step="1"
          min="0"
          max="20"
          name={prism2Name}
          id={prism2Name}
          value={prism2Value}
          handleChange={handleChange}
        />
      </td>
      <td className="recipe__td__prism__axis">
        <Select
          name={prism2AxisName}
          value={prism2AxisValue}
          options={prismAxis}
          handleChange={handleChange}
        />
      </td>
    </tr>
  </React.Fragment>
);

PrismFields.propTypes = {
  prism1Name: PropTypes.string.isRequired,
  prism1Value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  prism1AxisName: PropTypes.string.isRequired,
  prism1AxisValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  prism2Name: PropTypes.string.isRequired,
  prism2Value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  prism2AxisName: PropTypes.string.isRequired,
  prism2AxisValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  handleChange: PropTypes.func,
};

export default PrismFields;
