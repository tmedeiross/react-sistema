import React, { Component } from "react";
import {
  Nav,
  UncontrolledDropdown,
  DropdownItem,
  DropdownToggle,
  DropdownMenu,
  Input
} from "reactstrap";
import IntlMessages from "Util/IntlMessages";
import PerfectScrollbar from "react-perfect-scrollbar";

import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Creators as AuthActions } from "Redux/auth/reducer";
import {
  setContainerClassnames,
  clickOnMobileMenu,
  logoutUser
} from "Redux/actions";

import notifications from "Data/topnav.notifications.json";

class TopNav extends Component {
  constructor(props) {
    super(props);
    this.menuButtonClick = this.menuButtonClick.bind(this);
    this.mobileMenuButtonClick = this.mobileMenuButtonClick.bind(this);
    this.state = {
      isInFullScreen: false
    };
    this.getUser = this.getUser.bind(this);
  }
  isInFullScreen = () => {
    return (
      (document.fullscreenElement && document.fullscreenElement !== null) ||
      (document.webkitFullscreenElement &&
        document.webkitFullscreenElement !== null) ||
      (document.mozFullScreenElement &&
        document.mozFullScreenElement !== null) ||
      (document.msFullscreenElement && document.msFullscreenElement !== null)
    );
  };

  toggleFullScreen = () => {
    const isInFullScreen = this.isInFullScreen();

    var docElm = document.documentElement;
    if (!isInFullScreen) {
      if (docElm.requestFullscreen) {
        docElm.requestFullscreen();
      } else if (docElm.mozRequestFullScreen) {
        docElm.mozRequestFullScreen();
      } else if (docElm.webkitRequestFullScreen) {
        docElm.webkitRequestFullScreen();
      } else if (docElm.msRequestFullscreen) {
        docElm.msRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    }
    this.setState({
      isInFullScreen: !isInFullScreen
    });
  };

  handleLogout = history => {
    history.push("/auth/login");
  };

  menuButtonClick(e, menuClickCount, containerClassnames) {
    e.preventDefault();

    setTimeout(() => {
      var event = document.createEvent("HTMLEvents");
      event.initEvent("resize", false, false);
      window.dispatchEvent(event);
    }, 350);
    this.props.setContainerClassnames(++menuClickCount, containerClassnames);
  }
  mobileMenuButtonClick(e, containerClassnames) {
    e.preventDefault();
    this.props.clickOnMobileMenu(containerClassnames);
  }

  getUser() {
    this.props.getUserRequest("teste", this.props.history);
  }

  componentDidMount() {
    this.getUser();
  }

  render() {
    const { name } = this.props.authUser.userDetails;
    const { containerClassnames, menuClickCount } = this.props;
    return (
      <nav className="navbar fixed-top">
        <NavLink
          to="#"
          className="menu-button d-none d-md-block"
          onClick={e =>
            this.menuButtonClick(e, menuClickCount, containerClassnames)
          }
        >
          <svg
            className="main"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 9 17"
          >
            <rect x="0.48" y="0.5" width="7" height="1" />
            <rect x="0.48" y="7.5" width="7" height="1" />
            <rect x="0.48" y="15.5" width="7" height="1" />
          </svg>
          <svg
            className="sub"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 18 17"
          >
            <rect x="1.56" y="0.5" width="16" height="1" />
            <rect x="1.56" y="7.5" width="16" height="1" />
            <rect x="1.56" y="15.5" width="16" height="1" />
          </svg>
        </NavLink>
        <NavLink
          to="#"
          className="menu-button-mobile d-xs-block d-sm-block d-md-none"
          onClick={e => this.mobileMenuButtonClick(e, containerClassnames)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 26 17">
            <rect x="0.5" y="0.5" width="25" height="1" />
            <rect x="0.5" y="7.5" width="25" height="1" />
            <rect x="0.5" y="15.5" width="25" height="1" />
          </svg>
        </NavLink>
        <div className="search" data-search-path="#">
          <Input
            name="searchKeyword"
            id="searchKeyword"
            placeholder="Procurar"
          />
          <span className="search-icon">
            <i className="simple-icon-magnifier" />
          </span>
        </div>
        <a className="navbar-logo" href="/">
          <span className="logo d-none d-xs-block" />
          <span className="logo-mobile d-block d-xs-none" />
        </a>
        <div className="ml-auto">
          <div className="header-icons d-inline-block align-middle">
            <div className="user d-inline-block">
              <UncontrolledDropdown className="dropdown-menu-right">
                <DropdownToggle className="p-0" color="empty">
                  <span>
                    <img alt="Profile" src="/assets/img/avatar.png" />
                  </span>
                  <span className="name ml-3">{name}</span>
                </DropdownToggle>
                <DropdownMenu className="mt-3" right>
                  <DropdownItem>Minhas Lojas</DropdownItem>
                  <DropdownItem>Minha conta</DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem href="/auth/login">Sair</DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </div>
            <button
              className="header-icon btn btn-empty d-none d-sm-inline-block ml-3"
              type="button"
              id="fullScreenButton"
              onClick={this.toggleFullScreen}
            >
              {this.state.isInFullScreen ? (
                <i className="simple-icon-size-actual d-block" />
              ) : (
                <i className="simple-icon-size-fullscreen d-block" />
              )}
            </button>
          </div>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = state => ({
  authUser: state.authUser
  // const { containerClassnames, menuClickCount } = menu;
  // return { containerClassnames, menuClickCount };
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(AuthActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TopNav);
