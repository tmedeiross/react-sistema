import React from 'react';
import PropTypes from 'prop-types';

import Input from '../../common/form/input-simple';

const DigitalRecipe = ({
  rightVertexDistance,
  leftVertexDistance,
  pantoscopicAngle,
  curvatureAngle,
  readingDistance,
  handleChange,
}) => (
  <div className="table-responsive">
    <table cellPadding="0" cellSpacing="0">
      <tbody>
        <tr>
          <td />
          <td align="center" nowrap="nowrap">
            Distância Vértice
          </td>
          <td align="center" />
          <td align="center" />
          <td align="center" nowrap="nowrap">
            Angulo Pantoscópico
          </td>
          <td align="center" />
          <td align="center" nowrap="nowrap">
            Angulo Curvatura
          </td>
          <td align="center" />
          <td align="center" nowrap="nowrap">
            Distância Leitura
          </td>
        </tr>
        <tr>
          <td className="recipe__td__button">
            <button type="button" className="btn btn-primary btn-sm" disabled>
              OD
            </button>
          </td>
          <td className="recipe__td__field">
            <Input
              type="number"
              name="rightVertexDistance"
              id="rightVertexDistance"
              value={rightVertexDistance}
              handleChange={handleChange}
            />
          </td>
          <td className="recipe__td__space" />
          <td className="recipe__td__space" />
          <td className="recipe__td__field">
            <Input
              type="number"
              name="pantoscopicAngle"
              id="pantoscopicAngle"
              value={pantoscopicAngle}
              handleChange={handleChange}
            />
          </td>
          <td className="recipe__td__space" />
          <td className="recipe__td__field">
            <Input
              type="number"
              name="curvatureAngle"
              id="curvatureAngle"
              value={curvatureAngle}
              handleChange={handleChange}
            />
          </td>
          <td className="recipe__td__space" />
          <td className="recipe__td__field">
            <Input
              type="number"
              name="readingDistance"
              id="readingDistance"
              value={readingDistance}
              handleChange={handleChange}
            />
          </td>
        </tr>
        <tr>
          <td className="recipe__td__button">
            <button type="button" className="btn btn-primary btn-sm" disabled>
              OE
            </button>
          </td>
          <td className="recipe__td__field">
            <Input
              type="number"
              name="leftVertexDistance"
              id="leftVertexDistance"
              value={leftVertexDistance}
              handleChange={handleChange}
            />
          </td>
          <td colSpan="6" />
        </tr>
      </tbody>
    </table>
  </div>
);

DigitalRecipe.propTypes = {
  rightVertexDistance: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  leftVertexDistance: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  pantoscopicAngle: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  curvatureAngle: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  readingDistance: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default DigitalRecipe;
