import React, { Component, Fragment } from 'react';
import NavbarInterna from '../../layout/NavbarInterna/NavbarInterna';
import AuthService from '../../components/AuthService';
import withAuth from '../../components/withAuth';
import '../../styles/global';
import './styles.css';

const Auth = new AuthService();

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '',
      profile: '',
    };
  }

  componentDidMount() {}

  handleLogout() {
    Auth.logout();
    this.props.history.replace('/signin');
  }

  componentWillMount() {
    if (Auth.loggedIn()) {
      try {
        const profile = Auth.getProfile();
        this.setState({
          user: profile,
          profile: profile.sub,
        });
      } catch (err) {
        Auth.logout();
        this.props.history.replace('/signin');
      }
    }
  }

  render() {
    return (
      <Fragment>
        <div className="ui">
          <NavbarInterna />
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
export default withAuth(Home);
