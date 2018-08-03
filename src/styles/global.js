import { injectGlobal } from 'styled-components';

// import 'react-mdl/extra/material.css';
// import 'react-mdl/extra/material';
import 'material-design-lite/material.min.css';
import 'material-design-lite/material.min';
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
    height: 90px;
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

@media screen and (max-width: 1024px) {
  .mdl-layout__header-row {
      padding: 0 15px;
  }
  .mdl-card {
    margin: 0 15px;
  }
}
`;
