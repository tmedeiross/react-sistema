import React from 'react';
import PropTypes from 'prop-types';
import * as Helper from './helper';

import Input from '../../../common/form/input';

const FormAddress = ({
  zipCode,
  address,
  number,
  neighborhood,
  city,
  complement,
  state,
  errors,
  handleChange,
  handleBlurCep,
}) => (
  <React.Fragment>
    <div className="row">
      <div className="col-md-3 col-sm-4">
        <Input
          type="text"
          name="zipCode"
          id="zipCode"
          label="CEP"
          value={zipCode}
          handleChange={handleChange}
          utils
          handleBlur={handleBlurCep}
          error={errors.zipCode}
        />
      </div>
      <div className="col-sm-6 col-md-7">
        <Input
          type="text"
          name="address"
          id="address"
          label="Endereço"
          value={address}
          handleChange={handleChange}
          error={errors.address}
        />
      </div>
      <div className="col-sm-2">
        <Input
          type="text"
          name="number"
          id="number"
          label="Número"
          value={number}
          handleChange={handleChange}
          error={errors.number}
        />
      </div>
    </div>
    <div className="row">
      <div className="col-sm-5">
        <Input
          type="text"
          name="neighborhood"
          id="neighborhood"
          label="Bairro"
          value={neighborhood}
          handleChange={handleChange}
          error={errors.neighborhood}
        />
      </div>
      <div className="col-sm-5 col-md-5 col-lg-6">
        <Input
          type="text"
          name="city"
          id="city"
          label="Cidade"
          value={city || Helper.getDefaultCity()}
          handleChange={handleChange}
          error={errors.city}
        />
      </div>
      <div className="col-sm-2 col-md-2 col-lg-1">
        <Input
          type="text"
          name="state"
          id="state"
          label="Estado"
          value={state || Helper.getDefaultState()}
          handleChange={handleChange}
          error={errors.state}
        />
      </div>
      <div className="col-sm-12">
        <Input
          type="text"
          name="complement"
          id="complement"
          label="Complemento"
          value={complement}
          handleChange={handleChange}
          error={errors.complement}
        />
      </div>
    </div>
  </React.Fragment>
);

FormAddress.propTypes = {
  zipCode: PropTypes.string,
  number: PropTypes.string,
  neighborhood: PropTypes.string,
  city: PropTypes.string,
  complement: PropTypes.string,
  state: PropTypes.string,
  errors: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleBlurCep: PropTypes.func,
};

export default FormAddress;
