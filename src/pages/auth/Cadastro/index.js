import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Navbar from '../../../layout/Navbar/Navbar';
import AuthService from '../../../components/AuthService';
import withAuth from '../../../components/withAuth';
import '../../../styles/global';
import './cadastro.css';

const Auth = new AuthService();

const Container = styled.header`
  padding-top: 100px;
`;
const Card = styled.header`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding-top: 50px;
`;
class Cadastro extends Component {
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
        <Navbar />

        <Container>
          <Card>
            <div className="mdl-card mdl-shadow--2dp">
              <div className="mdl-card__title bg-primary">
                <h2 className="mdl-card__title-text mdl-typography--text-center w100">
                  Cadastro de loja
                </h2>
              </div>
              <div className="mdl-card__supporting-text w100">
                <form action="#" onSubmit={this.handleFormSubmit}>
                  <div className="mdl-grid">
                    <div className="mdl-cell mdl-cell--12-col">
                      <h4>
Informação da loja
                      </h4>
                    </div>
                  </div>

                  <div className="mdl-grid">
                    <div className="mdl-cell mdl-cell--6-col">
                      <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label w100">
                        <input
                          className="mdl-textfield__input"
                          type="text"
                          id="cadNome"
                          name="name"
                          onChange={this.handleChange}
                        />
                        <label className="mdl-textfield__label" htmlFor="cadNome">
                          CNPJ
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="mdl-grid">
                    <div className="mdl-cell mdl-cell--6-col">
                      <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label w100">
                        <input
                          className="mdl-textfield__input"
                          type="text"
                          id="cadNome"
                          name="name"
                          onChange={this.handleChange}
                        />
                        <label className="mdl-textfield__label" htmlFor="cadNome">
                          Company name
                        </label>
                      </div>
                    </div>
                    <div className="mdl-cell mdl-cell--6-col">
                      <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label w100">
                        <input
                          className="mdl-textfield__input"
                          type="text"
                          id="cadNome"
                          name="name"
                          onChange={this.handleChange}
                        />
                        <label className="mdl-textfield__label" htmlFor="cadNome">
                          Trading name
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="mdl-grid">
                    <div className="mdl-cell mdl-cell--6-col">
                      <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label w100">
                        <input
                          className="mdl-textfield__input"
                          type="text"
                          id="cadNome"
                          name="name"
                          onChange={this.handleChange}
                        />
                        <label className="mdl-textfield__label" htmlFor="cadNome">
                          Phone Number
                        </label>
                      </div>
                    </div>
                    <div className="mdl-cell mdl-cell--6-col">
                      <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label w100">
                        <input
                          className="mdl-textfield__input"
                          type="text"
                          id="cadNome"
                          name="name"
                          onChange={this.handleChange}
                        />
                        <label className="mdl-textfield__label" htmlFor="cadNome">
                          Email
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="mdl-grid">
                    <div className="mdl-cell mdl-cell--12-col">
                      <h4>
Billing address
                      </h4>
                    </div>
                  </div>

                  <div className="mdl-grid">
                    <div className="mdl-cell mdl-cell--3-col">
                      <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label w100">
                        <input
                          className="mdl-textfield__input"
                          type="text"
                          id="cadNome"
                          name="name"
                          onChange={this.handleChange}
                        />
                        <label className="mdl-textfield__label" htmlFor="cadNome">
                          ZIP code
                        </label>
                      </div>
                    </div>
                    <div className="mdl-cell mdl-cell--3-col">
                      <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label w100">
                        <input
                          className="mdl-textfield__input"
                          type="text"
                          id="cadNome"
                          name="name"
                          onChange={this.handleChange}
                        />
                        <label className="mdl-textfield__label" htmlFor="cadNome">
                          Number
                        </label>
                      </div>
                    </div>
                    <div className="mdl-cell mdl-cell--6-col">
                      <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label w100">
                        <input
                          className="mdl-textfield__input"
                          type="text"
                          id="cadNome"
                          name="name"
                          onChange={this.handleChange}
                        />
                        <label className="mdl-textfield__label" htmlFor="cadNome">
                          Trading name
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="mdl-grid">
                    <div className="mdl-cell mdl-cell--12-col">
                      <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label w100">
                        <input
                          className="mdl-textfield__input"
                          type="text"
                          id="cadNome"
                          name="name"
                          onChange={this.handleChange}
                        />
                        <label className="mdl-textfield__label" htmlFor="cadNome">
                          Address
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="mdl-grid">
                    <div className="mdl-cell mdl-cell--6-col">
                      <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label w100">
                        <input
                          className="mdl-textfield__input"
                          type="text"
                          id="cadNome"
                          name="name"
                          onChange={this.handleChange}
                        />
                        <label className="mdl-textfield__label" htmlFor="cadNome">
                          Address Complementar
                        </label>
                      </div>
                    </div>
                    <div className="mdl-cell mdl-cell--6-col">
                      <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label w100">
                        <input
                          className="mdl-textfield__input"
                          type="text"
                          id="cadNome"
                          name="name"
                          onChange={this.handleChange}
                        />
                        <label className="mdl-textfield__label" htmlFor="cadNome">
                          Neighborhood
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="mdl-grid">
                    <div className="mdl-cell mdl-cell--6-col">
                      <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label w100">
                        <input
                          className="mdl-textfield__input"
                          type="text"
                          id="cadNome"
                          name="name"
                          onChange={this.handleChange}
                        />
                        <label className="mdl-textfield__label" htmlFor="cadNome">
                          City
                        </label>
                      </div>
                    </div>
                    <div className="mdl-cell mdl-cell--6-col">
                      <div className="mdl-selectfield mdl-js-selectfield w100">
                        <select id="myselect" name="myselect" className="mdl-selectfield__select">
                          <option value="option0_value">
Address
                          </option>
                          <option value="option1_value">
Address
                          </option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="mdl-card__actions mdl-typography--text-right">
                    <button
                      type="button"
                      className="mdl-button mdl-js-button mdl-button--raised mdl-button--primary ml1 mdl-js-ripple-effect"
                      color="primary"
                    >
                      Confirme
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </Card>
        </Container>
      </Fragment>
    );
  }
}
export default withAuth(Cadastro);
