import http, { setTokenHeader } from '../utils/services/http';

setTokenHeader(localStorage.getItem('token'));

export const getClients = (searchValue, page) => {
  const params = {
    text: searchValue,
  };
  if (page) {
    params.page = page;
  }
  return http.get('/customer/', { params });
};

export const getRecipesExpiring = (store, page) => {
  const params = {
    page,
  };
  return http.get(`/customer/prescriptions/expiring/${store}`, { params });
};

export const getBirthdays = (store, page) => {
  const params = {
    page,
  };
  return http.get(`/customer/birthday/week/${store}`, { params });
};

export const getNewRegisters = (store, page) => {
  const params = {
    page,
  };
  return http.get(`/customer/registered/today/${store}`, { params });
};

export const getNewSales = (store, page) => {
  const params = {
    page,
  };
  return http.get(`/customer/sales/today/${store}`, { params });
};

export const getClient = id => http.get(`/customer/${id}`);

export const createClient = data => http.post('/customer', data);
export const updateClient = (id, data) => http.put(`/customer/${id}`, data);
