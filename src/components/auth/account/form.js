import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Input from '../../common/form/input';
import { user } from '../../../api/auth';

const FormLogin = ({
  handleSubmit,
  handleChange,
  handleChangeName,
  errors,
  name,
  gender,
  phoneNumber,
  isLoading,
}) => (
  <form onSubmit={handleSubmit} autoComplete="off">
    <Input
      type="text"
      name="name"
      id="name"
      label="Nome"
      value={name}
      handleChange={handleChangeName}
      error={errors.name}
      showMsgError
      maxLength="65"
    />
    <Input
      type="text"
      name="phoneNumber"
      id="phoneNumber"
      label="Telefone"
      value={phoneNumber}
      handleChange={handleChange}
      error={errors.phoneNumber}
      showMsgError
      maxLength="30"
    />

    <div className="mdl-grid">
      <div className="mdl-cell mdl-cell--6-col">
        <div className="mdl-card__actions mdl-typography--text-left">
          <label className="mdl-radio mdl-js-radio" htmlFor="MALE">
            <input
              type="radio"
              defaultChecked={gender === 'MALE'}
              id="MALE"
              value="MALE"
              name="gender"
              className="mdl-radio__button"
              onChange={handleChange}
            />
            <span className="mdl-radio__label">Masculino</span>
          </label>
        </div>
      </div>
      <div className="mdl-cell mdl-cell--6-col">
        <div className="mdl-card__actions mdl-typography--text-left">
          <label className="mdl-radio mdl-js-radio mdl-js-ripple-effect" htmlFor="FEMALE">
            <input
              type="radio"
              id="FEMALE"
              defaultChecked={gender === 'FEMALE'}
              value="FEMALE"
              name="gender"
              className="mdl-radio__button"
              onChange={handleChange}
            />
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
  name: PropTypes.string.isRequired,
  phoneNumber: PropTypes.string.isRequired,
  gender: PropTypes.string.isRequired,
};

export default FormLogin;
