import React from 'react';

import If from '../../if';

const fields = {
  socialName: 'Nome',
  personalCpf: 'CPF',
  email: 'Email',
  phone1: 'Telefone',
  zipCode: 'Cep',
  address: 'Endereço',
  number: 'Número',
  neighborhood: 'Bairro',
  city: 'Cidade',
  state: 'Estado',
  complement: 'Complemento',
};

const ErrorMessage = ({ errors }) => {
  const keys = Object.keys(errors);
  return (
    <If test={keys && keys.length}>
      <div className="alert alert-danger" role="alert">
        <ul style={{ marginBottom: 0 }}>
          {keys.map((key, index) => (
            <li key={index}>
              <b>
                {fields[key]}
:
                {' '}
              </b>
              {' '}
              {errors[key]}
            </li>
          ))}
        </ul>
      </div>
    </If>
  );
};

export default ErrorMessage;
