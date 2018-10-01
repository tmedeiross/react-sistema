import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Footer from '../layout/footer';

import './styles.css';

import NavBar from '../layout/nav-bar';
import StoreDetails from '../shop-details';
import ShopUser from '../shop-user';
import ShopSupplier from '../shop-supplier';
import If from '../common/if';

// import { ROUTE_PREFIX as PREFIX } from '../../config';
import { loadingOn, loadingOff } from '../../redux-flow/reducers/loader/action-creators';
import { Container } from './styles';
import * as AuthAPI from '../../api/auth';

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

const styles = theme => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
});

export class Shop extends Component {
  constructor(...props) {
    super(...props);
    this.state = {
      stores: [],
      value: 0,
      paramId: this.props.match.params.id,
    };
    this.listAll = this.listAll.bind(this);
  }

  componentDidMount() {
    this.listAll();
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  listAll() {
    const resetState = {
      errors: {},
      errorMessage: '',
      isLoading: true,
      stores: [],
    };

    AuthAPI.storeAll()
      .then((response) => {
        this.setState({ ...resetState });

        const stores = response.data.content;
        this.setState({ stores: this.state.stores });
        console.log(!!stores[0]);
      })
      .catch((err) => {
        console.log(err.data.message);
      });
  }

  render() {
    const { value, paramId } = this.state;
    const { classes } = this.props;
    const shouldDisplayNotFound = paramId;

    return (
      <Fragment>
        <NavBar />
        <div className="container-fluid content">
          <Container>
            <div className={classes.root}>
              <AppBar position="static" color="default">
                <Tabs
                  value={value}
                  onChange={this.handleChange}
                  indicatorColor="primary"
                  textColor="primary"
                  scrollable
                  scrollButtons="auto"
                >
                  <Tab label="Informação da loja" />
                  {shouldDisplayNotFound && <Tab label="Fornecedores" />}
                  {shouldDisplayNotFound && <Tab label="Usuários" />}
                </Tabs>
              </AppBar>
              {value === 0 && (
                <TabContainer>
                  <StoreDetails history={this.props.history} paramId={this.props.match.params.id} />
                </TabContainer>
              )}

              {value === 1 && (
                <TabContainer>
                  <ShopSupplier history={this.props.history} paramId={this.props.match.params.id} />
                </TabContainer>
              )}

              {value === 2 && (
                <TabContainer>
                  <ShopUser history={this.props.history} paramId={this.props.match.params.id} />
                </TabContainer>
              )}
            </div>
          </Container>
        </div>
        <Footer />
      </Fragment>
    );
  }
}
Shop.propTypes = {
  classes: PropTypes.object.isRequired,
};
const mapDispatchToProps = {
  loadingOn,
  loadingOff,
};

export default connect(
  null,
  mapDispatchToProps,
)(withStyles(styles)(Shop));
