import { setTokenHeader, unsetTokenHeader } from "../http";

export const isAuthenticated = () => !!localStorage.getItem("token");

export const setToken = token => {
  localStorage.setItem("token", token);
  setTokenHeader(token);
};

export const setUser = user => {
  localStorage.setItem("user", user);
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("token-cep");
  localStorage.removeItem("shop");
  localStorage.removeItem("user");
  unsetTokenHeader();
};
