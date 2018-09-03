import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

// import YoutubeModal from 'react-youtube-modal';
import If from '../../common/if';
import { ROUTE_PREFIX as PREFIX } from '../../../config';
import Logo from '../../../assets/img/logo-white.png';
import { isAuthenticated } from '../../../utils/services/auth';

export const NavBar = ({ shop }) => (
  <div className="mdl-layout mdl-layout--fixed-header">
    <header className="mdl-layout__header">
      <div className="mdl-layout__header-row">
        <Link to={`${PREFIX}/`} className="nav-link">
          <span className="mdl-layout-title">
            <img className="nav-icon" src={Logo} alt="logo" />
          </span>
        </Link>
        <div className="mdl-layout-spacer" />
        <nav className="mdl-navigation mdl-layout--large-screen-only">
          {/* <form>
            <div className="mdl-textfield mdl-js-textfield mdl-textfield--expandable">
              <label className="mdl-button mdl-js-button mdl-button--icon" forHTML="sample6">
                <i className="material-icons">search</i>
              </label>
              <div className="mdl-textfield__expandable-holder">
                <input className="mdl-textfield__input" type="text" id="sample6" />
                <label className="mdl-textfield__label" forHTML="sample-expandable">
                  Expandable Input
                </label>
              </div>
            </div>
          </form> */}

          {/* <Link className="mdl-navigation__link" to={/}>
          Dashboard
        </Link> */}
          <If test={isAuthenticated}>
            {/* <If test={Object.keys(shop).length}>
              <Link to={`${PREFIX}/shops`} className="nav-link">
                <i className="fa fa-shopping-bag" />
                {shop.name}
              </Link>
            </If> */}
            {/* <YoutubeModal videoId="5X0mOi3SYtw" height="390" width="640">
              <a href="javascript:void(0);" className="nav-link">
                <i className="fa fa-question-circle" />
                Ajuda
              </a>
            </YoutubeModal> */}
            <Link to={`${PREFIX}/stores`} className="nav-link btn-logout">
              Lojas
            </Link>
            <Link to={`${PREFIX}/auth/logout`} className="nav-link btn-logout">
              Logout
            </Link>
          </If>
        </nav>
      </div>
    </header>
  </div>
  // <div className="mdl-layout mdl-layout--fixed-header">
  //   <header className="mdl-layout__header">
  //     <span className="mdl-layout-title">
  //       <Link to={`${PREFIX}`} className="navbar-brand">
  //         <img className="nav-icon" src={Logo} alt="logo" />
  //       </Link>
  //     </span>
  //     <div className="mdl-layout-spacer" />

  //     <nav className="mdl-navigation mdl-layout--large-screen-only">
  //       <div className="collapse navbar-collapse" id="navbarNav">
  //         <ul className="navbar-nav" />
  //         <ul className="navbar-nav ml-auto">
  //           <If test={isAuthenticated}>
  //             <If test={Object.keys(shop).length}>
  //               <li className="nav-item">
  //                 <Link to={`${PREFIX}/shops`} className="nav-link">
  //                   <i className="fa fa-shopping-bag" />
  //                   {shop.name}
  //                 </Link>
  //               </li>
  //             </If>
  //             <li className="nav-item">
  //               <YoutubeModal videoId="5X0mOi3SYtw" height="390" width="640">
  //                 <a href="javascript:void(0);" className="nav-link">
  //                   <i className="fa fa-question-circle" />
  //                   Ajuda
  //                 </a>
  //               </YoutubeModal>
  //             </li>
  //             <li className="nav-item">
  //               <Link to={`${PREFIX}/auth/logout`} className="nav-link btn-logout">
  //                 <i className="fa fa-user-times" />
  //                 Logout
  //               </Link>
  //             </li>
  //           </If>
  //         </ul>
  //       </div>
  //     </nav>
  //   </header>
  // </div>
);

const mapStateToProps = state => ({
  shop: state.shops.selectedShop,
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(NavBar);
