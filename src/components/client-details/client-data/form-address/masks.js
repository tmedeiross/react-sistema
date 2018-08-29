import $ from 'jquery';
import 'jquery-mask-plugin';

const phoneMaskBehavior = function (val) {
  return val.replace(/\D/g, '').length === 11 ? '(00) 00000-0000' : '(00) 0000-00009';
};

const phoneMaskOptions = {
  onKeyPress(val, e, field, options) {
    field.mask(phoneMaskBehavior.apply({}, arguments), options);
  },
};

export function assignMasks() {
  $('#zipCode').mask('00000-000', { placeholder: '_____-___' });
  $('#personalCpf').mask('000.000.000-00', { placeholder: '___.___.___-__' });
  $('#cnpj').mask('00.000.000/0000-00', { placeholder: '__.___.___/____-__' });
  $('#cep').mask('000000-000', { placeholder: '______-__' });
  $('#phoneNumber').mask(phoneMaskBehavior, phoneMaskOptions);
  $('#phone1').mask(phoneMaskBehavior, phoneMaskOptions);
}
