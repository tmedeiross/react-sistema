import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import NavbarInterna from '../../layout/NavbarInterna/NavbarInterna';
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
        <NavbarInterna />

        <Container>
          <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header" />
          <main className="mdl-layout__content">
            <div className="page-content">
              <h4>
                Logado como&nbsp;
                {this.state.profile}
              </h4>
              <button
                type="button"
                className="mdl-button mdl-js-button mdl-button--raised mdl-button--accent mdl-js-ripple-effect"
                color="primary"
                onClick={this.handleLogout.bind(this)}
              >
                Logout
              </button>
              <Link
                type="button"
                className="ml1 mdl-button mdl-js-button mdl-button--raised mdl-button--primary mdl-js-ripple-effect"
                color="primary"
                to="/register"
              >
                Add new client
              </Link>
            </div>
          </main>
        </Container>
      </Fragment>
    );
  }
}
export default withAuth(Home);
