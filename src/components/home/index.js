import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';

import './styles.css';
// import { debounce } from 'lodash';

// import SummaryCards from '../summary-cards';
// import InputSearch from '../common/form/input-search';
import { loadingOn, loadingOff } from '../../redux-flow/reducers/loader/action-creators';
import { ROUTE_PREFIX as PREFIX } from '../../config';

export class Home extends Component {
  constructor() {
    super();
    this.state = {
      searchValue: '',
    };
    this.onVoiceResult = this.onVoiceResult.bind(this);
    this.onNewCustomer = this.onNewCustomer.bind(this);
    this.redirectTo = this.redirectTo.bind(this);
  }

  // debounceEvent(...args) {
  //   this.debouncedEvent = debounce(...args);
  //   return (e) => {
  //     e.persist();
  //     return this.debouncedEvent(e);
  //   };
  // }

  onVoiceResult(result) {
    this.setState({ searchValue: result });
  }

  redirectTo(path) {
    this.props.history.push(path);
  }

  onNewCustomer() {
    this.props.history.push(`${PREFIX}/client/new/`);
  }

  render() {
    // const { searchValue } = this.state;
    return (
      <Fragment>
        <div className="ui">
          <nav className="navbar app" />
          <div className="lists">
            <div className="list">
              <header>
                Pedido
                <i className="material-icons filter_list">filter_list</i>
              </header>
              <ul>
                <li>
                  <i className="material-icons more_vert">more_vert</i>
                  {/* <span className="nav-item dropdown">
                    <a
                      className="nav-link dropdown-toggle"
                      id="navbarDropdownMenuLink"
                      role="button"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    />
                    oioi
                    <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                      <Link to={`${PREFIX}/shops`} className="dropdown-item">
                        Minhas Lojas
                      </Link>
                      <Link to={`${PREFIX}/auth/logout`} className="dropdown-item">
                        Minha conta
                      </Link>
                      <Link to={`${PREFIX}/auth/logout`} className="dropdown-item btn-logout">
                        Sair
                      </Link>
                    </div>
                  </span> */}
                  <p className="number">203.002</p>
                  <p className="name">Nome Nome</p>
                  <p className="date">jul,09</p>
                  <div className="footer">Store: Amazing NY</div>
                </li>
                <li>
                  <i className="material-icons more_vert">more_vert</i>
                  <p className="number">203.002</p>
                  <p className="name">Nome Nome</p>
                  <p className="date">jul,09</p>
                  <div className="footer">Store: Amazing NY</div>
                </li>
                <li>
                  <i className="material-icons more_vert">more_vert</i>
                  <p className="number">203.002</p>
                  <p className="name">Nome Nome</p>
                  <p className="date">jul,09</p>
                  <div className="footer">Store: Amazing NY</div>
                </li>
                <li>
                  <i className="material-icons more_vert">more_vert</i>
                  <p className="number">203.002</p>
                  <p className="name">Nome Nome</p>
                  <p className="date">jul,09</p>
                  <div className="footer">Store: Amazing NY</div>
                </li>
                <li>
                  <i className="material-icons more_vert">more_vert</i>
                  <p className="number">203.002</p>
                  <p className="name">Nome Nome</p>
                  <p className="date">jul,09</p>
                  <div className="footer">Store: Amazing NY</div>
                </li>
                <li>
                  <i className="material-icons more_vert">more_vert</i>
                  <p className="number">203.002</p>
                  <p className="name">Nome Nome</p>
                  <p className="date">jul,09</p>
                  <div className="footer">Store: Amazing NY</div>
                </li>
                <li>
                  <i className="material-icons more_vert">more_vert</i>
                  <p className="number">203.002</p>
                  <p className="name">Nome Nome</p>
                  <p className="date">jul,09</p>
                  <div className="footer">Store: Amazing NY</div>
                </li>
                <li>
                  <i className="material-icons more_vert">more_vert</i>
                  <p className="number">203.002</p>
                  <p className="name">Nome Nome</p>
                  <p className="date">jul,09</p>
                  <div className="footer">Store: Amazing NY</div>
                </li>
                <li>
                  <i className="material-icons more_vert">more_vert</i>
                  <p className="number">203.002</p>
                  <p className="name">Nome Nome</p>
                  <p className="date">jul,09</p>
                  <div className="footer">Store: Amazing NY</div>
                </li>
              </ul>
            </div>

            <div className="list">
              <header>
                Estoque
                <i className="material-icons filter_list">filter_list</i>
              </header>
              <ul>
                <li>
                  <i className="material-icons more_vert">more_vert</i>
                  <p className="number">203.002</p>
                  <p className="name">Nome Nome</p>
                  <p className="date">jul,09</p>
                  <div className="footer">Store: Amazing NY</div>
                </li>
              </ul>
            </div>

            <div className="list">
              <header>
                Laboratório de montagem
                <i className="material-icons filter_list">filter_list</i>
              </header>
              <ul>
                <li>
                  <i className="material-icons more_vert">more_vert</i>
                  <p className="number">203.002</p>
                  <p className="name">Nome Nome</p>
                  <p className="date">jul,09</p>
                  <div className="footer">Store: Amazing NY</div>
                </li>
              </ul>
            </div>

            <div className="list">
              <header>
                Loja
                <i className="material-icons filter_list">filter_list</i>
              </header>
              <ul>
                <li>
                  <i className="material-icons more_vert">more_vert</i>
                  <p className="number">203.002</p>
                  <p className="name">Nome Nome</p>
                  <p className="date">jul,09</p>
                  <div className="footer">Store: Amazing NY</div>
                </li>
              </ul>
            </div>

            <div className="list">
              <header>
                Entregue
                <i className="material-icons filter_list">filter_list</i>
              </header>
              <ul>
                <li>
                  <i className="material-icons more_vert">more_vert</i>
                  <p className="number">203.002</p>
                  <p className="name">Nome Nome</p>
                  <p className="date">jul,09</p>
                  <div className="footer">Store: Amazing NY</div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

const mapDispatchToProps = {
  loadingOn,
  loadingOff,
};

export default connect(
  null,
  mapDispatchToProps,
)(Home);
