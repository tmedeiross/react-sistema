// import Validator from 'validator';
// import isEmpty from 'lodash/isEmpty';

// const ValidateForm = (data) => {
//   const errors = {};

//   if (!data || !data.hasOwnProperty('username') || !data.hasOwnProperty('password')) {
//     return {
//       errors,
//       isValid: false,
//     };
//   }

//   if (Validator.isEmpty(data.username)) {
//     errors.username = 'Campo obrigatório';
//   }

//   if (Validator.isEmpty(data.password)) {
//     errors.password = 'Campo obrigatório';
//   }

//   return {
//     errors,
//     isValid: isEmpty(errors),
//   };
// };

// export default ValidateForm;
