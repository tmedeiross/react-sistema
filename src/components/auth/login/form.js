import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Input from '../../common/form/input';

const FormLogin = ({
  handleSubmit, handleChange, errors, username, password, isLoading,
}) => (
  <form onSubmit={handleSubmit} autoComplete="off">
    <Input
      type="text"
      name="username"
      id="username"
      label="Usuário"
      value={username}
      handleChange={handleChange}
      error={errors.username}
      showMsgError
    />
    <Input
      type="password"
      name="password"
      id="password"
      label="Senha"
      value={password}
      handleChange={handleChange}
      error={errors.password}
      showMsgError
    />

    <div className="mdl-grid">
      <div className="mdl-cell mdl-cell--6-col">
        <div className="mdl-card__actions mdl-typography--text-right">
          <Link
            className="mdl-button mdl-js-button mdl-button--raised mdl-button--accent mdl-js-ripple-effect secondary w100"
            color="primary"
            to="/app/auth/signup"
          >
            Criar conta
          </Link>
        </div>
      </div>
      <div className="mdl-cell mdl-cell--6-col">
        <div className="mdl-card__actions mdl-typography--text-right">
          <input
            type="submit"
            className="mdl-button mdl-js-button mdl-button--raised mdl-button--accent mdl-js-ripple-effect bg-primary w100"
            value="Entrar"
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
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
};

export default FormLogin;
