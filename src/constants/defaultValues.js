import axios from "axios";

export const defaultMenuType = "menu-sub-hidden"; //'menu-sub-hidden', 'menu-hidden', 'menu-default'
export const defaultStartPath = "/app/shops";
export const defaultStartDashboard = "/app/dashboard";
export const defaultStartPathLogin = "/auth/login";
export const path = "/";
export const subHiddenBreakpoint = 1440;
export const menuHiddenBreakpoint = 768;

export const defaultLocale = {
  locale: {
    languageId: "english",
    locale: "en",
    name: "English",
    icon: "en"
  }
};

export const CDN_URL = "https://s3.amazonaws.com/order-tracking-storage/cp";
export const API_URL_ZIPCODE = "http://cep.grupoacert.com.br";
export const apiUrl = "http://localhost:8090/";

export const api = axios.create({
  baseURL: apiUrl
});
