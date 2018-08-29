import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';

const ValidateForm = ({
  socialName, personalCpf, email, phone1,
}) => {
  const errors = {};

  if (Validator.isEmpty(socialName)) {
    errors.socialName = 'Campo obrigatório';
  } else if (!Validator.isLength(socialName, { min: 5, max: 65 })) {
    errors.socialName = 'O tamanho do nome do cliente deve ter entre 5 e 65 caracteres';
  }

  if (personalCpf && Validator.isLength(personalCpf, undefined, 14)) {
    errors.personalCpf = 'O tamanho do C.P.F. do cliente deve ter no máximo 14 caracteres';
  }

  if (Validator.isEmpty(email)) {
    errors.email = 'Campo obrigatório';
  } else if (!Validator.isEmail(email)) {
    errors.email = 'Email inválido';
  }

  if (phone1 && Validator.isLength(phone1, undefined, 16)) {
    errors.personalCpf = 'O tamanho do telefone do cliente deve ter no máximo 16 caracteres';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

export default ValidateForm;
