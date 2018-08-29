import { ROUTE_PREFIX as PREFIX } from '../../config';

export function fillData(data = {}) {
  return [
    {
      title: 'Receitas Expirando em 30 dias',
      total: data.expiringRecipes || 0,
      color: 'bg-light-green-500',
      route: `${PREFIX}/clients/recipes-expiring`,
      icon: 'fa fa-calendar',
    },
    {
      title: 'Aniversariantes nesta semana',
      total: data.birthdayOnDayOrWeek || 0,
      color: 'bg-indigo-300',
      route: `${PREFIX}/clients/birthdays`,
      icon: 'fa fa-birthday-cake',
    },
    {
      title: 'Novos Clientes hoje',
      total: data.registeredOnDay || 0,
      color: 'bg-amber-500',
      route: `${PREFIX}/clients/new-registers`,
      icon: 'fa fa-address-card',
    },
    {
      title: 'Novas Vendas hoje',
      total: data.salesOnDay || 0,
      color: 'bg-deep-purple-300',
      route: `${PREFIX}/clients/new-sales`,
      icon: 'fa fa-paste',
    },
  ];
}
