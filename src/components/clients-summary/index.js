import React, { Component } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import swal from 'sweetalert';

import If from '../common/if';
import * as Helper from './helper';
import Breadcrumb from '../common/breadcrumb';
import ClientsGrid from '../clients-grid';
import Pagination from '../common/pagination';
import { loadingOn, loadingOff } from '../../redux-flow/reducers/loader/action-creators';

export class ClientsSummary extends Component {
  constructor() {
    super();
    this.state = {
      pageData: {},
      clients: [],
      pagination: {
        pageCount: 0,
      },
    };
    this.fillData = this.fillData.bind(this);
  }

  componentDidMount() {
    this.fillData(0);
  }

  fillData({ selected: page }) {
    this.props.loadingOn();
    const { summaryType } = this.props.match.params;

    if (!summaryType) return;

    const pageData = Helper.getDataByPage(summaryType);

    this.setState({ pageData });

    if (!pageData) {
      swal('Atenção', 'Página inválida', 'warning').then(() => {
        this.props.history.push('/');
      });
      return;
    }

    // const shop = JSON.parse(localStorage.getItem('shop'));
    const shop = localStorage.getItem('shop');
    const shopId = shop ? shop.id : 0;

    pageData
      .searchMethod(shopId, page)
      .then((res) => {
        const pagination = {
          pageCount: res.data.totalPages,
        };
        this.setState({
          clients: res.data.content,
          pagination,
        });
        this.props.loadingOff();
      })
      .catch(() => {
        this.props.loadingOff();
        swal('Atenção', 'Não foi possível fazer a busca, tente novamente.', 'warning').then(() => {
          this.props.history.push('/');
        });
      });
  }

  render() {
    const { pageData, clients, pagination } = this.state;
    return (
      <div>
        <If test={pageData && pageData.pageName}>
          <Breadcrumb crumbs={pageData && Helper.getBreadcrumbData(pageData.pageName)} />
        </If>
        <div className="row">
          <div className="col">
            <div className="card">
              <div className={classNames('card-header text-white', pageData && pageData.color)}>
                {pageData && pageData.description}
              </div>
              <ClientsGrid
                clients={clients}
                showBirthday={pageData && pageData.showBirthday}
                showDueDate={pageData && pageData.showDueDate}
              />
            </div>
          </div>
        </div>

        <br />

        <div className="row">
          <If test={clients.length}>
            <div className="col">
              <Pagination handlePageClick={this.fillData} pageCount={pagination.pageCount} />
            </div>
          </If>
        </div>
      </div>
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
)(ClientsSummary);
