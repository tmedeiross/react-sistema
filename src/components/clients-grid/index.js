import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import If from '../common/if';
import * as Helper from './helper';
import { ROUTE_PREFIX as PREFIX } from '../../config';
import ClientItem from '../common/client-item';

const ClientsGrid = ({ clients, showBirthday, showDueDate }) => (
  <div className="list-group">
    <If test={clients.length === 0}>
      <div className="list-group-item list-group-item-action list-group-item-warning">
        Nenhum registro para listar.
      </div>
    </If>
    {clients.map((item, index) => (
      <div key={index}>
        <Link to={`${PREFIX}/client/${item.clientID}`} style={{ textDecoration: 'none' }}>
          <ClientItem
            item={item}
            index={index}
            birthDay={Helper.getBirthdate(item.dateBirth)}
            dueDate={Helper.getDueDate(item)}
          />
        </Link>
      </div>
    ))}
  </div>
);

ClientsGrid.propTypes = {
  clients: PropTypes.array.isRequired,
};

ClientsGrid.defaultProps = {
  showBirthday: false,
};

export default ClientsGrid;
