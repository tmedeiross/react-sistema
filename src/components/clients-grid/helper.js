import moment from 'moment';

export function getBirthdate(date = null) {
  if (date && date.length > 5) {
    return date.slice(0, 5);
  }
  return '';
}

export function getDueDate(client = null) {
  const format = 'DD/MM/YYYY';
  if (client && client.hasOwnProperty('prescription')) {
    if (client.prescription.hasOwnProperty('registrationDate')) {
      const date = moment(client.prescription.registrationDate, format).add(1, 'y');
      return date.format(format);
    }
  }
  return '';
}
