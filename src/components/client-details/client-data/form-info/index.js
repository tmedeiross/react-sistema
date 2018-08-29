import React from 'react';
import PropTypes from 'prop-types';

import Input from '../../../common/form/input';
import ButtonDatePicker from '../../../common/form/button-datepicker';

import 'react-datepicker/dist/react-datepicker.css';

const FormInfo = ({
  socialName,
  personalCpf,
  email,
  phone1,
  dateBirth,
  errors,
  handleChange,
  handleBlurCpf,
  handleDateBirth,
}) => (
  <React.Fragment>
    <div className="row">
      <div className="col-md-3 col-sm-4">
        <Input
          name="personalCpf"
          id="personalCpf"
          label="CPF"
          value={personalCpf}
          error={errors.personalCpf}
          handleChange={handleChange}
          handleBlur={handleBlurCpf}
          maxLength="14"
        />
      </div>
      <div className="col-sm-8 col-md-9">
        <Input
          name="socialName"
          id="socialName"
          label="Nome"
          value={socialName}
          error={errors.socialName}
          handleChange={handleChange}
          maxLength="65"
        />
      </div>
    </div>
    <div className="row">
      <div className="col-sm-4 col-md-5 col-lg-7">
        <Input
          name="email"
          id="email"
          label="Email"
          value={email}
          error={errors.email}
          handleChange={handleChange}
        />
      </div>
      <div className="col-sm-4 col-md-4 col-lg-3">
        <Input
          name="phone1"
          id="phone1"
          label="Telefone"
          value={phone1}
          error={errors.phone1}
          handleChange={handleChange}
          maxLength="16"
        />
      </div>
      <div className="col-sm-4 col-md-3 col-lg-2">
        <div className="form-group">
          <label htmlFor="dateBirth">Nascimento</label>
          <ButtonDatePicker
            className="form-control"
            placeholderText="Informe a data"
            onDateChange={handleDateBirth}
            dateValue={dateBirth}
            name="dateBirth"
          />
        </div>
      </div>
    </div>
  </React.Fragment>
);

FormInfo.propTypes = {
  socialName: PropTypes.string,
  personalCpf: PropTypes.string,
  email: PropTypes.string,
  phone1: PropTypes.string,
  dateBirth: PropTypes.string,
  handleChange: PropTypes.func,
  handleBlurCpf: PropTypes.func,
  handleDateBirth: PropTypes.func,
};

export default FormInfo;
