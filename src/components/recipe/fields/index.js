import React from 'react';
import PropTypes from 'prop-types';

import Input from '../../common/form/input-simple';
import Select from '../../common/form/select-simple';
import aditions from '../../../utils/aditions';

const RecipeFields = ({
  eyeLabel,

  farSphereName,
  farSphereValue,
  farCylinderName,
  farCylinderValue,
  farAxisName,
  farAxisValue,

  additionName,
  additionValue,

  nearSphereName,
  nearSphereValue,
  nearCylinderName,
  nearCylinderValue,
  nearAxisName,
  nearAxisValue,

  dnpName,
  dnpValue,
  heightName,
  heightValue,

  handleChange,
  handleBlur,
}) => (
  <tr>
    <td className="recipe__td__button">
      <button type="button" className="btn btn-primary btn-sm" disabled>
        {eyeLabel}
      </button>
    </td>

    <td className="recipe__td__field">
      <Input
        type="number"
        step="25"
        min="-4000"
        max="4000"
        name={farSphereName}
        id={farSphereName}
        value={farSphereValue}
        handleChange={handleChange}
        handleBlur={handleBlur}
      />
    </td>
    <td className="recipe__td__field">
      <Input
        type="number"
        step="25"
        min="-2000"
        max="2000"
        name={farCylinderName}
        id={farCylinderName}
        value={farCylinderValue}
        handleChange={handleChange}
        handleBlur={handleBlur}
      />
    </td>
    <td className="recipe__td__field">
      <Input
        type="number"
        step="1"
        min="0"
        max="180"
        name={farAxisName}
        id={farAxisName}
        value={farAxisValue}
        handleChange={handleChange}
        handleBlur={handleBlur}
      />
    </td>

    <td className="recipe__td__space" />

    <td className="recipe__td__field">
      <Select
        name={additionName}
        id={additionName}
        value={additionValue}
        options={aditions}
        handleChange={handleChange}
        handleBlur={handleBlur}
      />
    </td>

    <td className="recipe__td__space" />

    <td className="recipe__td__field">
      <Input
        type="number"
        step="25"
        min="-4000"
        max="4000"
        name={nearSphereName}
        id={nearSphereName}
        value={nearSphereValue}
        handleChange={handleChange}
        handleBlur={handleBlur}
      />
    </td>
    <td className="recipe__td__field">
      <Input
        type="number"
        step="25"
        min="-2000"
        max="2000"
        name={nearCylinderName}
        id={nearCylinderName}
        value={nearCylinderValue}
        handleChange={handleChange}
        handleBlur={handleBlur}
      />
    </td>
    <td className="recipe__td__field">
      <Input
        type="number"
        step="1"
        min="0"
        max="20"
        name={nearAxisName}
        id={nearAxisName}
        value={nearAxisValue}
        handleChange={handleChange}
        handleBlur={handleBlur}
      />
    </td>

    <td className="recipe__td__space" />

    <td className="recipe__td__field">
      <Input
        type="number"
        step="1"
        min="20"
        max="40"
        name={dnpName}
        id={dnpName}
        value={dnpValue}
        handleChange={handleChange}
        handleBlur={handleBlur}
      />
    </td>
    <td className="recipe__td__field">
      <Input
        type="number"
        step="1"
        min="10"
        max="40"
        name={heightName}
        id={heightName}
        value={heightValue}
        handleChange={handleChange}
        handleBlur={handleBlur}
      />
    </td>
  </tr>
);

const numberOrString = PropTypes.oneOfType([PropTypes.string, PropTypes.number]);

RecipeFields.protoTypes = {
  eyeLabel: PropTypes.string.isRequired,
  farSphereName: PropTypes.string.isRequired,
  farSphereValue: numberOrString,
  farCylinderName: PropTypes.string.isRequired,
  farCylinderValue: numberOrString,
  farAxisName: PropTypes.string.isRequired,
  farAxisValue: numberOrString,
  dnpName: PropTypes.string.isRequired,
  dnpValue: numberOrString,
  heightName: PropTypes.string.isRequired,
  heightValue: numberOrString,
  additionName: PropTypes.string.isRequired,
  additionValue: numberOrString,
  nearSphereName: PropTypes.string.isRequired,
  nearSphereValue: numberOrString,
  nearCylinderName: PropTypes.string.isRequired,
  nearCylinderValue: numberOrString,
  nearAxisName: PropTypes.string.isRequired,
  nearAxisValue: numberOrString,
  handleChange: PropTypes.func.isRequired,
  handleBlur: PropTypes.func.isRequired,
};

export default RecipeFields;
