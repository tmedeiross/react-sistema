import * as ClientAPI from '../../api/client';
import { ROUTE_PREFIX as PREFIX } from '../../config';

const data = {
  birthdays: {
    pageName: 'Aniversariantes nesta semana',
    searchMethod: ClientAPI.getBirthdays,
    description: 'Clientes aniversariantes do dia ou semana.',
    color: 'bg-indigo-300',
    showBirthday: true,
    showDueDate: false,
  },
  'recipes-expiring': {
    pageName: 'Receitas Expirando em 30 dias',
    searchMethod: ClientAPI.getRecipesExpiring,
    description: 'Clientes com receitas expirando',
    color: 'bg-light-green-500',
    showBirthday: false,
    showDueDate: true,
  },
  'new-registers': {
    pageName: 'Novos Clientes hoje',
    searchMethod: ClientAPI.getNewRegisters,
    description: 'Clientes cadastrados no dia.',
    color: 'bg-amber-500',
    showBirthday: false,
    showDueDate: false,
  },
  'new-sales': {
    pageName: 'Novos Pedidos hoje',
    searchMethod: ClientAPI.getNewSales,
    description: 'Clientes com novas vendas no dia.',
    color: 'bg-deep-purple-300',
    showBirthday: false,
    showDueDate: false,
  },
};

export function getDataByPage(page = null) {
  if (!page) return null;

  return data.hasOwnProperty(page) ? data[page] : null;
}

export function getBreadcrumbData(pageName) {
  return [
    { active: false, link: `${PREFIX}`, name: 'Home' },
    { active: true, link: '', name: pageName },
  ];
}
