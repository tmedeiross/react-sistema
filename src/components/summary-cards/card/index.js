import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Card = ({ data }) => (
  <div className="col-sm-6 col-md-6 col-lg-6">
    <Link style={{ textDecoration: 'none' }} to={data.route}>
      <div className={classNames('card text-center text-white mb-3', data.color)}>
        <div className="card-body">
          <h3>
            <i className={data.icon} />
          </h3>
          <h5>
            {data.total}
            {' '}
            {data.title}
          </h5>
        </div>
      </div>
    </Link>
  </div>
);

Card.propTypes = {
  data: PropTypes.shape({
    color: PropTypes.string.isRequired,
    total: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    route: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
  }),
};

export default Card;
