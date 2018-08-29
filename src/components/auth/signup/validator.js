import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';

const ValidateForm = (data) => {
  const errors = {};

  if (
    !data
    || !data.hasOwnProperty('name')
    || !data.hasOwnProperty('email')
    || !data.hasOwnProperty('password')
    || !data.hasOwnProperty('confirmpassword')
  ) {
    return {
      errors,
      isValid: false,
    };
  }

  if (Validator.isEmpty(data.name)) {
    errors.name = 'Campo obrigatório';
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = 'Campo obrigatório';
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = 'Insira uma email válido';
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = 'Campo obrigatório';
  }

  if (Validator.isEmpty(data.confirmpassword)) {
    errors.confirmpassword = 'Campo obrigatório';
  }

  if (!Validator.equals(data.password, data.confirmpassword)) {
    errors.confirmpassword = 'As senhas não se coincidem';
    errors.password = 'As senhas não se coincidem';
  }

  if (!Validator.isLength(data.password, { min: 6, max: 65 })) {
    errors.password = 'O campo de senha deve ter mais do que 6 caracteres';
    errors.confirmpassword = 'O campo de senha deve ter mais do que 6 caracteres';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

export default ValidateForm;
