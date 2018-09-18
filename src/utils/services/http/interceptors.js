import swal from 'sweetalert';
import { logout } from '../auth';

export default (http) => {
  http.interceptors.response.use(
    response => response,
    (error) => {
      if (!error.response) {
        /* eslint-disable */
        if (window.location.pathname === '/app/auth/login') {
          return Promise.reject({
            status: 404,
            message: 'Não foi possível estabelecer conexão com o servidor.',
          });
        }
        return swal(
          'Atenção',
          'Não foi possível estabelecer conexão com o servidor.',
          'error',
        ).then(() => {
          logout();
          return (window.location = '/app/auth/login');
        });
      }
      if (error.response.status === 403) {
        return swal(
          'Atenção',
          'A sessão de usuário expirou, faça o login novamente.',
          'error',
        ).then(() => {
          logout();
          return (window.location = '/app/auth/login');
        });
      }

      return Promise.reject(error.response);
      /* eslint-enable */
    },
  );
};
