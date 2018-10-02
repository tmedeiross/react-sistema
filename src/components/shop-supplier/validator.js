import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';

const ValidateForm = (data) => {
  const errors = {};

  if (
    !data
    || !data.hasOwnProperty('awardsCode')
    || !data.hasOwnProperty('purchaseCode')
    || !data.hasOwnProperty('defaultMessage')
  ) {
    return {
      errors,
      isValid: false,
    };
  }

  if (Validator.isEmpty(data.awardsCode)) {
    errors.awardsCode = 'Campo obrigatório';
  }

  if (Validator.isEmpty(data.purchaseCode)) {
    errors.purchaseCode = 'Campo obrigatório';
  }

  if (Validator.isEmpty(data.defaultMessage)) {
    errors.defaultMessage = 'Campo obrigatório';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

export default ValidateForm;
