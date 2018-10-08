import React from 'react';
import PropTypes from 'prop-types';

import Input from '../common/form/input';
import SelectSimple from '../common/form/select-simple';

const options = [
  { value: 'AC', text: 'Acre' },
  { value: 'AL', text: 'Alagoas' },
  { value: 'AP', text: 'Amapá' },
  { value: 'AM', text: 'Amazonas' },
  { value: 'BA', text: 'Bahia' },
  { value: 'CE', text: 'Ceará' },
  { value: 'DF', text: 'Distrito Federal' },
  { value: 'ES', text: 'Espírito Santo' },
  { value: 'GO', text: 'Goiás' },
  { value: 'MA', text: 'Maranhão' },
  { value: 'MT', text: 'Mato Grosso' },
  { value: 'MS', text: 'Mato Grosso do Sul' },
  { value: 'MG', text: 'Minas Gerais' },
  { value: 'PA', text: 'Pará' },
  { value: 'PB', text: 'Paraíba' },
  { value: 'PR', text: 'Paraná' },
  { value: 'PE', text: 'Pernambuco' },
  { value: 'PI', text: 'Piauí' },
  { value: 'RJ', text: 'Rio de Janeiro' },
  { value: 'RN', text: 'Rio Grande do Norte' },
  { value: 'RS', text: 'Rio Grande do Sul' },
  { value: 'RO', text: 'Rondônia' },
  { value: 'RR', text: 'Roraima' },
  { value: 'SC', text: 'Santa Catarina' },
  { value: 'SP', text: 'São Paulo' },
  { value: 'SE', text: 'Sergipe' },
  { value: 'TO', text: 'Tocantins' },
];
const FormAddStore = ({
  handleSubmit,
  handleChange,
  handleBlurCep,
  handleBlurNumber,
  errors,
  cnpj,
  fantasyName,
  socialName,
  phoneNumber,
  email,
  address,
  number,
  complement,
  zipCode,
  neighborhood,
  city,
  state,
  textBtn,
}) => (
  <form onSubmit={handleSubmit} autoComplete="off">
    <div className="mdl-grid">
      <div className="mdl-cell mdl-cell--6-col">
        <Input
          name="cnpj"
          id="cnpj"
          label="CNPJ"
          value={cnpj}
          handleChange={handleChange}
          maxLength="18"
          showMsgError
          error={errors.cnpj}
        />
      </div>
      <div className="mdl-cell mdl-cell--3-col">
        <Input
          type="text"
          name="phoneNumber"
          id="phoneNumber"
          label="Telefone"
          value={phoneNumber}
          handleChange={handleChange}
          showMsgError
          error={errors.phoneNumber}
          maxLength="17"
        />
      </div>
      <div className="mdl-cell mdl-cell--3-col">
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
      </div>
      <div className="mdl-cell mdl-cell--5-col">
        <Input
          type="text"
          name="fantasyName"
          id="fantasyName"
          label="Nome Fantasia"
          value={fantasyName}
          handleChange={handleChange}
          showMsgError
          error={errors.fantasyName}
          maxLength="30"
        />
      </div>
      <div className="mdl-cell mdl-cell--7-col">
        <Input
          type="text"
          name="socialName"
          id="socialName"
          label="Razão Social"
          value={socialName}
          handleChange={handleChange}
          showMsgError
          error={errors.socialName}
          minLenght="5"
          maxLength="65"
        />
      </div>
      <div className="mdl-cell mdl-cell--3-col">
        <Input
          type="text"
          name="zipCode"
          id="zipCode"
          label="CEP"
          value={zipCode}
          handleChange={handleChange}
          handleBlur={handleBlurCep}
          showMsgError
          error={errors.zipCode}
        />
      </div>

      <div className="mdl-cell mdl-cell--7-col">
        <Input
          type="text"
          name="address"
          id="address"
          label="Endereço"
          value={address}
          handleChange={handleChange}
          showMsgError
          error={errors.address}
          minLength="5"
          maxLength="60"
        />
      </div>
      <div className="mdl-cell mdl-cell--2-col">
        <Input
          type="text"
          name="number"
          id="number"
          label="Número"
          value={number}
          handleChange={handleChange}
          onKeyDown={handleBlurNumber}
          showMsgError
          error={errors.number}
          maxLength="10"
        />
      </div>
      <div className="mdl-cell mdl-cell--4-col">
        <Input
          type="text"
          name="complement"
          id="complement"
          label="Complemento"
          value={complement}
          handleChange={handleChange}
          showMsgError
          error={errors.complement}
          maxLength="20"
        />
      </div>

      <div className="mdl-cell mdl-cell--3-col">
        <Input
          type="text"
          name="neighborhood"
          id="neighborhood"
          label="Bairro"
          value={neighborhood}
          handleChange={handleChange}
          showMsgError
          error={errors.neighborhood}
          maxLength="30"
        />
      </div>
      <div className="mdl-cell mdl-cell--3-col">
        <Input
          type="text"
          name="city"
          id="city"
          label="Cidade"
          value={city}
          handleChange={handleChange}
          showMsgError
          error={errors.city}
          maxLength="30"
        />
      </div>
      <div className="mdl-cell mdl-cell--2-col">
        <SelectSimple
          name="state"
          id="state"
          label="Estado"
          value={state}
          handleChange={handleChange}
          options={options}
          showMsgError
          error={errors.state}
          maxLength="2"
        />
      </div>
    </div>

    <div className="mdl-card__actions mdl-typography--text-right">
      <input
        type="submit"
        className="mdl-button mdl-js-button mdl-button--raised mdl-button--accent mdl-js-ripple-effect bg-primary"
        value={textBtn}
        // disabled={!isValid}
      />
    </div>
  </form>
);

FormAddStore.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  cnpj: PropTypes.string.isRequired,
  fantasyName: PropTypes.string.isRequired,
  socialName: PropTypes.string.isRequired,
  phoneNumber: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  complement: PropTypes.string.isRequired,
  zipCode: PropTypes.string.isRequired,
  neighborhood: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
  state: PropTypes.string.isRequired,
  textBtn: PropTypes.string.isRequired,
  handleBlurCep: PropTypes.func.isRequired,
  handleBlurNumber: PropTypes.func.isRequired,
};

export default FormAddStore;
