import http, { setTokenHeader } from '../utils/services/http';

setTokenHeader(localStorage.getItem('token'));

export const getDataDashboard = store => http.get(`/customer/dashboard/${store}`);
