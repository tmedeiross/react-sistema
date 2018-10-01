import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Input from '../../common/form/input';

const FormLogin = ({
  handleSubmit, handleChange, errors, name, password, isLoading,
}) => (
  <form onSubmit={handleSubmit} autoComplete="off">
    <Input
      type="text"
      name="name"
      id="name"
      label="Nome"
      value={name}
      handleChange={handleChange}
      error={errors.name}
      showMsgError
    />
    <Input
      type="text"
      name="phone"
      id="phone"
      label="Telefone"
      value={name}
      handleChange={handleChange}
      error={errors.phone}
      showMsgError
    />

    <div className="mdl-grid">
      <div className="mdl-cell mdl-cell--6-col">
        <div className="mdl-card__actions mdl-typography--text-left">
          <label className="mdl-radio mdl-js-radio" htmlFor="option1">
            <input type="radio" id="option1" name="gender" className="mdl-radio__button" checked />
            <span className="mdl-radio__label">Masculino</span>
          </label>
        </div>
      </div>
      <div className="mdl-cell mdl-cell--6-col">
        <div className="mdl-card__actions mdl-typography--text-left">
          <label className="mdl-radio mdl-js-radio mdl-js-ripple-effect" htmlFor="option2">
            <input type="radio" id="option2" name="gender" className="mdl-radio__button" />
            <span className="mdl-radio__label">Feminino</span>
          </label>
        </div>
      </div>

      <div className="mdl-cell mdl-cell--12-col">
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

FormLogin.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
};

export default FormLogin;
