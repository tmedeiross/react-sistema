import Validator from "validator";
import isEmpty from "lodash/isEmpty";

const ValidateForm = data => {
  const errors = {};

  if (!data.hasOwnProperty("awardsCode")) {
    return {
      errors,
      isValid: false
    };
  }

  if (Validator.isEmpty(data.awardsCode)) {
    errors.awardsCode = "Campo obrigatório";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

export default ValidateForm;
