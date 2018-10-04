import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Input from '../../common/form/input';

const FormLogin = ({
  handleSubmit, handleChange, errors, oldPassword, newPassword, isLoading,
}) => (
  <form onSubmit={handleSubmit} autoComplete="off">
    <Input
      type="text"
      name="oldPassword"
      id="oldPassword"
      label="Senha atual"
      value={oldPassword}
      handleChange={handleChange}
      error={errors.oldPassword}
      showMsgError
    />
    <Input
      type="newPassword"
      name="newPassword"
      id="newPassword"
      label="Nova senha"
      value={newPassword}
      handleChange={handleChange}
      error={errors.newPassword}
      showMsgError
    />

    <div className="mdl-grid">
      <div className="mdl-cell mdl-cell--12-col">
        <div className="mdl-card__actions mdl-typography--text-right">
          <input
            type="submit"
            className="mdl-button mdl-js-button mdl-button--raised mdl-button--accent mdl-js-ripple-effect bg-primary w100"
            value="Confirmar troca de senha"
            disabled={isLoading}
          />
        </div>
      </div>
    </div>
  </form>
);

FormLogin.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  oldPassword: PropTypes.string.isRequired,
  newPassword: PropTypes.string.isRequired,
};

export default FormLogin;
