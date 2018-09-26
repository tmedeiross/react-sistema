import React from 'react';
import PropTypes from 'prop-types';

import Input from '../common/form/input';
import SelectSimple from '../common/form/select-simple';

const options = [
  { value: '', text: 'Selecionar' },
  { value: 'ADMIN', text: 'Admin' },
  { value: 'SALESMAN', text: 'Vendedor' },
  { value: 'ASSEMBLY', text: 'Montador' },
];
const Form = ({
  handleSubmit, handleChange, errors, userEmail, profileId, textBtn,
}) => (
  <form onSubmit={handleSubmit} autoComplete="off">
    <div className="mdl-grid">
      <div className="mdl-cell mdl-cell--5-col">
        <Input
          type="text"
          name="userEmail"
          id="userEmail"
          label="Email"
          value={userEmail}
          handleChange={handleChange}
          showMsgError
          error={errors.userEmail}
        />
      </div>
      <div className="mdl-cell mdl-cell--5-col">
        <SelectSimple
          name="profileId"
          id="profileId"
          label="Profile"
          value={profileId}
          handleChange={handleChange}
          options={options}
          showMsgError
          error={errors.profileId}
        />
      </div>
      <div className="mdl-cell mdl-cell--2-col botao">
        <input
          type="submit"
          className="mdl-button mdl-js-button mdl-button--raised mdl-button--accent mdl-js-ripple-effect bg-primary"
          value={textBtn}
        />
      </div>
    </div>
  </form>
);

Form.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  userEmail: PropTypes.string.isRequired,
  profileId: PropTypes.string.isRequired,
  textBtn: PropTypes.string.isRequired,
};

export default Form;
