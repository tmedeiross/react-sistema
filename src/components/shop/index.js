import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';

import './styles.css';

import StoreDetails from '../shop-details';
import ShopUser from '../shop-user';
import { ROUTE_PREFIX as PREFIX } from '../../config';
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
    const resetState = { errors: {}, errorMessage: '', isLoading: true };

    AuthAPI.storeAll()
      .then((response) => {
        this.setState({ ...resetState });

        const stores = response.data.content;
        this.setState({ stores });
      })
      .catch((err) => {
        console.log(err.data.message);
      });
  }

  render() {
    const { stores, value } = this.state;
    const { classes } = this.props;

    return (
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
              <Tab label="Fornecedores" />
              <Tab label="Usuários" />
            </Tabs>
          </AppBar>
          {value === 0 && (
            <TabContainer>
              <StoreDetails paramId={this.props.match.params.id} />
            </TabContainer>
          )}
          {value === 1 && <TabContainer>Fornecedores</TabContainer>}
          {value === 2 && (
            <TabContainer>
              <ShopUser paramId={this.props.match.params.id} />
            </TabContainer>
          )}
        </div>
      </Container>
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
