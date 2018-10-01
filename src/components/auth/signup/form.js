import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Input from '../../common/form/input';

const FormSignup = ({
  handleSubmit,
  handleChange,
  errors,
  name,
  email,
  password,
  confirmpassword,
  isLoading,
}) => (
  <form onSubmit={handleSubmit} autoComplete="off">
    <Input
      type="text"
      name="name"
      id="name"
      label="Nome"
      value={name}
      handleChange={handleChange}
      showMsgError
      error={errors.name}
    />
    <Input
      type="text"
      name="email"
      id="email"
      label="Email"
      value={email}
      handleChange={handleChange}
      showMsgError
      error={errors.email}
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
      minLength="10"
    />

    <Input
      type="password"
      name="confirmpassword"
      id="confirmpassword"
      label="Confirme sua senha"
      value={confirmpassword}
      handleChange={handleChange}
      error={errors.confirmpassword}
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
            Já tenho conta
          </Link>
        </div>
      </div>
      <div className="mdl-cell mdl-cell--6-col">
        <div className="mdl-card__actions mdl-typography--text-right">
          <input
            type="submit"
            className="mdl-button mdl-js-button mdl-button--raised mdl-button--accent mdl-js-ripple-effect bg-primary w100"
            value="Confirmar"
            disabled={isLoading}
          />
        </div>
      </div>
    </div>
  </form>
);

FormSignup.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  confirmpassword: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
};

export default FormSignup;
