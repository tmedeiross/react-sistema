import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';

const ValidateForm = (data) => {
  const errors = {};

  if (!data || !data.hasOwnProperty('email')) {
    return {
      errors,
      isValid: false,
    };
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = 'Campo obrigatório';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

export default ValidateForm;
