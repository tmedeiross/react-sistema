import React from 'react';
import PropTypes from 'prop-types';
import Avatar from 'react-avatar';

const ClientItem = ({ item, index }) => (
  <div
    className={
      `list-group-item list-group-item-action flex-column align-items-start ${
        index % 2 === 0 ? '' : 'list-group-item-light'}`
    }
  >
    <div className="row">
      <div className="col-lg-2 col-sm-0">
        <Avatar name={item.clientID && item.socialName} textSizeRatio="5" round />
      </div>
      <div className="col-lg-10 col-sm-12">
        <div className="d-flex justify-content-between">
          <h6 className="mb-1">{item.socialName}</h6>
          <small>{item.clientID && `Cód: ${item.clientID}`}</small>
        </div>
        <div className="d-flex w-2 justify-content-between">
          <small>{item.phone1 && `Tel: ${item.phone1}`}</small>
          <small>{item.personalCpf && `CPF: ${item.personalCpf}`}</small>
        </div>
        <p className="mb-1 text-muted">{item.email && `E-mail: ${item.email}`}</p>
      </div>
    </div>
  </div>
);

ClientItem.propTypes = {
  item: PropTypes.object.isRequired,
  index: PropTypes.number,
};

export default ClientItem;
