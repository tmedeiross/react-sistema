import React from 'react';
import PropTypes from 'prop-types';
import { Switch } from 'react-mdl';
import SelectSimple from '../common/form/select-simple';

const options = [
  { value: '', text: 'Selecionar' },
  { value: 'ADMIN', text: 'Admin' },
  { value: 'SALESMAN', text: 'Vendedor' },
  { value: 'ASSEMBLY', text: 'Montagem' },
];
const Form = ({
  handleSubmit, handleChange, errors, profileId, textBtn, handleCloseDialog,
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
        <Switch ripple id="switch1" defaultChecked>
          Valores visíveis
        </Switch>
      </div>
    </div>
  </form>
);

Form.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  profileId: PropTypes.string.isRequired,
  textBtn: PropTypes.string.isRequired,
};

export default Form;
