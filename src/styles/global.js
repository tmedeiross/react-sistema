import { injectGlobal } from 'styled-components';

import 'material-design-lite/material.min.css';
import 'material-design-lite/material.min';
import 'mdl-select-component/mdl-selectfield.min.css';
import 'mdl-select-component/mdl-selectfield.min';
import '../assets/css/material.acert.min.css';

injectGlobal`
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  outline: none;
}
  *,
*:after,
*::before {
   -webkit-box-sizing: border-box;
   -moz-box-sizing: border-box;
   box-sizing: border-box;
   margin: 0;
   padding: 0;
   text-decoration: none;
   list-style-type: none;
   outline: none;
}
.mdl-card__supporting-text {
  height: auto!important;
  overflow: -webkit-paged-x;
}
body {
    text-rendering: optimizeLegibility !important;
    -webkit-font-smoothing: antialiased !important;
    background:url('http://www.grupoacert.com.br/App_Themes/Acert/images/section-contact-bg.jpg') no-repeat center fixed;
  }
.mdl-typography--text-center {
  align-items: center;
  justify-content: center;
}
.ml1{
  margin-left: 1em;
}
.w100 {
  width: 100%;
}
.mdl-layout__header {
  display: flex !important;
}
.bg-primary {
  background-color: rgb(0,104,169) !important;
  color: #fff;
}
.mdl-layout__header-row {
  height: 60px;
  min-height: 60px !important;
}

.nav-icon {
  width:90px;
}
.mdl-card {
  width: 650px;
  max-width: 650px;
}
.mdl-card > .mdl-card__menu {
  color: #fff;
}
.mdl-layout__content {
  margin: auto;
  width: 80%;
  display: block;
}
.materialContainer {
   width: 100%;
   max-width: 460px;
   position: absolute;
   top: 50%;
   left: 50%;
   transform: translate(-50%, -50%);
   -webkit-transform: translate(-50%, -50%);
   -ms-transform: translate(-50%, -50%);
}
.mdl-dialog {
  position: fixed;
  top: 15%;
  left: 0;
  right: 0;
  width: -moz-fit-content;
  width: -webkit-fit-content;
  width: fit-content;
  height: -moz-fit-content;
  height: -webkit-fit-content;
  height: fit-content;
  margin: auto;
  border: solid;
  padding: 1em;
  background: white;
  color: black;
  z-index: 9;
  border: none;
  background:#fff;
  box-shadow: 0 9px 46px 8px rgba(0, 0, 0, 0.14), 0 11px 15px -7px rgba(0, 0, 0, 0.12), 0 24px 38px 3px rgba(0, 0, 0, 0.2);
  }
  .mdl-dialog__title {
    padding: 24px 24px 0;
    margin: 0;
    font-size: 2.5rem; }
  .mdl-dialog__actions {
    padding: 8px 8px 8px 24px;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-flex-direction: row-reverse;
        -ms-flex-direction: row-reverse;
            flex-direction: row-reverse;
    -webkit-flex-wrap: wrap;
        -ms-flex-wrap: wrap;
            flex-wrap: wrap; }
    .mdl-dialog__actions > * {
      margin-right: 8px;
      height: 36px; }
      .mdl-dialog__actions > *:first-child {
        margin-right: 0; }
    .mdl-dialog__actions--full-width {
      padding: 0 0 8px 0; }
      .mdl-dialog__actions--full-width > * {
        height: 48px;
        -webkit-flex: 0 0 100%;
            -ms-flex: 0 0 100%;
                flex: 0 0 100%;
        padding-right: 16px;
        margin-right: 0;
        text-align: right; }
  .mdl-dialog__content {
    padding: 20px 24px 24px 24px;
    color: rgba(0,0,0, 0.54); }
@media screen and (max-width: 1024px) {
  .mdl-layout__header-row {
      padding: 0 15px;
  }
  .mdl-card {
    margin: 0 15px;
  }
}
`;
