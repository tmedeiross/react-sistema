import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Navbar from '../../layout/Navbar/Navbar';
import '../../styles/global';

const Container = styled.header`
  padding-top: 100px;
`;

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // usuario: sessionStorage.getItem('usuario'),
    };
    this.sair = this.sair.bind(this);
  }

  sair(event) {
    window.sessionStorage.removeItem('isAuthenticated');
  }

  render() {
    return (
      <Fragment>
        <Navbar />

        <Container>
          <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header" />
          <main className="mdl-layout__content">
            <div className="page-content">
              <p>
Você está logado.
              </p>
              <Link
                type="button"
                className="mdl-button mdl-js-button mdl-button--raised mdl-button--primary ml1 mdl-js-ripple-effect"
                color="primary"
                to="/signin"
                onClick={this.sair}
              >
                Deslogar
              </Link>
            </div>
          </main>
        </Container>
      </Fragment>
    );
  }
}

export default Home;
