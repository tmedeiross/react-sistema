import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

// const props = this.props;
const Breadcrumb = ({ crumbs }) => (
  <nav>
    <ol className="breadcrumb">
      {crumbs.map((item, index) => (
        <li key={index} className={classNames('breadcrumb-item', item.active ? 'active' : '')}>
          {!!item.link && <Link to={item.link}>{item.name}</Link>}
          {!item.link && <span>{item.name}</span>}
        </li>
      ))}
    </ol>
  </nav>
);

Breadcrumb.propTypes = {
  crumbs: PropTypes.arrayOf(
    PropTypes.shape({
      active: PropTypes.bool.isRequired,
      name: PropTypes.string,
      link: PropTypes.string,
    }),
  ).isRequired,
};

export default Breadcrumb;
