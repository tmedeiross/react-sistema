import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Menu, MenuItem, AsyncTypeahead } from 'react-bootstrap-typeahead';
import * as ClientAPI from '../../../../api/client';
import { ROUTE_PREFIX as PREFIX } from '../../../../config';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import ClientItem from '../../client-item';

const PER_PAGE = 15;

class InputAutocomplete extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      options: [],
      query: props.searchText,
      currentPage: 0,
    };
    this.searchCustomer = this.searchCustomer.bind(this);
    this.onItemClick = this._onItemClick.bind(this);
  }

  componentWillReceiveProps(newProps) {
    const { searchText } = newProps;
    if (searchText !== undefined) {
      this.searchCustomer(searchText);
      this._typeahead && this._typeahead.setState({ text: searchText });
      this._typeahead && this._typeahead.setState({ query: searchText });
      this._typeahead.focus();
    }
  }

  renderMenuItemChildren(item, props, index) {
    return <ClientItem item={item} />;
  }

  searchCustomer(value, page = 0) {
    this.setState({ query: value });

    if (!value) {
      this.setState({ options: [] });
      this.setState({ isLoading: true });
    }

    if (value) {
      ClientAPI.getClients(value, page)
        .then((res) => {
          this.setState({
            isLoading: false,
            options: res.data.content,
          });
        })
        .catch(() => {
          this.setState({ isLoading: false });
        });
    }
  }

  filterByCallback = (option, props) => true;

  render() {
    const { isLoading, options, query } = this.state;
    return (
      <AsyncTypeahead
        {...this.state}
        ref={component => (this._typeahead = component ? component.getInstance() : this._typeahead)}
        labelKey="socialName"
        filterBy={this.filterByCallback}
        maxResults={PER_PAGE - 1}
        minLength={3}
        defaultInputValue={query}
        onInputChange={this._handleInputChange}
        onPaginate={this._handlePagination}
        onSearch={this._handleSearch}
        paginate
        emptyLabel="Nada encontrado ainda"
        options={options}
        renderMenu={(results, menuProps) => (
          <Menu {...menuProps} className="typeahead typeahead-menu">
            {results.map((result, index) => (
              <MenuItem option={result} position={index} key={`${result}_${index}`}>
                {this.renderMenuItemChildren(result, menuProps, index)}
              </MenuItem>
            ))}
          </Menu>
        )}
        isLoading={isLoading}
        promptText={this.props.placeholder}
        placeholder={this.props.placeholder}
        searchText="Nada encontrado ainda"
        paginationText="Carregar mais"
        onChange={(selected) => {
          this._onItemClick(selected);
        }}
        useCache
      />
    );
  }

  _onItemClick = (item) => {
    this.props.onItemClick(`${PREFIX}/client/${item[0].clientID}`);
  };

  _handleInputChange = (query) => {
    this.setState({ query });
  };

  _handlePagination = (e) => {
    const { currentPage, query } = this.state;
    const page = currentPage + 1;
    this.setState({
      currentPage: page,
    });

    this.searchCustomer(query, currentPage);
  };

  _handleSearch = (query) => {
    this.searchCustomer(query);
  };
}

InputAutocomplete.propTypes = {
  onItemClick: PropTypes.func,
  searchText: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
};

export default InputAutocomplete;
