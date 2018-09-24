import { injectGlobal } from 'styled-components';

import 'material-design-lite/material.min.css';
import 'material-design-lite/material.min';
import 'mdl-select-component/mdl-selectfield.min.css';
import 'mdl-select-component/mdl-selectfield.min';
import 'react-mdl/extra/material.css';
import 'react-mdl/extra/material';
import 'react-mdl-extra/dist/react-mdl-extra.css';
import '../assets/css/material.acert.min.css';
import '../assets/css/styles.css';

injectGlobal`
*,
*:focus,
::selection {
  outline: none;
  box-shadow: none;
}
@font-face {
  font-family: 'Material Icons';
  font-style: normal;
  font-weight: 400;
  src: url('https://fonts.gstatic.com/s/materialicons/v41/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2') format('woff2');
}

.material-icons {
  font-family: 'Material Icons';
  font-weight: normal;
  font-style: normal;
  font-size: 24px;
  line-height: 1;
  letter-spacing: normal;
  text-transform: none;
  display: inline-block;
  white-space: nowrap;
  word-wrap: normal;
  direction: ltr;
  -webkit-font-feature-settings: 'liga';
  -webkit-font-smoothing: antialiased;
}
.navbar-expand-lg .navbar-nav .nav-link:hover {
  color: #fff;
}
.dropdown-item {
  color: rgb(15, 92, 169);
}
.navbar-expand-lg .navbar-nav .dropdown-menu {
    position: absolute;
    border: none;
    border-radius: 0;
}
.dropdown-item:focus, .dropdown-item:hover {
    color: #fff;
    text-decoration: none;
    background-color: rgb(15, 92, 169);
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
