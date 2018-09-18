import { injectGlobal } from 'styled-components';

import 'material-design-lite/material.min.css';
import 'material-design-lite/material.min';
import 'mdl-select-component/mdl-selectfield.min.css';
import 'mdl-select-component/mdl-selectfield.min';
import '../assets/css/material.acert.min.css';
import '../assets/css/styles.css';

injectGlobal`
*,
*:focus,
::selection {
  outline: none;
  box-shadow: none;
}
.navbar-expand-lg .navbar-nav .nav-link:hover {
  color: #fff;
}
.dropdown-item {
  color: rgb(0,104,169);
}
.navbar-expand-lg .navbar-nav .dropdown-menu {
    position: absolute;
    border: none;
    border-radius: 0;
}
.dropdown-item:focus, .dropdown-item:hover {
    color: #fff;
    text-decoration: none;
    background-color: rgb(0,104,169);
}
.mdl-card__title {
  padding: 5px 16px;
}
.mdl-card__title  h2.mdl-card__title-text {
  font-size: 20px;
}
.btn-secondary {
  color: #fff !important;
  background-color: #dc3545 !important;
}
.dropdown-menu {
  left: auto;
  right: 0;
}
`;
