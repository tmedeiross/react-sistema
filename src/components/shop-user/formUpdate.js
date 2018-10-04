import React from 'react';
import PropTypes from 'prop-types';
import SelectSimple from '../common/form/select-simple';

const options = [
  { value: 'ADMIN', text: 'Admin' },
  { value: 'SALESMAN', text: 'Vendedor' },
  { value: 'ASSEMBLY', text: 'Montador' },
];
const Form = ({
  handleSubmit, handleChange, errors, profileId, showSalesValues, onChange,
}) => (
  <form onSubmit={handleSubmit} autoComplete="off">
    <div className="mdl-grid">
      <div className="mdl-cell mdl-cell--12-col">
        <SelectSimple
          name="profileId"
          label="Profile"
          value={profileId}
          handleChange={handleChange}
          options={options}
          showMsgError
          error={errors.profileId}
        />
      </div>

      <div className="mdl-cell mdl-cell--12-col">
        <label>
          <input
            type="checkbox"
            onChange={handleChange}
            checked={showSalesValues}
            value={showSalesValues}
            name="showSalesValues"
          />
          Valores visíveis
        </label>
      </div>
    </div>
  </form>
);

Form.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  profileId: PropTypes.string.isRequired,
};

export default Form;
