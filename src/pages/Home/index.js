import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import Navbar from '../../layout/Navbar/Navbar';
import AuthService from '../../components/AuthService';
import withAuth from '../../components/withAuth';

import '../../styles/global';

const Auth = new AuthService();

const Container = styled.header`
  padding-top: 100px;
`;

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // usuario: sessionStorage.getItem('usuario'),
    };
  }

  handleLogout() {
    Auth.logout();
    this.props.history.replace('/signin');
  }

  render() {
    return (
      <Fragment>
        <Navbar />

        <Container>
          <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header" />
          <main className="mdl-layout__content">
            <div className="page-content">
              <button type="button" className="form-submit" onClick={this.handleLogout.bind(this)}>
                Logout
              </button>
            </div>
          </main>
        </Container>
      </Fragment>
    );
  }
}
export default withAuth(Home);
