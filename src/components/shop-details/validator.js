import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';

const ValidateForm = (data) => {
  const errors = {};

  if (!data) {
    return {
      errors,
      isValid: false,
    };
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = 'Campo obrigatório';
  } else if (!Validator.isEmail(data.email)) {
    errors.email = 'Email inválido';
  }

  if (Validator.isEmpty(data.profile)) {
    errors.profile = 'Campo obrigatório';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

export default ValidateForm;
