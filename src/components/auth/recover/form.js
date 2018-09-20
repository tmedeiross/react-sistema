import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Input from '../../common/form/input';

const FormLogin = ({
  handleSubmit, handleChange, errors, email,
}) => (
  <form onSubmit={handleSubmit} autoComplete="off">
    <Input
      type="text"
      name="email"
      id="email"
      label="Usuário"
      value={email}
      handleChange={handleChange}
      error={errors.email}
      showMsgError
    />

    <div className="mdl-grid">
      <div className="mdl-cell mdl-cell--6-col">
        <div className="mdl-card__actions mdl-typography--text-right">
          <Link
            className="mdl-button mdl-js-button mdl-button--raised mdl-button--accent mdl-js-ripple-effect secondary w100"
            color="primary"
            to="/app/auth/login"
          >
            Cancelar
          </Link>
        </div>
      </div>
      <div className="mdl-cell mdl-cell--6-col">
        <div className="mdl-card__actions mdl-typography--text-right">
          <input
            type="submit"
            className="mdl-button mdl-js-button mdl-button--raised mdl-button--accent mdl-js-ripple-effect bg-primary w100"
            value="Recuperar senha"
          />
        </div>
      </div>
    </div>
  </form>
);

FormLogin.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
  errors: PropTypes.object.isRequired,
};

export default FormLogin;
