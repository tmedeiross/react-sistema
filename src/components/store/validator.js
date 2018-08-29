import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';

const ValidateForm = (data) => {
  const errors = {};

  if (
    !data
    // || !data.hasOwnProperty('cnpj')
    // || !data.hasOwnProperty('fantasyName')
    // || !data.hasOwnProperty('socialName')
    // || !data.hasOwnProperty('phoneNumber')
    // || !data.hasOwnProperty('email')
    // || !data.hasOwnProperty('address')
    // || !data.hasOwnProperty('number')
    // || !data.hasOwnProperty('zipCode')
    // || !data.hasOwnProperty('neighborhood')
    // || !data.hasOwnProperty('city')
    // || !data.hasOwnProperty('state')
  ) {
    return {
      errors,
      isValid: false,
    };
  }
  if (Validator.isEmpty(data.cnpj)) {
    errors.cnpj = 'Campo obrigatório';
  } else if (!Validator.isLength(data.cnpj, 14)) {
    errors.cnpj = 'O tamanho do CNPJ deve ter 14 caracteres';
  }

  if (Validator.isEmpty(data.fantasyName)) {
    errors.fantasyName = 'Campo obrigatório';
  }

  if (Validator.isEmpty(data.phoneNumber)) {
    errors.phoneNumber = 'Campo obrigatório';
  } else if (!Validator.isLength(data.phoneNumber, 8)) {
    errors.phoneNumber = 'O tamanho do telefone deve ter no mínimo 8 caracteres';
  }

  if (Validator.isEmpty(data.socialName)) {
    errors.socialName = 'Campo obrigatório';
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = 'Campo obrigatório';
  } else if (!Validator.isEmail(data.email)) {
    errors.email = 'Email inválido';
  }

  if (Validator.isEmpty(data.address)) {
    errors.address = 'Campo obrigatório';
  }

  if (Validator.isEmpty(data.number)) {
    errors.number = 'Campo obrigatório';
  }

  if (Validator.isEmpty(data.zipCode)) {
    errors.zipCode = 'Campo obrigatório';
  }

  if (Validator.isEmpty(data.neighborhood)) {
    errors.neighborhood = 'Campo obrigatório';
  }

  if (Validator.isEmpty(data.city)) {
    errors.city = 'Campo obrigatório';
  }

  if (Validator.isEmpty(data.state)) {
    errors.state = 'Campo obrigatório';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

export default ValidateForm;
