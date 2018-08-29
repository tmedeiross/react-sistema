import { ROUTE_PREFIX as PREFIX } from '../../config';

export function getBreadcrumbData() {
  return [
    { active: false, link: `${PREFIX}`, name: 'Home' },
    { active: true, link: '', name: 'Novo Cadastro' },
  ];
}

export function applyUpperCase(value) {
  return value ? value.toUpperCase() : value;
}

export function formatEmail(value) {
  return value ? value.replace(/\s/g, '').toLowerCase() : value;
}
